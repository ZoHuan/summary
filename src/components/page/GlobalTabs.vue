<template>
  <div class="tags-container">
    <el-scrollbar ref="scrollPane" @scroll="scroll">
      <div class="scrollbar-content" ref="scrollContent">
        <span
          v-for="item in visitedViews"
          :key="item.path"
          :class="[
            'scrollbar-item',
            isActive(item) && 'active',
            !isAffix(item) && 'no-affix',
          ]"
          @click="tabClick(item)"
          @contextmenu.prevent="openMenu(item, $event)"
        >
          {{ item.meta.title }}
          <el-icon v-if="!isAffix(item)" @click.stop="closeTag(item)"
            ><Close
          /></el-icon>
        </span>
      </div>
    </el-scrollbar>
    <context-menu
      v-if="menuVisible"
      :left="menuFixed[0]"
      :top="menuFixed[1]"
      :menuList="menuList"
      @select="menuSelect"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElScrollbar } from "element-plus";
import path from "path";

import { permissionStore } from "@/store/modules/permission";
import { tagsStore } from "@/store/modules/tags";

import ContextMenu from "@/components/tools/ContextMenu.vue";

import type { RouteLocationNormalizedLoaded, RouteRecordRaw } from "vue-router";
import type { TagsType, ContextMenuType } from "@/types/user";

const route = useRoute();
const router = useRouter();

const permission = permissionStore();
const tags = tagsStore();

const scrollNum = ref(0);
const scrollPane = ref<InstanceType<typeof ElScrollbar>>();
const scrollContent = ref();
const affixTags = ref();
const selectedTag = ref();
const menuVisible = ref(false);
const menuFixed = ref();
const menuList = [
  {
    icon: "Refresh",
    text: "重新加载",
    disabled: () => false,
    select: () => {
      refreshTag();
    },
  },
  {
    icon: "Close",
    text: "关闭标签页",
    disabled: () => {
      return !!isAffix(selectedTag.value);
    },
    select: () => {
      closeTag(selectedTag.value);
    },
  },
  {
    icon: "Back",
    text: "关闭左侧标签页",
    disabled: () => {
      return selectedTag.value.fullPath === visitedViews.value[0].fullPath;
    },
    select: () => {
      closeLeftTag();
    },
  },
  {
    icon: "Right",
    text: "关闭右侧标签页",
    disabled: () => {
      return (
        selectedTag.value.fullPath ===
        visitedViews.value[visitedViews.value.length - 1].fullPath
      );
    },
    select: () => {
      closeRightTag();
    },
  },
  {
    icon: "Discount",
    text: "关闭其他标签页",
    disabled: () => false,
    select: () => {
      closeOthersTag();
    },
  },
  {
    icon: "Minus",
    text: "关闭全部标签页",
    disabled: () => false,
    select: () => {
      closeAllTag(selectedTag.value);
    },
  },
];

const visitedViews = computed(() => {
  return tags.getVisitedViews;
});

onMounted(() => {
  initTags();
  addTags();
});

watch(
  () => route.fullPath,
  () => {
    addTags();
    moveToCurrentTag();
  }
);

watch(menuVisible, (newValue) => {
  if (newValue) {
    document.body.addEventListener("click", closeMenu);
  } else {
    document.body.removeEventListener("click", closeMenu);
  }
});

const isActive = (tag: RouteLocationNormalizedLoaded) => {
  return tag.path === route.path;
};

const isAffix = (tag: RouteLocationNormalizedLoaded) => {
  return tag.meta && tag.meta.affix;
};

// 打开菜单
const openMenu = (tag: RouteLocationNormalizedLoaded, e: MouseEvent) => {
  selectedTag.value = tag;
  menuVisible.value = true;
  menuFixed.value = [e.clientX, e.clientY];
};

// 菜单选择
const menuSelect = (menu: ContextMenuType) => {
  menu.select();
};

// 关闭菜单
const closeMenu = () => {
  menuVisible.value = false;
};

// tag点击
const tabClick = (tag: RouteLocationNormalizedLoaded) => {
  router.push({ path: tag.path, query: tag.query });
};

