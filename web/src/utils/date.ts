/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs from "dayjs";

// 为适配苹果时间，将 - 转为 /
const tranfDate = (date: string) => {
  const newDate = date.replace(/-/g, "/");
  return newDate;
};

const parseDate = (date: any, formatString: string) => {
  if (date === undefined) {
    return "暂无";
  }
  if (dayjs(date).isValid()) {
    return dayjs(date).format(formatString);
  } else {
    return "暂无";
  }
};
const parseToday = (data: any) => {
  return parseDate(data, "YYYY-MM-DD");
};
const parseToMinutes = (data: any) => {
  return parseDate(data, "YYYY-MM-DD HH:mm");
};
const parseToSeconds = (data: any) => {
  return parseDate(data, "YYYY-MM-DD HH:mm:ss");
};
const initDateTime = () => {
  return dayjs().format("YYYY-MM-DD HH:mm:ss");
};

/**
 * 计算两个时间之间的差距
 * @param date 目标时间
 * @param cDate 比较的时间（）默认为当前时间
 * 返回值 state：true 目标时间为过去时 false 目标时间为未来时
 */
const timeDifference = (date: any, cDate = new Date()): TimeDifferenceVO => {
  // 默认以当前时间为计算时间
  let time = +new Date(cDate) - +new Date(date);
  const state = time >= 0;
  const secondTime = 1 * 1000;
  const minuteTime = 60 * secondTime;
  const hourTime = 60 * minuteTime;
  const dayTime = 24 * hourTime;
  if (time < 0) time = time * -1;
  const day = ~~(time / dayTime);
  time = time - day * dayTime;
  const hour = ~~(time / hourTime);
  time = time - hour * hourTime;
  const minute = ~~(time / minuteTime);
  time = time - minute * minuteTime;
  const second = ~~(time / secondTime);
  return {
    state,
    day,
    hour,
    minute,
    second
  };
};

/**
 *
 */
const countWeek = (date = new Date(), word = "星期") => {
  const myddy = new Date(date).getDay();
  const weekday = [
    word + "日",
    word + "一",
    word + "二",
    word + "三",
    word + "四",
    word + "五",
    word + "六"
  ];
  return weekday[myddy];
};
export {
  parseDate,
  tranfDate,
  parseToday,
  parseToMinutes,
  parseToSeconds,
  initDateTime,
  timeDifference,
  countWeek
};

export const timeSolve = (time: string) => {
  const diffTime = Date.now() - new Date(time).valueOf();
  const s = Math.floor(diffTime / 1000);
  if (s < 60) {
    return s + "秒前";
  }
  const m = Math.floor(s / 60);
  if (m < 60) {
    return m + "分钟前";
  }
  const h = Math.floor(m / 60);
  if (h < 60) {
    return h + "小时前";
  }
  const d = Math.floor(h / 24);
  if (d < 30) {
    return d + "天前";
  }
  const mon = Math.floor(d / 30);
  if (mon < 12) {
    return mon + "月前";
  }
  // TODO: 时间完善
  return "1年前";
};

export const solveSameTime = (startTime: any, endTime: any) => {
  const a = [];
  const [s1, s2, s3] = parseDate(startTime, "YYYY-MM-DD").split("-");
  const [e1, e2, e3] = parseDate(endTime, "YYYY-MM-DD").split("-");
  const st = parseDate(startTime, "YYYY-MM-DD HH:mm");
  if (s1 === e1) {
    if (s2 === e2) {
      if (s3 === e3) {
        a.push(st, parseDate(endTime, "HH:mm"));
      } else {
        // a.push(st, parseDate(endTime, "DD HH:mm"));
        a.push(st, parseDate(endTime, "MM-DD HH:mm"));
      }
    } else {
      a.push(st, parseDate(endTime, "MM-DD HH:mm"));
    }
  } else {
    a.push(st, parseDate(endTime, "YYYY-MM-DD HH:mm"));
  }
  return a.join(" ~ ");
};

export const solveSameYear = (startTime: any, endTime: any) => {
  const a = [];
  const s1 = parseDate(startTime, "YYYY");
  const e1 = parseDate(endTime, "YYYY");
  const st = parseDate(startTime, "YYYY-MM-DD");
  if (s1 === e1) {
    a.push(st, parseDate(endTime, "MM-DD"));
  } else {
    a.push(st, parseDate(endTime, "YYYY-MM-DD"));
  }
  return a.join(" ~ ");
};
