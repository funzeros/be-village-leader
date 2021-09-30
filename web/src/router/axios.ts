import axios from "axios";
import qs from "qs";
import { useStore } from "/@/store";
import { requestTimeout, requestBaseURL } from "./config";
import { ErrorCodeKey, processResponseData } from "./utils";

const request = axios.create({
  timeout: requestTimeout,
  baseURL: requestBaseURL,
  withCredentials: true,
  validateStatus: status => {
    return status >= 200 && status <= 600; // 全部允许, 不会遇到错误就停止
  }
});

request.interceptors.request.use(
  config => {
    const store = useStore();
    const isToken = (config.headers || {}).isToken === false;
    const accessToken = store.state.user.userInfo?.token;
    if (accessToken && !isToken) {
      config.headers["Authorization"] = "Bearer " + accessToken; // token
    }
    if (config.method === "get") {
      config.paramsSerializer = function (params) {
        return qs.stringify(params, { arrayFormat: "brackets" });
      };
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  res => {
    const status = (String(res.status) || "200") as ErrorCodeKey;
    // 权限请求错误
    return processResponseData(status, res.data, false);
  },
  error => {
    // 处理其他异常
    return Promise.reject(new Error(error));
  }
);

export default request;
