import { atob } from "abab";
export { default as gConsole } from "./useConsole";
export * from "./useDB";
export * from "./validate";
export * from "./useMail";

/**
 * 密码解密
 * @param str
 * @returns
 */
export const decryption = (str: string) => {
  return decodeURIComponent(
    atob(
      str
        .split("")
        .map(m => String.fromCharCode(m.charCodeAt(0) - 9))
        .join("")
    )
  );
};
