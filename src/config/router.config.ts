import { RouteRecordRaw } from "vue-router";
import { BlankLayout } from "@/components/layouts";
/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap: Array<RouteRecordRaw> = [
  {
    path: "/user",
    component: BlankLayout,
    redirect: "/user/login",
    meta: { hidden: true },
    children: [
      {
        path: "login",
        name: "login",
        component: () =>
          import(/* webpackChunkName: "user" */ "@/views/user/Login.vue"),
      },
      {
        path: "register",
        name: "register",
        component: () =>
          import(/* webpackChunkName: "user" */ "@/views/user/Register.vue"),
      },
      {
        path: "register-result",
        name: "registerResult",
        component: () =>
          import(
            /* webpackChunkName: "user" */ "@/views/user/RegisterResult.vue"
          ),
      },
    ],
  },
  {
    path: "/404",
    component: () =>
      import(/* webpackChunkName: "fail" */ "@/views/exception/404.vue"),
  },
  {
    path: "/home",
    component: () =>
      import(
        /* webpackChunkName: "home" */ "@/components/layouts/BasicLayout.vue"
      ),
  },
];
