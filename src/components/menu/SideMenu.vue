<template>
  <el-aside
    :class="[
      'side',
      theme,
      !sidebar && 'side-collapse',
      fixSiderbar && 'fixed-sidemenu',
    ]"
  >
    <logo />
    <el-menu
      class="scroll-bar-hidden"
      :collapse="!sidebar"
      :collapse-transition="false"
      :default-active="activeMenu"
    >
      <sub-menu :menu="item" v-for="item in menus" :key="item.name"></sub-menu>
    </el-menu>
  </el-aside>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

import useTheme from "@/hooks/web/useTheme";
import type { MenuType } from "@/types/user";

import Logo from "../tools/Logo.vue";
import SubMenu from "./SubMenu.vue";

const route = useRoute();
const { theme, sidebar, fixSiderbar } = useTheme();

defineProps<{
  menus: Array<MenuType>;
}>();

const activeMenu = computed(() => {
  const { name, meta, matched } = route;
  if (meta.hidden) {
    return matched[matched.length - 2].name;
  } else {
    return name;
  }
});
</script>

<style lang="less" scoped>
.side {
  position: relative;
  z-index: 10;
  width: 256px;
  overflow: hidden;
  box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
  .logo {
    height: 60px;
    padding-left: 22px;
  }
  .el-menu {
    border: none;
  }
}
.fixed-sidemenu {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  .el-menu {
    height: calc(100% - 60px);
    overflow-y: auto;
  }
}

.side-collapse {
  width: 80px;
  .logo {
    padding-left: 15px;
  }
  .el-menu {
    margin-left: 8px;
  }
}
</style>
