import { getTime, isUrl } from "../utils";
import { GistRawUrl } from "../entity/GistRawUrl";
import { WakatimeData } from "../entity/Wakatime";

interface WakaTimeBackupDataUrls {
  filename: string;
  raw_url: string;
}

const reg = /summaries_|.json/g;

/**
 * 获取 WakaTime 备的份数据的 URL
 *
 * @param {string} gistIdOrUrl Gist ID 或者 Github Page URL
 * @returns {Promise<WakaTimeBackupDataUrls[]>} 所有 WakaTime 备份数据的 URL 数组
 */
export async function getWakaTimeBackupDataUrl(
  gistIdOrUrl: string
): Promise<WakaTimeBackupDataUrls[]> {
  // 如果 gistIdOrUrl 为空则返回空数组
  if (!gistIdOrUrl) {
    return [];
  }

  // 判断是否是 URL
  if (isUrl(gistIdOrUrl)) {
    return getWakaTimeBackupDataUrlByGitHubPage(gistIdOrUrl);
  }

  return getWakaTimeBackupDataUrlByGist(gistIdOrUrl);
}

/**
 * 从给定的 URL 获取 WakaTime 备份文件
 *
 * @param {string[]} urls 备份数据的 URL
 * @return {Promise<WakatimeData[]>} WakaTime 备份文件
 */
export async function getWakaTimeBackupData(
  urls: string[]
): Promise<WakatimeData[]> {
  // 如果没有 url 则返回空数组
  if (urls.length === 0) {
    return [];
  }

  try {
    const wakatimeDataPromises = urls.map((url) =>
      fetch(url).then((res) => res.json())
    );

    const wakatimeDatas: WakatimeData[] = await Promise.all(
      wakatimeDataPromises
    );

    return wakatimeDatas.flatMap((data) => data);
  } catch (e) {
    console.error("获取 WakaTime 备份文件失败", e);
    return [];
  }
}

/**
 * 使用 GitHub API，获取 Gist 中所有 WakaTime 备份数据的 URL
 *
 * JSON example
 *
 * ```json
 * {
 *   "files": {
 *       "summaries_2022-12-26.json": {
 *           "filename": "summaries_2022-12-26.json",
 *           "raw_url": "https://***"
 *       },
 *       "summaries_2022-12-27.json": {
 *           "filename": "summaries_2022-12-27.json",
 *           "raw_url": "https://***"
 *       }
 *   },
 *   "owner": {
 *       "login": "***"
 *   }
 * }
 * ```
 *
 * @param gistId Gist ID
 * @returns {Promise<WakaTimeBackupDataUrls[]>} 所有 WakaTime 备份数据的 URL 数组
 */
async function getWakaTimeBackupDataUrlByGist(
  gistId: string
): Promise<WakaTimeBackupDataUrls[]> {
  const res = await fetch(`https://api.github.com/gists/${gistId}`);
  const gistApi: GistRawUrl = await res.json();

  return (
    Object.entries(gistApi.files)
      .filter(([filename]) => filename.startsWith("summaries_"))
      .map(([filename, file]) => ({
        filename,
        raw_url: file.raw_url,
      }))
      // 按文件名排序,最近备份的文件排在最前面
      .sort(
        (a, b) =>
          getTime(b.filename.replaceAll(reg, "")) -
          getTime(a.filename.replaceAll(reg, ""))
      )
  );
}

/**
 * 从 GitHub Page 中获取 WakaTime 备份数据的 URL
 * @param url GitHub Page URL
 * @returns {Promise<WakaTimeBackupDataUrls[]>} 所有 WakaTime 备份数据的 URL 数组
 */
async function getWakaTimeBackupDataUrlByGitHubPage(
  url: string
): Promise<WakaTimeBackupDataUrls[]> {
  try {
    // 如果 URL 不以 / 结尾，则加上 /
    url = url.endsWith("/") ? url : `${url}/`;
    const result = await fetch(url);
    const resultText = await result.text();
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(resultText, "text/html");
    const pElements = htmlDoc.getElementsByTagName("p");
    const WakaTimeBackupDataUrls: WakaTimeBackupDataUrls[] = [];

    for (const pElement of pElements) {
      const filename = pElement.textContent?.trim();

      // 如果没有 filename 为 null 或者 filename 不以 "summaries_" 开头则跳过
      if (filename == null || !filename.startsWith("summaries_")) {
        continue;
      }

      WakaTimeBackupDataUrls.push({
        filename,
        raw_url: `${url}${filename}`,
      });
    }

    // 按文件名排序,最近备份的文件排在最前面
    return WakaTimeBackupDataUrls.sort(
      (a, b) =>
        getTime(b.filename.replaceAll(reg, "")) -
        getTime(a.filename.replaceAll(reg, ""))
    );
  } catch (e) {
    console.error("获取 WakaTime 备份文件失败", e);
    return [];
  }
}
