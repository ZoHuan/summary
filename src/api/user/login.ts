import request from "@/utils/request";
import type { LoginType, RegisterType, SmsType } from "./types";

const userApi = {
  Login: "/auth/login",
  Logout: "/auth/logout",
  // ForgePassword: "/auth/forge-password",
  Register: "/auth/register",
  SendSms: "/account/sms",
  UserInfo: "/user/info",
};

/**
 * @param parameter
 * @returns {*}
 */
export function loginAPi(parameter: LoginType) {
  return request({
    url: userApi.Login,
    method: "post",
    data: parameter,
  });
}

export function register(parameter: RegisterType) {
  return request({
    url: userApi.Register,
    method: "post",
    data: parameter,
  });
}

export function getSmsCaptcha(parameter: SmsType) {
  return request({
    url: userApi.SendSms,
    method: "post",
    data: parameter,
  });
}

export function getUserInfo() {
  return request({
    url: userApi.UserInfo,
    method: "get",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
  });
}

export function logoutAPi() {
  return request({
    url: userApi.Logout,
    method: "post",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
  });
}
