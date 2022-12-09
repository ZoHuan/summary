import { ref } from "vue";
import {
  getDepartmentList,
  getRoleList,
  getMenuList,
} from "@/api/system/system";
import type { MenuType } from "@/types/user";

export default function () {
  // 部门配置
  const departmentProps = {
    children: "children",
    label: "name",
    value: "id",
  };
  // 菜单配置
  const menuProps = {
    children: "children",
    label: (data: MenuType) => {
      return data.meta.title;
    },
    value: "id",
  };
  // 部门数据
  const departmentList = ref();
  // 角色数据
  const roleList = ref();
  // 菜单数据
  const menuList = ref();

  // 获取部门数据
  const getDepartmentData = () => {
    getDepartmentList().then((res) => {
      departmentList.value = res.data.result;
    });
  };

  // 获取角色数据
  const getRoleData = () => {
    getRoleList().then((res) => {
      roleList.value = res.data.result;
    });
  };

  // 获取菜单数据
  const getMenuData = () => {
    getMenuList().then((res) => {
      menuList.value = res.data.result;
    });
  };

  return {
    departmentProps,
    menuProps,
    departmentList,
    roleList,
    menuList,
    getDepartmentData,
    getRoleData,
    getMenuData,
  };
}
