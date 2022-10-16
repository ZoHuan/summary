<template>
  <el-container :class="['layout', device]">
    <template v-if="isMobile()">
      <el-drawer
        v-model="collapsed"
        :custom-class="'drawer-sider ' + theme"
        :with-header="false"
        direction="ltr"
        size="256px"
        @close="() => (collapsed = false)"
      >
        <side-menu :menus="menus" :collapsed="collapsed"></side-menu>
      </el-drawer>
    </template>

    <template v-else>
      <side-menu
        v-if="layout === 'sidemenu'"
        :menus="menus"
        :collapsed="collapsed"
      ></side-menu>
      <side-menu
        v-else-if="layout === 'bothmenu'"
        :menus="childMenus"
        :collapsed="collapsed"
      ></side-menu>
    </template>

    <el-container
      :class="[layout, `content-width-${contentWidth}`]"
      :style="{
        paddingLeft:
          fixSiderbar && isDesktop() ? `${sidebar ? 200 : 80}px` : '0',
      }"
    >
      <global-header :menus="menus" :collapsed="collapsed" @toggle="toggle" />
      <global-tabs />

      <el-main :class="{ 'fixed-header': fixedHeader }">
        <slot></slot>
      </el-main>

      <el-footer>
        <global-footer />
      </el-footer>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
// import { triggerWindowResizeEvent } from "@/utils/util";
import { appStore } from "@/store/modules/app";
import { userStore } from "@/store/modules/user";
import { permissionStore } from "@/store/modules/permission";
import useTheme from "@/hooks/web/useTheme";
import type { MenuType } from "@/types/user";

import GlobalHeader from "@/components/page/GlobalHeader.vue";
import GlobalFooter from "@/components/page/GlobalFooter.vue";
import GlobalTabs from "@/components/page/GlobalTabs.vue";
import SideMenu from "@/components/menu/SideMenu.vue";

const app = appStore();
const user = userStore();
const permission = permissionStore();

const {
  sidebar,
  device,
  theme,
  layout,
  topMenu,
  // multiTab,
  contentWidth,
  fixedHeader,
  fixSiderbar,
  // autoHideHeader,
  // color,
  // weak,
  isMobile,
  isDesktop,
} = useTheme();

const collapsed = ref(true);
// const activeMenu = ref();
const menus = ref();

const childMenus = computed(() => {
  let menu = menus.value.find((item: MenuType) => item.name === topMenu.value);
  return (menu && menu.children) || {};
});

const permissionMenuList = () => {
  const routers = user.menuList;

  if (permission.permissionList === "-1") return routers;

  let router = routers.find((item) => {
    return item.name === permission.permissionList;
  });

  return (router && router.children) || routers;
};

menus.value = permissionMenuList();

const toggle = () => {
  collapsed.value = !collapsed.value;
  app.toggleSidebar(!collapsed.value);
  // triggerWindowResizeEvent();
};
</script>

<style lang="less" scoped>
.layout {
  min-height: 100vh;
  overflow-x: hidden;

  .el-main {
    height: 100%;
  }
  .fixed-header {
    padding-top: 60px;
  }
  .el-footer {
    height: max-content;
    margin: 24px 0 16px;
    padding: 0 16px;
    text-align: center;
  }
}
</style>
