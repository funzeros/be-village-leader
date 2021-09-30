import { App } from "vue";
import copy from "./vCopy";
const directive = { copy };
const installDirectives = (app: App<Element>) => {
  Object.keys(directive).forEach(m => {
    app.directive(m, directive[m as keyof typeof directive]);
  });
};
export { directive, installDirectives };
