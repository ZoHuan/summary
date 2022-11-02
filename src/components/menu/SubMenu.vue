<template>
  <el-sub-menu :index="menu.name" v-if="menu.children">
    <template #title>
      <el-icon><component :is="menu.meta.icon"></component></el-icon>
      <span>{{ menu.meta.title }}</span>
    </template>
    <!-- 多级嵌套菜单渲染 -->
    <sub-menu
      v-for="item in menu.children"
      :menu="item"
      :key="item.name"
    ></sub-menu>
  </el-sub-menu>
  <el-menu-item :index="menu.name" v-else @click="jumpRoute(menu)">
    <el-icon><component :is="menu.meta.icon"></component></el-icon>
    <template #title>
      <span>{{ menu.meta.title }}</span>
    </template>
  </el-menu-item>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { appStore } from "@/store/modules/app";
import type { MenuType } from "@/types/user";

const router = useRouter();
const app = appStore();

defineProps<{
  menu: MenuType;
}>();

const jumpRoute = (menu: MenuType) => {
  if (menu.component === "layouts/RouteView") {
    app.toggleTopMenu(menu.name);
  } else {
    router.push({ name: menu.name });
  }
};
</script>
