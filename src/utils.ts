import Big from "big.js";

export function isUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

export function isGistId(gistId: string): boolean {
  const reg = /^[0-9a-f]{32}$/i;
  return reg.test(gistId);
}

/**
 * 将秒转换为 (小时 分钟 秒)
 * @param totalSeconds 总秒数
 * @returns [hours] h [minutes] m [seconds] s
 */
export function timeConverter(totalSeconds: number) {
  const hours = Big(totalSeconds).div(3600).toFixed().split(".")[0];
  const minutes = Big(Big(totalSeconds).mod(3600))
    .div(60)
    .toFixed()
    .split(".")[0];
  const seconds = Big(totalSeconds).mod(60).toFixed().split(".")[0];
  return `${hours}h ${minutes}m ${seconds}s`;
}

/**
 * 获取时间戳
 * @param time 时间字符串
 * @returns number 时间戳
 */
export function getTime(time: string) {
  return new Date(time).getTime();
}
