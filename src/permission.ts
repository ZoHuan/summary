import router from "./router";
import pinia from "./store";
import type { AxiosResponse } from "axios";
import { userStore } from "@/store/modules/user";
import { permissionStore } from "@/store/modules/permission";
import { ACCESS_TOKEN } from "@/store/mutation-types";
import { useCache } from "@/hooks/web/useCache";
import { useNProgress } from "@/hooks/web/useNProgress";
import { decide } from "@/utils";
import { generateIndexRouter } from "@/utils/router";

const user = userStore(pinia);
const permission = permissionStore(pinia);
const { storage } = useCache();
const { start, done } = useNProgress();

const whiteList = ["/user/login", "/user/register", "/user/register-result"]; // 不重定向白名单
const loginRoutePath = "/user/login";
const defaultRoutePath = "/home";

router.beforeEach((to, from, next) => {
  start();
  if (storage.get(ACCESS_TOKEN)) {
    if (to.path === loginRoutePath) {
      next({ path: defaultRoutePath });
      done();
    } else {
      if (decide.isEmptyObject(user.info)) {
        user
          .getInfo()
          .then(() => {
            user.getMenu().then((res) => {
              const menuData = (res as AxiosResponse).data.result;
              // if (!decide.isArray(menuData) || !menuData.length) return;

              const routeList = generateIndexRouter(menuData);
              permission.generateRoutes(routeList).then(() => {
                permission.addRouters.forEach((route) => {
                  router.addRoute(route);
                });

                const redirect = decodeURIComponent(
                  (from.query.redirect as string) || to.path
                );
                if (to.path === redirect) {
                  // set the replace: true so the navigation will not leave a history record
                  next({ ...to, replace: true });
                } else {
                  // 跳转到目的路由
                  next({ path: redirect });
                }
              });
            });
          })
          .catch(() => {
            user.logout().then(() => {
              next({ path: loginRoutePath, query: { redirect: to.fullPath } });
            });
          });
      } else {
        next();
      }
    }
  } else {
    if (whiteList.includes(to.path)) {
      next();
    } else {
      next({ path: loginRoutePath, query: { redirect: to.fullPath } }); // 否则全部重定向到登录页
      done();
    }
  }
});

router.afterEach(() => {
  done();
});
