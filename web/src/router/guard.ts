import { router } from "/@/router";

import { createPermissionGuard } from "./permission";

export function setupRouterGuard() {
  createPermissionGuard(router);
}
