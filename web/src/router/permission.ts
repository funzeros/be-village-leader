import type { Router } from "vue-router";
import { nProgress } from "/@/core/nProgress";
import { loginRoutePath, mainRoutePath } from "/@/const/path";
import store from "/@/store";
import { ActionTypes } from "../store/modules/user/action-types";
export function createPermissionGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    nProgress.start();
    const meta = to.meta || {};
    const accessToken = store.state.user.userInfo?.token;
    if (to.path === loginRoutePath && accessToken)
      return next({ path: mainRoutePath });
    if (!meta.isAuth) return next();
    if (accessToken) return next();
    const data = await store.dispatch(ActionTypes.TOKEN_AUTH);
    if (data) return next();
    const redirect = encodeURIComponent(to.fullPath);
    next({
      path: loginRoutePath,
      query: {
        redirect
      }
    });
  });

  router.afterEach(() => {
    nProgress.done();
  });
}
