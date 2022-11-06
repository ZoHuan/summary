<template>
  <el-container :class="['layout', device]">
    <template v-if="isMobile()">
      <el-drawer
        v-model="isCollapse"
        :custom-class="'drawer-sider ' + theme"
        :with-header="false"
        direction="ltr"
        size="256px"
        @close="() => (isCollapse = false)"
      >
        <side-menu :menus="menus"></side-menu>
      </el-drawer>
    </template>

    <template v-else>
      <side-menu v-if="layout === 'sidemenu'" :menus="menus"></side-menu>
      <side-menu
        v-else-if="layout === 'bothmenu'"
        :menus="childMenus"
      ></side-menu>
    </template>

    <el-container
      :class="[
        layout,
        `container-${contentWidth}`,
        fixSiderbar &&
          isDesktop() &&
          (sidebar ? 'sidemenu-opened' : 'sidemenu-closed'),
        ,
      ]"
    >
      <global-header :menus="menus" @toggle="toggle" />
      <global-tabs v-if="multiTab" />

      <el-main>
        <slot></slot>
      </el-main>

      <el-footer>
        <global-footer />
      </el-footer>
    </el-container>

    <setting-drawer v-if="isShow" />
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
import SettingDrawer from "@/components/setting/SettingDrawer.vue";

const app = appStore();
const user = userStore();
const permission = permissionStore();

const {
  device,
  theme,
  layout,
  topMenu,
  sidebar,
  multiTab,
  contentWidth,
  fixSiderbar,
  isMobile,
  isDesktop,
} = useTheme();

const isCollapse = ref(true);
const menus = ref();

const isShow = computed(() => {
  return (
    process.env.NODE_ENV === "development" ||
    process.env.VUE_APP_PREVIEW === "true"
  );
});

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
  isCollapse.value = !isCollapse.value;
  app.toggleSidebar(isCollapse.value);
  // triggerWindowResizeEvent();
};
</script>

<style lang="less" scoped>
.layout {
  min-height: 100vh;
  overflow-x: hidden;

  .el-main {
    height: 100%;
    width: 100%;
  }

  .el-footer {
    height: max-content;
    padding: 24px 16px 16px;
    text-align: center;
  }
}
</style>
