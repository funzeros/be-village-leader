import { createStore } from "vuex";
import type { App } from "vue";
import user from "./modules/user/index";
// import common from "./modules/common/index";

import { getters } from "./getters";

export function useStore() {
  return createStore({
    mutations: {},
    actions: {},
    modules: {
      user
      // common
    },
    getters
  });
}
const store = useStore();

export function setupStore(app: App<Element>) {
  app.use(store);
}

export default store;
