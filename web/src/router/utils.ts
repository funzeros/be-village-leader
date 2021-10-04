import { loginRoutePath } from "/@/const/path";
// import store from "/@/store";
// import { ActionTypes } from "/@/store/modules/user/action-types";
import { router } from "./index";
import { gMessage } from "../hooks";

const errorCode = {
  "201": "出错啦",
  // 4dd
  "401": "当前操作没有权限或者登入过期",
  "403": "当前操作没有权限",
  "404": "资源不存在",
  "417": "未绑定登录账号，请使用密码登录后绑定",
  "426": "用户名不存在或密码错误",
  "428": "登录失败，请稍后再试",
  "429": "请求过频繁",
  // 5dd
  // "500": "服务器启动中",
  "501": "服务器启动中",
  "502": "服务器维护中",
  "503": "服务器维护中"
};

type ErrorCode = typeof errorCode;

type ErrorCodeKey = keyof ErrorCode;

function getErrorCode(name: ErrorCodeKey, msg = ""): string {
  return errorCode[name] || msg;
}

/**
 * 清除用户信息并请用户去登录
 */
const clearInfoToLogin = async () => {
  // await store.dispatch(ActionTypes.CLEAR_ALL_USER_INFORMATION);
  router.push({
    path: loginRoutePath
  });
};

const build500ErrorMsg = (msg: string) => {
  if (msg === undefined) {
    console.log("发生空指针");
    return "服务器出了点小差";
  } else if (msg.includes("###")) {
    console.log(msg);
    return "数据库查询发生错误, 请查看控制台";
  } else {
    console.log(msg);
    return msg;
  }
};

export const processResponseData = (
  status: ErrorCodeKey,
  resData: R<GObj>,
  rTrue: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): any => {
  if (/4\d\d/.test(status)) {
    const msg = getErrorCode(status);
    // 除了验证400以外的全部报错
    if (msg) {
      gMessage.error(msg);
      clearInfoToLogin();
      throw Error(msg);
    } else {
      // 显示验证错误信息
      gMessage.error(resData.message);
      return resData;
    }
  } else if (/5\d\d/.test(status)) {
    if (rTrue) {
      clearInfoToLogin();
    }
    const msg = getErrorCode(status);
    // 除了验证500以外的全部报错
    if (msg) {
      gMessage.error(msg);
      if (import.meta.env.NODE_ENV === "development" || /503/.test(status)) {
        return resData;
      } else {
        clearInfoToLogin();
        throw Error(msg);
      }
    } else {
      gMessage.error(build500ErrorMsg(resData.message));
      return resData;
    }
  } else {
    if (resData.status !== 200) {
      gMessage.error(resData.message);
      throw Error(resData.message);
    }
    return resData;
  }
};

export { getErrorCode, ErrorCodeKey };
