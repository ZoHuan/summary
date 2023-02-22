import { RouteRecordRaw } from "vue-router";
import { MenuType } from "@/types/user";

// 生成首页路由
export function generateIndexRouter(menuList: Array<MenuType>) {
  const data = JSON.parse(JSON.stringify(menuList));
  const indexRouter = [
    {
      path: "/",
      component: () => import("@/components/layouts/BasicLayout.vue"),
      redirect: "/home",
      children: [...generateChildRouters(data)],
    },
    {
      path: "/:pathMatch(.*)",
      redirect: "/404",
    },
  ];
  return indexRouter;
}

// 生成嵌套路由（子路由）
function generateChildRouters(menuList: Array<MenuType>) {
  const routers = [];
  for (const item of menuList) {
    let component = "";
    if (item.component.indexOf("layouts") >= 0) {
      component = "components/" + item.component;
    } else {
      component = "views/" + item.component;
    }

    // let URL = (item.meta.url || "").replace(/{{([^}}]+)?}}/g, (s1, s2) =>
    //   eval(s2)
    // ); // URL支持{{ window.xxx }}占位符变量
    // if (isURL(URL)) {
    //   item.meta.url = URL;
    // }

    // online菜单路由加载逻辑
    // const componentPath = (resolve:()=>void) =>
    //   require(["@/" + component + ".vue"], resolve);

    const menu: RouteRecordRaw = {
      path: item.path, // item.path.startsWith('/') ? item.path.substr(1, item.path.length) : item.path,
      name: item.name,
      redirect: item.redirect,
      component: () => import(`@/${component}.vue`),
      meta: { ...item.meta },
      children:[]
    };

    if (item.children && item.children.length > 0) {
      menu.children = [...generateChildRouters(item.children)];
    }
    // 判断是否生成路由
    // if (item.route && item.route === "0") {
    // console.log(' 不生成路由 item.route：  '+item.route);
    // console.log(' 不生成路由 item.path：  '+item.path);
    // } else {
    routers.push(menu);
    // }
  }
  return routers;
}

/**
 * 树形结构转数组
 * @param list 数组
 * @param tree 树
 */
export function treeToList(list: Array<MenuType>, tree: Array<MenuType>) {
  tree.forEach((item) => {
    if (!item.meta.hidden && item.component !== "layouts/RouteView") {
      list.push(item);
    }
    if (item.children && item.children.length > 0) {
      treeToList(list, item.children);
    }
  });
}
