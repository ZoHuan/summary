<template>
  <el-header v-if="fixedHeader"></el-header>
  <el-header
    v-show="headerHide"
    :class="[
      fixedHeader && isDesktop() && 'fixed-header',
      sidebar ? 'sidemenu-opened' : 'sidemenu-closed',
    ]"
  >
    <!-- 侧边导航栏模式 -->
    <div v-if="layout === 'sidemenu'" :class="['header', theme]">
      <div>
        <el-icon class="collapse" @click="toggle">
          <Fold v-if="sidebar && isDesktop()" />
          <Expand v-else />
        </el-icon>
      </div>
      <user-menu />
    </div>

    <!-- 顶部导航栏模式 -->
    <div v-else-if="layout === 'topmenu'" :class="['header-nav', theme]">
      <div class="header-nav-wide">
        <div :class="['header-nav-wrapper', isDesktop() && 'header-nav-left']">
          <logo
            :showTitle="isDesktop()"
            :class="{ 'header-nav-logo': isDesktop() }"
          />
          <div v-if="isDesktop()" :class="{ 'header-nav-list': isDesktop() }">
            <el-menu mode="horizontal" :default-active="activeMenu">
              <sub-menu
                :menu="item"
                v-for="item in menus"
                :key="item.name"
              ></sub-menu>
            </el-menu>
          </div>
          <el-icon v-else class="collapse" @click="toggle">
            <Fold v-if="sidebar && isDesktop()" />
            <Expand v-else />
          </el-icon>
        </div>
        <user-menu :class="{ 'header-nav-right': isDesktop() }" />
      </div>
    </div>

    <!-- 两侧导航栏模式 -->
    <div v-else-if="layout === 'bothmenu'" :class="['header-nav', 'header']">
      <div :class="['header-nav-wrapper', isDesktop() && 'header-nav-left']">
        <el-icon class="collapse" @click="toggle">
          <Fold v-if="sidebar && isDesktop()" />
          <Expand v-else />
        </el-icon>
        <div v-if="isDesktop()" :class="{ 'header-nav-list': isDesktop() }">
          <el-menu
            mode="horizontal"
            class="menubar"
            :default-active="activeMenu"
          >
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
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { cloneDeep } from "lodash";
import { appStore } from "@/store/modules/app";
import useTheme from "@/hooks/web/useTheme";
import type { MenuType } from "@/types/user";

import Logo from "../tools/Logo.vue";
import UserMenu from "../tools/UserMenu.vue";
import SubMenu from "../menu/SubMenu.vue";

const route = useRoute();
const app = appStore();
const { theme, layout, sidebar, fixedHeader, fixedHeaderHidden, isDesktop } =
  useTheme();

const props = defineProps<{
  menus: Array<MenuType>;
}>();
const headerHide = ref(true);

const topMenus = computed(() => {
  const menus = cloneDeep(props.menus);
  return menus.map((menu) => {
    delete menu.children;
    return menu;
  });
});

const activeMenu = computed(() => {
  const { name, meta, matched } = route;
  app.toggleTopMenu(matched[1].name as string);
  if (meta.hidden) {
    return matched[matched.length - 2].name;
  } else {
    return name;
  }
});

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

const handleScroll = () => {
  if (fixedHeaderHidden.value) {
    const scrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;
    if (scrollTop > 60) {
      headerHide.value = false;
    } else {
      headerHide.value = true;
    }
  } else {
    headerHide.value = true;
  }
};

const emit = defineEmits(["toggle"]);
const toggle = () => {
  emit("toggle");
};
</script>

<style lang="less" scoped>
.el-header {
  padding: 0;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: 100%;
  transition: width 0.2s;
}

.header-nav-wide {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 0 10px;
}

.header,
.header-nav {
  position: relative;
  z-index: 10;
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
  box-shadow: 0 2px 8px rgb(0 0 0 / 15%);

  .header-nav-wrapper {
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px 0 0;
}
</style>
