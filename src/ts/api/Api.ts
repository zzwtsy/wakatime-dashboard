import { store } from "../../store/Store";
import AxiosUtil from "../utils/AxiosUtil";

export default class Api {
  /**
   * 获取 Gist 文章原始链接
   * @param gistId Gist Id
   * @returns 返回一个 Promise 对象，在成功时 resolve 包含文件 raw url 的数组，在失败时 reject 错误信息
   */
  public static async getRawUrl(gistId: string): Promise<string[]> {
    // 发起 GET 请求，并等待响应结果
    const result = await AxiosUtil.get<any>(
      `https://api.github.com/gists/${gistId}`
    );

    // 获取用户名
    if (result.owner.login != null && result.owner.login != "") {
      store.userName = result.owner.login + "'s WakaTime";
    }

    // 获取 response 中的 files 对象
    const files = result.files;
    // 创建一个字符串数组，用于存储符合条件的文件的 raw url
    const rawUrls: string[] = [];

    // 遍历文件对象，获取所有以 "summaries" 开头的文件名对应的 raw url
    for (const fileName in files) {
      // 如果文件名以 "summaries" 开头
      if (fileName.startsWith("summaries")) {
        // 将该文件的 raw url 加入到数组中
        rawUrls.push(files[fileName]["raw_url"]);
      }
    }

    // 返回所有符合条件的文件的 raw url 数组
    return rawUrls;
  }

  /**
   * 获取 Gist 内保存的 wakatime 统计数据的 json 文件
   * @param urls Gist 文章链接
   * @returns wakatime 统计数据的 json 文件数组
   */
  public static async getGistPostsContent(urls: string[]): Promise<{}> {
    return await Promise.all(urls.map((url) => AxiosUtil.get(url)));
  }

  public static async getWakaTimeUrl(url: string): Promise<string[]> {
    const result = await AxiosUtil.get<any>(url);
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(result, "text/html");
    const pElements = htmlDoc.getElementsByTagName("p");
    const wakaTimeUrls: string[] = [];

    for (let i = 0; i < pElements.length; i++) {
      const tmp = pElements[i].textContent;
      if (tmp == null) {
        continue;
      }

      if (url.endsWith("/")) {
        wakaTimeUrls.push(`${url}${tmp.trim()}`);
      } else {
        wakaTimeUrls.push(`${url}/${tmp.trim()}`);
      }
    }

    return wakaTimeUrls;
  }
}
