import request from "@/utils/request";
import type { getDepartmentType, departmentType } from "./types";

const departmentApi = {
  List: "/system/department/list",
  Insert: "/system/department/insert",
  Update: "/system/department/update",
  Delete: "/system/department/delete",
};

/**
 * @param parameter
 * @returns {*}
 */
export function getDepartmentList(parameter: getDepartmentType) {
  return request({
    url: departmentApi.List,
    method: "get",
    params: parameter,
  });
}

export function departmentInsert(parameter: departmentType) {
  return request({
    url: departmentApi.Insert,
    method: "post",
    data: parameter,
  });
}

export function departmentUpdate(parameter: departmentType) {
  return request({
    url: departmentApi.Update,
    method: "post",
    data: parameter,
  });
}

export function departmentDelete(parameter: departmentType) {
  return request({
    url: departmentApi.Delete,
    method: "delete",
    data: parameter,
  });
}
