import dayjs from "dayjs";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const disabledDateToday = (time: any) => {
  return time < new Date(dayjs(Date.now()).format("YYYY-MM-DD 00:00:00"));
};
