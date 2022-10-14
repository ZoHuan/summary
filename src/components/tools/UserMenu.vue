<template>
  <div class="user-wrapper">
    <span class="action" @click.stop="showClick">
      <el-icon><Search /></el-icon>
    </span>
    <component
      v-show="searchMenuVisible || isMobile()"
      :is="searchMenuComp"
      v-model="searchMenuVisible"
      title="搜索菜单"
      @close="searchMenuVisible = false"
    >
      <el-select
        suffix-icon=""
        filterable
        placeholder="搜索菜单"
        :persistent="isMobile() ? true : false"
        @change="searchMethods"
      >
        <el-option
          v-for="(site, index) in searchMenuOptions"
          :key="index"
          :label="site.meta.title"
          :value="site.path"
          >{{ site.meta.title }}</el-option
        >
      </el-select>
    </component>
    <el-dropdown>
      <span class="action action-full el-dropdown-link">
        <el-avatar :src="getAvatar()" size="small" />
        <span v-if="isDesktop()">{{ store.name }}</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleToCenter">
            <el-icon><User /></el-icon>
            个人中心
          </el-dropdown-item>
          <el-dropdown-item @click="handleToSettings">
            <el-icon><Setting /></el-icon>
            账户设置
          </el-dropdown-item>
          <el-dropdown-item divided @click="handleLogout">
            <el-icon><SwitchButton /></el-icon>
            退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { ElMessageBox } from "element-plus";
import { userStore } from "@/store/modules/user";
import useTheme from "@/hooks/web/useTheme";
import { treeToList } from "@/utils/router";
import { MenuType } from "@/types/user";

const router = useRouter();
const store = userStore();

const { device, isMobile, isDesktop } = useTheme();
const list: Array<MenuType> = [];
treeToList(list, store.menuList);

const searchMenuOptions = ref(list);
const searchMenuComp = ref("span");
const searchMenuVisible = ref(false);

const showClick = () => {
  searchMenuVisible.value = true;
};

const hideClick = () => {
  searchMenuVisible.value = false;
};

const searchMethods = (value: unknown) => {
  const route = searchMenuOptions.value.filter(
    (item) => item.path === value
  )[0];
  if (
    route.meta.internalOrExternal === true ||
    route.component.includes("layouts/IframePageView")
  ) {
    window.open(route.meta.url, "_blank");
  } else {
    router.push({ name: route.name });
  }
  searchMenuVisible.value = false;
};

const getAvatar = () => {
  return require("@/assets/avatar.png");
};

const handleToCenter = () => {
  router.push({ path: "/account/center" });
};
const handleToSettings = () => {
  router.push({ path: "/account/settings" });
};
const handleLogout = () => {
  ElMessageBox.confirm("您确定要注销吗？", "提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    return store.logout().then(() => {
      router.push({ name: "login" });
    });
  });
};

watch(
  device,
  () => {
    searchMenuVisible.value = false;
    searchMenuComp.value = isMobile() ? "el-dialog" : "span";
  },
  { immediate: true }
);
watch(searchMenuVisible, (newValue) => {
  if (newValue) {
    document.body.addEventListener("click", hideClick);
  } else {
    document.body.removeEventListener("click", hideClick);
  }
});
</script>

<style lang="less" scoped>
.user-wrapper {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;

  .el-dropdown {
    height: 100%;
  }

  .action {
    display: inline-flex;
    align-items: center;
    height: 70%;
    padding: 0 14px;
    color: #fff;
    transition: all 0.3s;
    cursor: pointer;

    &.action-full {
      display: flex;
      height: 100%;
    }

    &:hover {
      background: rgba(255, 255, 255, 0.3);
    }

    .el-avatar {
      margin-right: 8px;
      background: rgba(255, 255, 255, 0.85);
    }
  }
}
</style>
