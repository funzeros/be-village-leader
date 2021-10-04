import { atob, btoa } from "abab";
import * as md5 from "md5";
import { v4 as uuid } from "uuid";
export { default as gConsole } from "./useConsole";
export * from "./useDB";
export * from "./validate";
export * from "./useMail";
export * from "./useCronJob";
/**
 * 位移加密
 */
export const displaceEncryptStr = (str: string) =>
  btoa(encodeURIComponent(str))
    .split("")
    .map(m => String.fromCharCode(m.charCodeAt(0) + 9))
    .join("");

/**
 * 位移解密
 * @param str
 * @returns
 */
export const displaceDecryptStr = (str: string) => {
  return decodeURIComponent(
    atob(
      str
        .split("")
        .map(m => String.fromCharCode(m.charCodeAt(0) - 9))
        .join("")
    )
  );
};

/**
 * MD5 encryption
 */
export const md5Encryption = (str: string) => md5(str);
/**
 * 密码相等？
 */
export const equalPwd = (pwd: string, md5pwd: string) => {
  return md5Encryption(pwd) === md5pwd;
};

/**
 * 生成token
 */

export const genToken = (id: string) => {
  return `${displaceEncryptStr(`${id}`)}-${uuid()}`;
};
