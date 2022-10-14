import request from "@/utils/request";
import type * as types from "./types";

const userApi = {
  Login: "/auth/login",
  Logout: "/auth/logout",
  // ForgePassword: "/auth/forge-password",
  Register: "/auth/register",
  // twoStepCode: "/auth/2step-code",
  SendSms: "/account/sms",
  // SendSmsErr: "/account/sms_err",
  UserInfo: "/user/info",
  UserMenu: "/user/menu",
};

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
export function loginAPi(parameter: types.LoginType) {
  return request({
    url: userApi.Login,
    method: "post",
    data: parameter,
  });
}

export function register(parameter: types.RegisterType) {
  return request({
    url: userApi.Register,
    method: "post",
    data: parameter,
  });
}

export function getSmsCaptcha(parameter: types.SmsType) {
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

export function getUserMenu() {
  return request({
    url: userApi.UserMenu,
    method: "get",
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

/**
 * get user 2step code open?
 * @param parameter {*}
 */
// export function get2step(parameter) {
//   return request({
//     url: userApi.twoStepCode,
//     method: "post",
//     data: parameter,
//   });
// }
