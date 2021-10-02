import { RouteRecordRaw } from "vue-router";
import { noAuthMeta } from "./config";
import Caption from "/@/layout/Caption.vue";
export const PAGE_NOT_FOUND_ROUTE: RouteRecordRaw = {
  path: "/:path(.*)*",
  name: "ErrorPage",
  component: () => import("/@/page/notFound/404.vue"),
  meta: noAuthMeta
};

export const pageRouter: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/caption"
  },
  {
    path: "/caption",
    redirect: "/caption/gate",
    name: "启幕",
    meta: noAuthMeta,
    component: Caption,
    children: [
      {
        path: "gate",
        name: "封面",
        meta: noAuthMeta,
        component: () => import("/@/page/caption/Gate.vue")
      },
      {
        path: "login",
        name: "登录",
        meta: noAuthMeta,
        component: () => import("/@/page/caption/Login.vue")
      }
    ]
  }
];
