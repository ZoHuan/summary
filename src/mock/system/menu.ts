import Mock from "mockjs";
import { builder } from "../util";

const list = () => {
  const menuList = [
    {
      name: "Home",
      path: "/home",
      parentId: "",
      id: 1,
      component: "layouts/RouteView",
      redirect: "/home/workplace",
      meta: {
        icon: "House",
        title: "首页",
        hidden: false,
      },
      children: [
        {
          name: "Workplace",
          path: "workplace",
          parentId: 1,
          id: 11,
          component: "home/workplace/Workplace",
          meta: {
            icon: "Odometer",
            title: "工作台",
            hidden: false,
            affix: true,
          },
        },
        {
          name: "Kanban",
          path: "kanban",
          parentId: 1,
          id: 12,
          component: "home/kanban/Kanban",
          meta: {
            icon: "DataAnalysis",
            title: "看板",
            hidden: false,
          },
        },
      ],
    },
    {
      name: "Map",
      path: "/map",
      parentId: "",
      id: 2,
      component: "layouts/RouteView",
      redirect: "/map/amap",
      meta: {
        icon: "MapLocation",
        title: "地图",
        hidden: false,
      },
      children: [
        {
          name: "AMAP",
          path: "amap",
          parentId: 2,
          id: 21,
          component: "map/amap/AMAP",
          meta: {
            icon: "LocationInformation",
            title: "高德地图",
            hidden: false,
          },
        },
        {
          name: "3DMap",
          path: "3DMap",
          parentId: 2,
          id: 22,
          component: "layouts/BlankLayout",
          meta: {
            icon: "Guide",
            title: "3D地图",
            url: "https://zohuan.github.io/Cesium/index",
            hidden: false,
            internalOrExternal: true,
          },
        },
      ],
    },
    {
      name: "System",
      path: "/system",
      parentId: "",
      id: 3,
      component: "layouts/RouteView",
      redirect: "/system/department",
      meta: {
        icon: "setting",
        title: "系统管理",
        hidden: false,
      },
      children: [
        {
          name: "Department",
          path: "department",
          parentId: 3,
          id: 31,
          component: "system/department/Department",
          meta: {
            icon: "Notification",
            title: "部门管理",
            hidden: false,
          },
        },
        {
          name: "Role",
          path: "role",
          parentId: 3,
          id: 32,
          component: "system/role/Role",
          meta: {
            icon: "Connection",
            title: "角色管理",
            hidden: false,
          },
        },
        {
          name: "User",
          path: "user",
          parentId: 3,
          id: 33,
          component: "system/user/User",
          meta: {
            icon: "Avatar",
            title: "用户管理",
            hidden: false,
          },
        },
        {
          name: "Menu",
          path: "menu",
          parentId: 3,
          id: 34,
          component: "system/menu/Menu",
          meta: {
            icon: "Menu",
            title: "菜单管理",
            hidden: false,
          },
        },
      ],
    },
    {
      name: "Account",
      path: "/account",
      parentId: "",
      id: 4,
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
          parentId: 4,
          id: 41,
          component: "account/center/Center",
          meta: {
            icon: "Postcard",
            title: "个人中心",
            hidden: false,
          },
        },
        {
          name: "Settings",
          path: "settings",
          parentId: 4,
          id: 42,
          component: "account/settings/Settings",
          redirect: "/account/settings/basic",
          meta: {
            icon: "Edit",
            title: "个人设置",
            hidden: false,
            hideChildren: true,
          },
          children: [
            {
              name: "BasicSettings",
              path: "basic",
              parentId: 42,
              id: 421,
              component: "account/settings/BasicSetting",
              meta: {
                title: "基本设置",
                hidden: true,
              },
            },
            {
              name: "SecuritySettings",
              path: "security",
              parentId: 42,
              id: 422,
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
  return builder(menuList, "");
};

Mock.mock(/\/system\/menu\/list/, "get", list);
