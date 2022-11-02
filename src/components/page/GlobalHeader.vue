<template>
  <el-header
    v-if="!headerBarFixed"
    :class="[
      fixedHeader && 'header-fixedHeader',
      sidebar ? 'header-side-opened' : 'header-side-closed',
    ]"
  >
    <!-- 侧边导航栏模式 -->
    <div v-if="layout === 'sidemenu'" :class="['header', theme]">
      <div>
        <el-icon class="collapse" @click="toggle">
          <Fold v-if="collapsed" />
          <Expand v-else />
        </el-icon>
      </div>
      <user-menu />
    </div>

    <!-- 顶部导航栏模式 -->
    <div v-else-if="layout === 'topmenu'" :class="['header-nav', theme]">
      <div class="header-nav-wrap" :class="{ 'header-nav-left': isDesktop() }">
        <logo
          :showTitle="isDesktop()"
          :class="{ 'header-nav-logo': isDesktop() }"
        />
        <div v-if="isDesktop()" :class="{ 'header-nav-list': isDesktop() }">
          <el-menu mode="horizontal">
            <sub-menu
              :menu="item"
              v-for="item in menus"
              :key="item.name"
            ></sub-menu>
          </el-menu>
        </div>
        <el-icon v-else class="collapse" @click="toggle">
          <Fold v-if="collapsed" />
          <Expand v-else />
        </el-icon>
      </div>
      <user-menu :class="{ 'header-nav-right': isDesktop() }" />
    </div>

    <!-- 两侧导航栏模式 -->
    <div v-else-if="layout === 'bothmenu'" :class="['header-nav', 'header']">
      <div class="header-nav-wrap" :class="{ 'header-nav-left': isDesktop() }">
        <el-icon class="collapse" @click="toggle">
          <Fold v-if="collapsed" />
          <Expand v-else />
        </el-icon>
        <div v-if="isDesktop()" :class="{ 'header-nav-list': isDesktop() }">
          <el-menu mode="horizontal" class="menubar">
            <sub-menu
              :menu="item"
              v-for="item in topMenus"
              :key="item.name"
            ></sub-menu>
          </el-menu>
        </div>
      </div>
      <user-menu :class="{ 'header-nav-right': isDesktop() }" />
    </div>
  </el-header>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { cloneDeep } from "lodash";
import useTheme from "@/hooks/web/useTheme";
import type { MenuType } from "@/types/user";

import Logo from "../tools/Logo.vue";
import UserMenu from "../tools/UserMenu.vue";
import SubMenu from "../menu/SubMenu.vue";

const { sidebar, theme, layout, fixedHeader, isDesktop } = useTheme();

const props = withDefaults(
  defineProps<{
    menus: Array<MenuType>;
    collapsed?: boolean;
  }>(),
  {
    collapsed: true,
  }
);

const headerBarFixed = ref(false);

const topMenus = computed(() => {
  const menus = cloneDeep(props.menus);
  return menus.map((menu) => {
    delete menu.children;
    return menu;
  });
});

const emit = defineEmits(["toggle"]);
const toggle = () => {
  emit("toggle");
};
</script>

<style lang="less" scoped>
.el-header {
  padding: 0;
}

.header,
.header-nav {
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  color: #303133;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  transition: background 0.3s, width 0.2s;

  .collapse {
    display: flex;
    width: max-content;
    padding: 0 18px;
    font-size: 24px;
    cursor: pointer;
    transition: color 0.3s, background 0.3s;

    &:hover {
      background: rgba(0, 0, 0, 0.05);
    }
  }

  .el-menu {
    border: none;
  }
}

.header-nav {
  padding: 0 10px;
  box-shadow: 0 2px 8px rgb(0 0 0 / 15%);

  .header-nav-wrap {
    display: flex;
  }

  .header-nav-left {
    width: calc(100% - 350px);
  }

  .header-nav-right {
    min-width: 350px;
  }

  .header-nav-logo {
    min-width: 165px;
  }
  .header-nav-list {
    width: calc(100% - 165px);
  }
}
.header {
  padding: 0 12px 0 0;
}
</style>
