export default class Tools {
  /**
   * 检查 gistId 是否合法，并且将 valid 的 gistId 存储到本地存储中
   * @param {string} gistId - 待检查的 gistId 字符串
   * @returns {string | false} - 返回值类型为 string 或 false，表示检查结果
   *  - 当 gistId 非法或本地存储中已存在非法的 gistId 时，返回 false
   *  - 当本地存储中不存在且传入的 gistId 合法时，将其保存到本地存储中并返回该值
   *  - 当 gistId 合法且本地存储中存在且与传入值相同时，直接返回存储中的值
   *  - 当 gistId 合法但本地存储中存在且与传入值不同时，更新存储中的值并返回该值
   */
  public static checkGistId(gistId?: string): string | false {
    // 从本地存储中获取 gistId 的值
    const item = localStorage.getItem("gistId");

    // 如果传入的 gistId 符合特定条件，则使用传入的值覆盖掉原有的值，并返回新的值
    if (gistId?.length === 32 && /^[0-9a-f]{32}$/i.test(gistId)) {
      // 如果传入的值和本地存储中的值不相等，则将传入的值写入本地存储
      if (gistId !== item) {
        localStorage.setItem("gistId", gistId);
      }
      // 返回传入的值
      return gistId;
    }
    // 如果传入的 gistId 不符合特定条件，则判断本地存储中的值是否符合条件
    else if (item?.length === 32 && /^[0-9a-f]{32}$/i.test(item)) {
      // 如果本地存储中的值符合条件，则返回这个值
      return item;
    }
    // 如果传入的 gistId 和本地存储中的值都不符合条件，则返回 false
    else {
      return false;
    }
  }
}
