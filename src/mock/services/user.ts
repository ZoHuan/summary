import Mock from "mockjs";
import { builder } from "../util";

const userInfo = () => {
  const userInfo = {
    id: "4291d7da9005377ec9aec4a71ea837f",
    username: "admin",
    name: "管理员",
    password: "",
    avatar: "@/assets/avatar.png",
    telephone: "",
    status: 1,
    creatorId: "admin",
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
          component: "system/role/Role",
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
          component: "system/user/User",
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
      redirect: "/account/center",
      meta: {
        icon: "user",
        title: "个人页",
        hidden: false,
      },
      children: [
        {
          name: "Center",
          path: "center",
          parentId: 1,
          id: 11,
          component: "account/center/Center",
          meta: {
            title: "个人中心",
            hidden: false,
          },
        },
        {
          name: "Settings",
          path: "settings",
          parentId: 1,
          id: 22,
          component: "account/settings/Settings",
          redirect: "/account/settings/basic",
          meta: {
            title: "个人设置",
            hidden: false,
            hideChildren: true,
          },
          children: [
            {
              name: "BasicSettings",
              path: "basic",
              parentId: 22,
              id: 221,
              component: "account/settings/BasicSetting",
              meta: {
                title: "基本设置",
                hidden: true,
              },
            },
            {
              name: "SecuritySettings",
              path: "security",
              parentId: 22,
              id: 222,
              component: "account/settings/SecuritySettings",
              meta: {
                title: "安全设置",
                hidden: true,
              },
            },
          ],
        },
      ],
    },
  ];
  return builder(menu, "");
};

Mock.mock(/\/user\/info/, "get", userInfo);
Mock.mock(/\/user\/menu/, "get", userMenu);
