import { App, Component } from "vue";

import FaceIcon from "/@/components/FaceIcon/index.vue";

const components: Component[] = [FaceIcon];

const installIepComponents = (app: App<Element>) => {
  components.forEach(component => {
    app.component(component.name as string, component);
  });
};

export { installIepComponents };
