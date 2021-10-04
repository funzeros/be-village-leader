import { RouteRecordRaw } from "vue-router";
import { noAuthMeta, hadAuthMeta } from "./config";
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
    redirect: "/home"
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
export const viewsRouter: RouteRecordRaw[] = [
  {
    path: "/home",
    name: "主页",
    meta: hadAuthMeta,
    component: () => import("/@/views/home/index.vue")
  }
];
