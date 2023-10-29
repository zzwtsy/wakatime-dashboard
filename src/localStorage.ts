/** 获取本地存储中的键值对*/
export function getItem(key: string) {
  return localStorage.getItem(key);
}

/** 设置本地存储中的键值对*/
export function setItem(key: string, value: string) {
  localStorage.setItem(key, value);
}
