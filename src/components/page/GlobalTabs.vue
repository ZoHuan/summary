<template>
  <div class="tags-container">
    <el-scrollbar>
      <div class="scrollbar-content">
        <p
          v-for="(item, index) in visitedViews"
          :key="index"
          class="scrollbar-item"
        >
          {{ item.meta.title }}
        </p>
      </div>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { RouteRecordRaw, useRoute } from "vue-router";
// import { triggerWindowResizeEvent } from "@/utils/util";
// import { appStore } from "@/store/modules/app";

import { permissionStore } from "@/store/modules/permission";
import { tagsStore } from "@/store/modules/tags";
// import useTheme from "@/hooks/web/useTheme";
import type { TagsType } from "@/types/user";

const route = useRoute();
// const app = appStore();
// const user = userStore();
const permission = permissionStore();
const tags = tagsStore();

// const pageList = ref();
// const linkList = ref();
// const activeName = ref();
const affixTags = ref();

const visitedViews = computed(() => {
  return tags.getVisitedViews;
});

const filterAffixTags = (routes: Array<RouteRecordRaw>, basePath = "/") => {
  let tags: Array<TagsType> = [];
  routes.forEach((route) => {
    if (route.meta && route.meta.affix) {
      const tagPath = basePath + route.path;
      tags.push({
        fullPath: tagPath,
        path: tagPath,
        name: route.name,
        meta: { ...route.meta },
      });
    }
    if (route.children) {
      const tempTags = filterAffixTags(route.children, route.path);
      if (tempTags.length >= 1) {
        tags = [...tags, ...tempTags];
      }
    }
  });
  return tags;
};

// 初始化tag
const initTags = () => {
  affixTags.value = filterAffixTags(permission.routers);
  for (const tag of affixTags.value) {
    if (tag.name) {
      tags.addVisitedView(tag);
    }
  }
};
// 新增tag
const addTags = () => {
  const { name } = route;
  if (name) {
    tags.addView(route);
  }
  return false;
};

onMounted(() => {
  initTags();
  addTags();
});

// const changePage = (TabPanelName: string) => {
//   activeName = TabPanelName;
// };

// const editPage = (paneName: string, action: string) => {
//   console.log(paneName);
// };

// const onContextmenu = (e: Event) => {
//   const pagekey = getPageKey(e.target);
//   // if (pagekey !== null) {
//   //   e.preventDefault();
//   //   // menuVisible = true;
//   // }
// };

// const getPageKey = (target: EventTarget | null, depth = 0) => {
//   if (depth > 2) {
//     return null;
//   }
//   // let pageKey = target.getAttribute("pagekey");
//   // pageKey =
//   //   pageKey ||
//   //   (target.previousElementSibling
//   //     ? target.previousElementSibling.getAttribute("pagekey")
//   //     : null);
//   // return (
//   //   pageKey ||
//   //   (target.firstElementChild
//   //     ? getPageKey(target.firstElementChild, ++depth)
//   //     : null)
//   // );
// };
</script>

<style lang="less" scoped>
.tags-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  .scrollbar-content {
    display: flex;
  }
  .scrollbar-item {
    background-color: #42b983;
    color: #fff;
    border-color: #42b983;
    cursor: pointer;
    height: 26px;
    line-height: 26px;
    border: 1px solid #d8dce5;
    color: #495060;
    background: #fff;
    padding: 0 8px;
    font-size: 12px;
  }
}
</style>
