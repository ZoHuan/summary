import { defineStore } from "pinia";
import { useCache } from "@/hooks/web/useCache";
import {
  loginAPi,
  getUserInfo,
  getUserMenu,
  logoutAPi,
} from "@/api/user/login";
import type { LoginType } from "@/api/user/types";
import type { MenuType } from "@/types/user";
import { ACCESS_TOKEN } from "../mutation-types";
import { AxiosResponse } from "axios";

const { storage } = useCache();

export interface UserState {
  token: string;
  name: string;
  username: string;
  // realname: string,
  // welcome: string;
  avatar: string;
  info: object;
  roles: Array<string>;
  menuList: Array<MenuType>;
}

export const userStore = defineStore({
  id: "user",
  state: (): UserState => ({
    token: "",
    name: "",
    username: "",
    // realname: "",
    // welcome: "",
    avatar: "",
    info: {},
    roles: [],
    menuList: [],
  }),
  actions: {
    // 登录
    login(userInfo: LoginType) {
      return new Promise((resolve, reject) => {
        loginAPi(userInfo)
          .then((response) => {
            const result = response.data.result;
            if (response.data.code === 200) {
              storage.set(ACCESS_TOKEN, result.token);
              this.token = result.token;
              resolve(response);
            } else {
              reject(response);
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    // 获取用户信息
    getInfo() {
      return new Promise((resolve: (value: AxiosResponse) => void, reject) => {
        getUserInfo()
          .then((response) => {
            const result = response.data.result;

            // if (result.role && result.role.permissions.length > 0) {
            if (result.roles) {
              // const role = result.role;
              // role.permissions = result.role.permissions;
              // role.permissions.map((per: PermissionsType) => {
              //   if (
              //     per.actionEntitySet != null &&
              //     per.actionEntitySet.length > 0
              //   ) {
              //     const action = per.actionEntitySet.map((action) => {
              //       return action.action;
              //     });
              //     per.actionList = action;
              //   }
              // });
              // role.permissionList = role.permissions.map(
              //   (permission: PermissionsType) => {
              //     return permission.permissionId;
              //   }
              // );
              this.roles = result.roles;
              this.info = result;
            } else {
              reject(new Error("getInfo: roles must be a non-null array !"));
            }

            this.name = result.name;
            this.username = result.username;
            this.avatar = result.avatar;
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    getMenu() {
      return new Promise((resolve, reject) => {
        getUserMenu()
          .then((response) => {
            const result = response.data.result;
            this.menuList = result;

            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    // 登出
    logout() {
      return new Promise((resolve) => {
        logoutAPi()
          .then(() => {
            this.token = "";
            this.roles = [];
            storage.delete(ACCESS_TOKEN);
            resolve("");
          })
          .catch((err) => {
            console.log("logout fail:", err);
            // resolve()
          });
      });
    },
  },
});
