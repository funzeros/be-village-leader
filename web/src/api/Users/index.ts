import r from "/@/router/axios";
import { api } from "./config";
import { LoginBase, UserInfo } from "local-common-util";

/**
 * 登录
 * @param data
 * @returns
 */
export const loginAndRegisterReq = (data: LoginBase) =>
  r.request<R<LoginAndRegisterVO<UserInfo>>>({
    url: api.loginAndregister,
    method: "post",
    data
  });
