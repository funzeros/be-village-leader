import { App } from "vue";
// 自定义全局通用组件
import { installIepComponents } from "./components";
// 模块
// 自定义指令
import { installDirectives } from "/@/directives/index";

// 核心启动方法
export const useCore = (app: App<Element>) => {
  installIepComponents(app);
  installDirectives(app);
};
