import request from "@/utils/request";
import type { getRoleType } from "./types";

const roleApi = {
  List: "/system/role/list",
};

/**
 * @param parameter
 * @returns {*}
 */
export function getRoleList(parameter?: getRoleType) {
  return request({
    url: roleApi.List,
    method: "get",
    params: parameter,
  });
}
