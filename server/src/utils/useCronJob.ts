import { gConsole } from "./index";

export class CronJob {
  task: Map<string, NodeJS.Timer>;
  constructor() {
    this.task = new Map();
    gConsole.color("定时任务初始化完成", "greenBG");
  }
  addInterval(name: string, cb: () => void, timeout: number) {
    if (this.task.has(name)) clearInterval(this.task.get(name));
    setInterval(cb, timeout);
    gConsole.color(
      `添加循环定时任务${name}，间隔${timeout / 1000}秒`,
      "magentaBG"
    );
  }
  addTimeout(name: string, cb: () => void, timeout: number) {
    if (this.task.has(name)) clearTimeout(this.task.get(name));
    setTimeout(cb, timeout);
    gConsole.color(
      `添加延迟定时任务${name}，间隔${timeout / 1000}秒`,
      "magentaBG"
    );
  }
}
export const cronJob = new CronJob();
