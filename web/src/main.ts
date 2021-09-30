import { createApp } from "vue";
// 主入口文件
import App from "./App.vue";

import { setupStore } from "./store";

// 路由与存储引入
import { router, setupRouter } from "./router/index";

// 核心
import { useCore } from "/@/core/index";
import initializer from "./core/bootstrap";

import "/@/styles/index.scss";
import "/@/styles/faceicon/iconfont.js";
import "/@/styles/faceicon/iconfont.css";
import { setupRouterGuard } from "./router/guard";

(async () => {
  const app = createApp(App);

  // Configure vuex store
  setupStore(app);

  // Initialize internal system configuration
  initializer();

  // 启动模块
  useCore(app);

  // Configure routing
  // 权限路由限制 router.beforeEach router.afterEach
  setupRouter(app);

  // router-guard
  // router-guard
  setupRouterGuard();

  await router.isReady();

  app.mount("#app", true);
})();