// 过滤固定tag
const filterAffixTags = (routes: Array<RouteRecordRaw>, basePath = "/") => {
  let tagList: Array<TagsType> = [];
  routes.forEach((route) => {
    if (route.meta && route.meta.affix) {
      const tagPath = path.resolve(basePath, route.path);
      tagList.push({
        fullPath: tagPath,
        path: tagPath,
        name: route.name,
        meta: { ...route.meta },
      });
    }
    if (route.children) {
      const tempTags = filterAffixTags(route.children, route.path);
      if (tempTags.length >= 1) {
        tagList = [...tagList, ...tempTags];
      }
    }
  });
  return tagList;
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

// 刷新tag
const refreshTag = () => {
  tags.delCachedView(selectedTag.value);
  const { fullPath } = selectedTag.value;
  nextTick(() => {
    router.replace({
      path: "/redirect" + fullPath,
    });
  });
};

// 关闭tag
const closeTag = (tag: RouteLocationNormalizedLoaded) => {
  tags.delView(tag);
  if (isActive(tag)) {
    toLastTag();
  }
};

// 关闭左侧tag
const closeLeftTag = () => {
  router.push(selectedTag.value);
  tags.delLeftViews(selectedTag.value);
  moveToCurrentTag();
};

// 关闭右侧tag
const closeRightTag = () => {
  router.push(selectedTag.value);
  tags.delRightViews(selectedTag.value);
  moveToCurrentTag();
};

// 关闭其他tag
const closeOthersTag = () => {
  router.push(selectedTag.value);
  tags.delOthersViews(selectedTag.value);
  moveToCurrentTag();
};

// 关闭全部tag
const closeAllTag = (tag: RouteLocationNormalizedLoaded) => {
  tags.delAllViews();
  if (affixTags.value.some((item: TagsType) => item.path === tag.path)) {
    return;
  }
  toLastTag();
};

// 跳转到最后tag
const toLastTag = () => {
  const latestView = visitedViews.value.slice(-1)[0];
  if (latestView) {
    router.push(latestView.fullPath);
  } else {
    if (selectedTag.value.name === "Workplace") {
      router.replace({ path: "/redirect" + selectedTag.value.fullPath });
    } else {
      router.push("/");
    }
  }
};

// 移动到当前tag
const moveToCurrentTag = () => {
  nextTick(() => {
    for (const v of visitedViews.value) {
      if (v.path === route.path) {
        moveToTarget(v);
        if (v.fullPath !== route.fullPath) {
          tags.updateVisitedView(router.currentRoute.value);
        }
        break;
      }
    }
  });
};

// 滚动值
const scroll = ({ scrollLeft }: { scrollLeft: number }) => {
  scrollNum.value = scrollLeft;
};

// 移动到目标
const moveToTarget = (tag: RouteLocationNormalizedLoaded) => {
  const $container = scrollPane.value?.wrap$;
  const $containerWidth = $container?.offsetWidth as number;
  const tagList = scrollContent.value?.children;

  let firstTag = null;
  let lastTag = null;

  if (visitedViews.value.length > 0) {
    firstTag = visitedViews.value[0];
    lastTag = visitedViews.value[visitedViews.value.length - 1];
  }

  if (firstTag === tag) {
    scrollPane.value?.setScrollLeft(0);
  } else if (lastTag === tag) {
    scrollPane.value?.setScrollLeft(
      ($container?.scrollWidth as number) - $containerWidth
    );
  } else {
    // find preTag and nextTag
    const currentIndex = [].findIndex.call(
      tagList,
      (item: HTMLElement) => item.innerText === tag.meta.title
    );

    const prevTag = tagList[currentIndex - 1];
    const nextTag = tagList[currentIndex + 1];

    // the tag's offsetLeft after of nextTag
    const afterNextTagOffsetLeft = nextTag.offsetLeft + nextTag.offsetWidth + 4;

    // the tag's offsetLeft before of prevTag
    const beforePrevTagOffsetLeft = prevTag.offsetLeft - 4;

    if (afterNextTagOffsetLeft > scrollNum.value + $containerWidth) {
      scrollPane.value?.setScrollLeft(afterNextTagOffsetLeft - $containerWidth);
    } else if (beforePrevTagOffsetLeft < scrollNum.value) {
      scrollPane.value?.setScrollLeft(beforePrevTagOffsetLeft);
    }
  }
};
</script>

<style lang="less" scoped>
.tags-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;

  .el-scrollbar {
    white-space: nowrap;
    width: 100%;
    height: 34px;
  }

  .scrollbar-content {
    display: inline-block;
  }

  .scrollbar-item {
    display: inline-flex;
    align-items: center;
    height: 26px;
    margin: 4px 2px;
    padding: 0 8px;
    border: 1px solid #d8dce5;
    background: #fff;
    font-size: 12px;
    color: #495060;
    cursor: pointer;

    &:first-of-type {
      margin-left: 6px;
    }
    &:last-of-type {
      margin-right: 6px;
    }

    &.active {
      border-color: var(--el-color-primary);
      background-color: var(--el-color-primary);
      color: #fff;
    }
    &.no-affix {
      padding-right: 18px;
    }

    .el-icon {
      display: none;
    }

    &:hover {
      &.no-affix {
        padding-right: 3px;
      }
      .el-icon {
        display: inline-flex;
        margin-left: 3px;
      }
    }
  }
}
</style>
