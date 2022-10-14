<template>
  <el-aside
    :class="[
      'side',
      theme,
      !collapsed && 'side-collapse',
      fixSiderbar && 'ant-fixed-sidemenu',
    ]"
  >
    <logo />
    <el-menu :collapse="!collapsed" :collapse-transition="false">
      <sub-menu :menu="item" v-for="item in menus" :key="item.name"></sub-menu>
    </el-menu>
  </el-aside>
</template>

<script lang="ts" setup>
import useTheme from "@/hooks/web/useTheme";
import type { MenuType } from "@/types/user";

import Logo from "../tools/Logo.vue";
import SubMenu from "./SubMenu.vue";

const { theme, fixSiderbar } = useTheme();

withDefaults(
  defineProps<{
    menus: Array<MenuType>;
    collapsed?: boolean;
  }>(),
  {
    collapsed: true,
  }
);
</script>

<style lang="less" scoped>
.side {
  position: relative;
  z-index: 10;
  width: 256px;
  box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
  .logo {
    height: 60px;
    padding-left: 22px;
  }
  .el-menu {
    border: none;
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
