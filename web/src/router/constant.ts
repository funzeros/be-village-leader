import { RouteRecordRaw } from "vue-router";
import { noAuthMeta } from "./config";
import Caption from "/@/views/Layout/Caption.vue";
export const EXCEPTION_COMPONENT = () => import("/@/page/Exception/404.vue");
// 404 on a page
export const PAGE_NOT_FOUND_ROUTE: RouteRecordRaw = {
  path: "/:path(.*)*",
  name: "ErrorPage",
  component: EXCEPTION_COMPONENT,
  meta: noAuthMeta
};

export const viewsRouter: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/caption"
  },
  {
    path: "/caption",
    name: "启幕",
    meta: noAuthMeta,
    component: Caption
  }
];
