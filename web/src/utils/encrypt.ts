import md5 from "md5";
import { cloneDeep } from "lodash";

/**
 * 加密字符串不可逆
 * @param str 加密对象
 */
export const encryptStr = (str: string) => md5(str);

/**
 * 对象加密部分字段
 * @param obj
 */
export const encryptStrByObj = <T>(obj: T, list: string[]): T => {
  const newObj = cloneDeep(obj) as GObj;
  list.forEach(m => {
    const str = newObj[m];
    if (str.constructor === String) newObj[m] = encryptStr(str as string);
  });
  return newObj as T;
};
/**
 * 将对象加密为字符串
 * @param obj 加密对象
 */
export const objEncodeToStr = (obj: GObj) =>
  btoa(encodeURIComponent(JSON.stringify(obj)));
/**
 * 将字符串解密为对象
 * @param base64Str 加密后字符串
 */
export const strDecodeToObj = (str: string) =>
  JSON.parse(decodeURIComponent(atob(str)));
