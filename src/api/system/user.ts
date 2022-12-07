import request from "@/utils/request";
import type { getUserType } from "./types";

const userApi = {
  List: "/system/user/list",
};

/**
 * @param parameter
 * @returns {*}
 */
export function getUserList(parameter?: getUserType) {
  return request({
    url: userApi.List,
    method: "get",
    params: parameter,
  });
}
