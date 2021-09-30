import { router } from "/@/router/index";
import { keys, omitBy, intersection, isNil, pick } from "lodash";
import { computed, ComputedRef } from "vue";
import nzhcn from "nzh/cn";

export function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * 覆盖对象属性
 * @param distObject 初始化对象
 * @param srcObject 传递过来新对象
 */
export function mergeProperties<T>(distObject: T, srcObject: GObj) {
  const distPropList = keys(distObject);
  const srcPropList = keys(omitBy(srcObject, isNil));
  const propList = intersection(distPropList, srcPropList);
  return {
    ...distObject,
    ...pick(srcObject, propList)
  };
}

/**
 * 跳转类型
 */
export enum OpenJumpType {
  path, // 可本域名链接和专有路由path = 0
  name, // 专有路由name = 1
  url, // 新tab打开 = 2
  bind, // 本tab替换 = 3
  spa // 隐藏页跳转 = 4
}
/**
 * 通用跳转方法
 * @param value 路径或者其他值
 * @param type 跳转类型
 */
export function openPage(
  value: string,
  type: OpenJumpType = OpenJumpType.path
) {
  if (type === OpenJumpType.path) {
    if (document.location.pathname !== value) {
      if (value.includes("http") || value.includes("https")) {
        window.location.href = value;
        return;
      } else {
        router.push(value);
        return;
      }
    } else {
      // TODO:
      // AppScrollToTop();
      return;
    }
  } else if (type === OpenJumpType.name) {
    router.push({
      name: value
    });
    return;
  } else if (type === OpenJumpType.url) {
    window.open(value, "_blank");
    return;
  } else if (type === OpenJumpType.bind) {
    window.location.href = value;
    return;
  } else if (type === OpenJumpType.spa) {
    router.push({
      path: `/spa${value}`
    });
    return;
  } else {
    return;
  }
}

/**
 * 打开小窗口
 */
export const openWindow = (url: string, title?: string, w = 800, h = 600) => {
  const dualScreenLeft = window.screenLeft;
  const dualScreenTop = window.screenTop;

  const width = window.innerWidth
    ? window.innerWidth
    : document.documentElement.clientWidth
    ? document.documentElement.clientWidth
    : screen.width;
  const height = window.innerHeight
    ? window.innerHeight
    : document.documentElement.clientHeight
    ? document.documentElement.clientHeight
    : screen.height;

  const left = width / 2 - w / 2 + dualScreenLeft;
  const top = height / 2 - h / 2 + dualScreenTop;
  const newWindow = window.open(
    url,
    title,
    "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no, width=" +
      w +
      ", height=" +
      h +
      ", top=" +
      top +
      ", left=" +
      left
  );

  // Puts focus on the newWindow
  newWindow && newWindow.focus();
};

/**
 * 数组交换项
 */

/**
 * 数组换位
 * @param arr 要修改的数组
 * @param index1 索引1
 * @param index2 索引2
 */
export const swapArr = <T>(arr: T[], index1: number, index2: number): T[] => {
  arr[index1] = arr.splice(index2, 1, arr[index1])[0];
  return arr;
};

/**
 * 空格和换行符转义
 */
export const spaceWrapEscape = (str: string) => {
  if (str) return str.replace(/[\n]/g, "<br/>").replace(/[\s]/g, "&nbsp;");
  return str;
};

/**
 * FNtoComputeds
 */
export const toComputeds = (obj: GObj) => {
  const newObj: GObj<ComputedRef> = {};
  Object.keys(obj).forEach((k: string) => {
    newObj[k] = computed(obj[k]);
  });
  return newObj;
};

/**
 * dictTOList
 */

export const dictTOList = (obj: GObj, isNumber = false) => {
  return Object.entries(obj).map(([value, label]) => ({
    label,
    value: isNumber ? +value : value
  }));
};
// https://github.com/cnwhy/nzh
export const nzhCnEncodeS = (number: number): string => {
  if (number) return nzhcn.encodeS(number);
  return "零";
};

export const nzhCnEncodeB = (number: number): string => {
  if (number) return nzhcn.encodeB(number);
  return "〇";
};

/**
 * 百分比展示
 */
export const countCheckRate = (rate?: number): string => {
  return typeof rate === "number" ? Math.round(rate * 100) + "%" : "暂无";
};

/**
 * 保留几位小数控制精度
 */

export const mathPrecision = (num: number, precision = 2) => {
  const dig = Math.pow(10, precision);
  const number = Number(num);
  if (isNaN(number)) return 0;
  return Math.round(number * dig) / dig;
};

/**
 * between
 */
export const mathBetween = (
  source: number | string | Date,
  target: (number | string | Date)[],
  border = false
) => {
  const num = typeof source === "number" ? source : new Date(source).valueOf();
  const arr = target
    .map(m => {
      return typeof m === "number" ? m : new Date(m).valueOf();
    })
    .sort();
  if (border) return num >= arr[0] && num <= arr[1];
  else return num >= arr[0] && num < arr[1];
};

/**
 * 移动端检测
 */

export const browserRedirect = () => {
  const sUserAgent: string = navigator.userAgent.toLowerCase();
  const bIsIpad = sUserAgent.match(/ipad/i)?.toString() === "ipad";
  const bIsIphoneOs =
    sUserAgent.match(/iphone os/i)?.toString() === "iphone os";
  const bIsMidp = sUserAgent.match(/midp/i)?.toString() === "midp";
  const bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i)?.toString() === "rv:1.2.3.4";
  const bIsUc = sUserAgent.match(/ucweb/i)?.toString() === "ucweb";
  const bIsAndroid = sUserAgent.match(/android/i)?.toString() === "android";
  const bIsCE = sUserAgent.match(/windows ce/i)?.toString() === "windows ce";
  const bIsWM =
    sUserAgent.match(/windows mobile/i)?.toString() === "windows mobile";
  return (
    bIsIpad ||
    bIsIphoneOs ||
    bIsMidp ||
    bIsUc7 ||
    bIsUc ||
    bIsAndroid ||
    bIsCE ||
    bIsWM
  );
};
