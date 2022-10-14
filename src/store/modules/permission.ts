import { defineStore } from "pinia";
import { RouteRecordRaw } from "vue-router";
import { constantRouterMap } from "@/config/router.config";

export interface PermissionState {
  routers: Array<RouteRecordRaw>;
  addRouters: Array<RouteRecordRaw>;
  permissionList: string;
}

export const permissionStore = defineStore({
  id: "permission",
  state: (): PermissionState => ({
    routers: constantRouterMap,
    addRouters: [],
    permissionList: "-1",
  }),
  actions: {
    generateRoutes(data: Array<RouteRecordRaw>) {
      return new Promise((resolve) => {
        this.routers = constantRouterMap.concat(data);
        this.addRouters = data;
        resolve("");
      });
    },
  },
});
