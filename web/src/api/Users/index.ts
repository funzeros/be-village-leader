import r from "/@/router/axios";
import { api } from "./config";
import { LoginDTO, RegisterBase, UserInfo } from "local-common-util";

/**
 * 登录
 * @param data
 * @returns
 */
export const loginAndRegisterReq = (data: LoginDTO) =>
  r.request<R<LoginAndRegisterVO<UserInfo>>>({
    url: api.loginAndregister,
    method: "post",
    data
  });

/**
 * 注册
 * @param data
 * @returns
 */
export const registerReq = (data: RegisterBase) =>
  r.request<R<string>>({
    url: api.register,
    method: "post",
    data
  });

/**
 * token授权
 */

export const tokenAuthReq = () =>
  r.request<R<string>>({
    url: api.tokenAuth,
    method: "post"
  });
