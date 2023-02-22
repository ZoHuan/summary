import { RouteRecordRaw } from "vue-router";
import { BlankLayout, BasicLayout } from "@/components/layouts";
/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap: Array<RouteRecordRaw> = [
  {
    path: "/user",
    component: BlankLayout,
    redirect: "/user/login",
    children: [
      {
        path: "login",
        name: "Login",
        component: () =>
          import(/* webpackChunkName: "user" */ "@/views/user/Login.vue"),
      },
      {
        path: "register",
        name: "Register",
        component: () =>
          import(/* webpackChunkName: "user" */ "@/views/user/Register.vue"),
      },
      {
        path: "register-result",
        name: "RegisterResult",
        component: () =>
          import(
            /* webpackChunkName: "user" */ "@/views/user/RegisterResult.vue"
          ),
      },
    ],
  },
  {
    path: "/redirect",
    component: BasicLayout,
    children: [
      {
        path: "/redirect/:pathMatch(.*)",
        component: () =>
          import(
            /* webpackChunkName: "redirect" */ "@/views/redirect/Redirect.vue"
          ),
      },
    ],
  },
  {
    path: "/404",
    component: () =>
      import(/* webpackChunkName: "fail" */ "@/views/exception/404.vue"),
  },
];
