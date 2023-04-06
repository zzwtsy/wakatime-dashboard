import AxiosUtil from '../utils/AxiosUtil'

export default class Api {
    /**
     * 获取 Gist 文章原始链接
     * @param gistId Gist Id
     * @returns 返回一个 Promise 对象，在成功时 resolve 包含文件 raw url 的数组，在失败时 reject 错误信息
     */
    public static async getRawUrl(gistId: string): Promise<string[]> {
        // 发起 GET 请求，并等待响应结果
        const result = await AxiosUtil.get<any>(`https://api.github.com/gists/${gistId}`);

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
}