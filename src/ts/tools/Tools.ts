import { InputType } from "../enum/InputType";

export default class Tools {
  /**
   * 检查 gistId 是否合法，并且将用户的 gistId 存储到本地存储中
   * @param {string} gistId - 待检查的 gistId 字符串
   * @returns {string | false} - 返回值类型为 string 或 false，表示检查结果
   *  - 当 gistId 非法或本地存储中已存在非法的 gistId 时，返回 false
   *  - 当本地存储中不存在且传入的 gistId 合法时，将其保存到本地存储中并返回该值
   *  - 当 gistId 合法且本地存储中存在且与传入值相同时，直接返回存储中的值
   *  - 当 gistId 合法但本地存储中存在且与传入值不同时，更新存储中的值并返回该值
   */
  public static isGistId(gistId?: string): string | false {
    return this.check(InputType.GistId, gistId);
  }

  /**
   * 检查 url 是否合法，并且将用户的 url 存储到本地存储中
   * @param {string} gistId - 待检查的 url 字符串
   * @returns {string | false} - 返回值类型为 string 或 false，表示检查结果
   *  - 当 url 非法或本地存储中已存在非法的 url 时，返回 false
   *  - 当本地存储中不存在且传入的 gistId 合法时，将其保存到本地存储中并返回该值
   *  - 当 url 合法且本地存储中存在且与传入值相同时，直接返回存储中的值
   *  - 当 url 合法但本地存储中存在且与传入值不同时，更新存储中的值并返回该值
   */
  public static isURL(url?: string): string | false {
    return this.check(InputType.Url, url);
  }

  /**
   * 将秒转换为 (小时 分钟 秒)
   * @param totalSeconds 总秒数
   * @returns [hours] h [minutes] m [seconds] s
   */
  public static timeConverter(totalSeconds: number) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return `${hours}h ${minutes}m ${seconds}s`;
  }

  private static check(type: InputType, urlOrGistId?: string) {
    let reg;

    if (type === InputType.GistId) {
      reg = /^[0-9a-f]{32}$/i;
    } else {
      reg =
        /^((https?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/;
    }

    // 从本地存储中获取 urlOrGistId 的值
    const item = localStorage.getItem(type);

    // 如果传入的 urlOrGistId 符合特定条件，则使用传入的值覆盖掉原有的值，并返回新的值
    if (urlOrGistId != null && reg.test(urlOrGistId)) {
      // 如果传入的值和本地存储中的值不相等，则将传入的值写入本地存储
      if (urlOrGistId !== item) {
        localStorage.setItem(type, urlOrGistId);
      }
      // 返回传入的值
      return urlOrGistId;
    }
    // 如果传入的 urlOrGistId 不符合特定条件，则判断本地存储中的值是否符合条件
    else if (item != null && reg.test(item)) {
      // 如果本地存储中的值符合条件，则返回这个值
      return item;
    }
    // 如果传入的 urlOrGistId 和本地存储中的值都不符合条件，则返回 false
    else {
      return false;
    }
  }
}
