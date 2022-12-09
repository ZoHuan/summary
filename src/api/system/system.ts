import request from "@/utils/request";
import type {
  getDepartmentType,
  getRoleType,
  getUserType,
  getMenuType,
} from "./types";
import { DepartmentType } from "@/types/user";

const api = {
  // 部门接口
  departmentList: "/system/department/list",
  departmentInsert: "/system/department/insert",
  departmentUpdate: "/system/department/update",
  departmentDelete: "/system/department/delete",
  // 角色接口
  roleList: "/system/role/list",
  // 用户接口
  userList: "/system/user/list",
  // 菜单接口
  menuList: "/system/menu/list",
};

// 部门接口
export function getDepartmentList(parameter?: getDepartmentType) {
  return request({
    url: api.departmentList,
    method: "get",
    params: parameter,
  });
}

export function departmentInsert(parameter: DepartmentType) {
  return request({
    url: api.departmentInsert,
    method: "post",
    data: parameter,
  });
}

export function departmentUpdate(parameter: DepartmentType) {
  return request({
    url: api.departmentUpdate,
    method: "post",
    data: parameter,
  });
}

export function departmentDelete(parameter: DepartmentType) {
  return request({
    url: api.departmentDelete,
    method: "delete",
    data: parameter,
  });
}

// 角色接口
export function getRoleList(parameter?: getRoleType) {
  return request({
    url: api.roleList,
    method: "get",
    params: parameter,
  });
}

// 用户接口
export function getUserList(parameter?: getUserType) {
  return request({
    url: api.userList,
    method: "get",
    params: parameter,
  });
}

// 菜单接口
export function getMenuList(parameter?: getMenuType) {
  return request({
    url: api.menuList,
    method: "get",
    params: parameter,
  });
}
