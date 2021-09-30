import r from "/@/router/axios";
import { api } from "./config";
import { LoginDTO, RegDTO, UserInfoDTO } from "../../types/Users/dto";
/**
 * 登录
 * @param data
 * @returns
 */
export const loginReq = (data: LoginDTO) =>
  r.request<R<UserInfoDTO>>({
    url: api.login,
    method: "post",
    data
  });

/**
 * 注册
 * @param data
 * @returns
 */
export const registryReq = (data: RegDTO) =>
  r.request<R>({
    url: api.register,
    method: "post",
    data
  });

/**
 * token授权
 */
export const authTokenReq = () =>
  r.request<R>({
    url: api.token,
    method: "post"
  });

/**
 * 更新
 * @returns
 */
export const updateUserReq = (data: GObj) =>
  r.request<R>({
    url: api.update,
    method: "post",
    data
  });

/**
 * 计算更新属性
 * @param data
 * @returns
 */
export const calculateUserReq = (data: GObj) =>
  r.request<R>({
    url: api.calculate,
    method: "post",
    data
  });
