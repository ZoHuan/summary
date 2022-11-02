import Mock from "mockjs";
import { builder } from "../util";

const userInfo = () => {
  const userInfo = {
    id: "4291d7da9005377ec9aec4a71ea837f",
    username: "admin",
    name: "管理员",
    password: "",
    avatar: "/avatar.jpg",
    telephone: "",
    status: 1,
    lastLoginIp: "27.154.74.117",
    lastLoginTime: 1534837621348,
    creatorId: "admin",
    createTime: 1497160610259,
    merchantCode: "TLif2btpzg079h15bk",
    deleted: 0,
    roles: ["admin"],
  };

  return builder(userInfo, "");
};

const userMenu = () => {
  const menu = [
    // dashboard
    {
      name: "Home",
      path: "/home",
      parentId: 0,
      id: 1,
      component: "layouts/RouteView",
      redirect: "/home/workplace",
      meta: {
        icon: "setting",
        title: "首页",
        hidden: false,
      },
      children: [
        {
          name: "Workplace",
          path: "workplace",
          parentId: 1,
          id: 2,
          component: "home/Workplace",
          meta: {
            icon: "user",
            title: "工作台",
            hidden: false,
            affix: true,
          },
        },
      ],
    },
    {
      name: "System",
      path: "/system",
      parentId: 0,
      id: 1,
      component: "layouts/RouteView",
      // redirect: "/dashboard/workplace",
      meta: {
        icon: "setting",
        title: "系统管理",
        hidden: false,
      },
      children: [
        {
          name: "Department",
          path: "department",
          parentId: 1,
          id: 2,
          component: "system/department/Department",
          meta: {
            icon: "user",
            title: "部门管理",
            hidden: false,
          },
        },
        {
          name: "Role",
          path: "role",
          parentId: 1,
          id: 3,
          component: "RoleList",
          meta: {
            icon: "user",
            title: "角色管理",
            hidden: false,
          },
        },
        {
          name: "User",
          path: "user",
          parentId: 1,
          id: 4,
          component: "UserList",
          meta: {
            icon: "user",
            title: "用户管理",
            hidden: false,
          },
        },
        {
          name: "Menu",
          path: "menu",
          parentId: 1,
          id: 5,
          component: "MenuList",
          meta: {
            icon: "user",
            title: "菜单管理",
            hidden: false,
          },
        },
      ],
    },
    {
      name: "Account",
      path: "/account",
      parentId: 0,
      id: 1,
      component: "layouts/RouteView",
      // redirect: "/dashboard/workplace",
      meta: {
        icon: "setting",
        title: "个人页",
        hidden: false,
      },
    },
  ];
  return builder(menu, "");
};

Mock.mock(/\/user\/info/, "get", userInfo);
Mock.mock(/\/user\/menu/, "get", userMenu);
