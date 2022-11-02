import type { RouteLocationNormalizedLoaded } from "vue-router";
import { defineStore } from "pinia";

export interface TagsState {
  visitedViews: Array<RouteLocationNormalizedLoaded>;
  cachedViews: Array<string>;
}

export const tagsStore = defineStore({
  id: "tags",
  state: (): TagsState => ({
    visitedViews: [],
    cachedViews: [],
  }),
  getters: {
    getVisitedViews(): Array<RouteLocationNormalizedLoaded> {
      return this.visitedViews;
    },
    getCachedViews(): Array<string> {
      return this.cachedViews;
    },
  },
  actions: {
    // 新增缓存和tag
    addView(view: RouteLocationNormalizedLoaded) {
      this.addVisitedView(view);
      this.addCachedView(view);
    },
    // 新增tag
    addVisitedView(view: RouteLocationNormalizedLoaded) {
      if (this.visitedViews.some((v) => v.path === view.path)) return;
      this.visitedViews.push(
        Object.assign({}, view, {
          title: view.meta.title || "no-name",
        })
      );
    },
    // 新增缓存
    addCachedView(view: RouteLocationNormalizedLoaded) {
      if (this.cachedViews.includes(view.name as string)) return;
      if (!view.meta.noCache) {
        this.cachedViews.push(view.name as string);
      }
    },
    // 删除某个
    delView(view: RouteLocationNormalizedLoaded) {
      this.delVisitedView(view);
      this.delCachedView(view);
    },
    // 删除tag
    delVisitedView(view: RouteLocationNormalizedLoaded) {
      for (const [i, v] of this.visitedViews.entries()) {
        if (v.path === view.path) {
          this.visitedViews.splice(i, 1);
          break;
        }
      }
    },
    // 删除缓存
    delCachedView(view: RouteLocationNormalizedLoaded) {
      const index = this.cachedViews.indexOf(view.name as string);
      index > -1 && this.cachedViews.splice(index, 1);
    },
    // 删除其他
    delOthersViews(view: RouteLocationNormalizedLoaded) {
      this.delOthersVisitedViews(view);
      this.delOthersCachedViews(view);
    },
    // 删除其他tag
    delOthersVisitedViews(view: RouteLocationNormalizedLoaded) {
      this.visitedViews = this.visitedViews.filter((v) => {
        return v.meta.affix || v.path === view.path;
      });
    },
    // 删除其他缓存
    delOthersCachedViews(view: RouteLocationNormalizedLoaded) {
      const index = this.cachedViews.indexOf(view.name as string);
      if (index > -1) {
        this.cachedViews = this.cachedViews.slice(index, index + 1);
      } else {
        // if index = -1, there is no cached tags
        this.cachedViews = [];
      }
    },
    // 删除所有缓存和tag
    delAllViews() {
      this.delAllVisitedViews();
      this.delAllCachedViews();
    },
    // 删除所有tag
    delAllVisitedViews() {
      const affixTags = this.visitedViews.filter((tag) => tag.meta.affix);
      this.visitedViews = affixTags;
    },
    // 删除所有缓存
    delAllCachedViews() {
      this.cachedViews = [];
    },
    // 删除左侧
    delLeftViews(view: RouteLocationNormalizedLoaded) {
      const index = this.visitedViews.findIndex((v) => v.path === view.path);
      if (index > -1) {
        this.visitedViews = this.visitedViews.filter((v, i) => {
          return v.meta.affix || v.path === view.path || i > index;
        });
        this.cachedViews = this.cachedViews.slice(index);
      }
    },
    // 删除右侧
    delRightViews(view: RouteLocationNormalizedLoaded) {
      const index = this.visitedViews.findIndex((v) => v.path === view.path);
      if (index > -1) {
        this.visitedViews = this.visitedViews.filter((v, i) => {
          return v.meta.affix || v.path === view.path || i < index;
        });
        this.cachedViews = this.cachedViews.slice(0, index + 1);
      }
    },
    // 更新tag
    updateVisitedView(view: RouteLocationNormalizedLoaded) {
      for (let v of this.visitedViews) {
        if (v.path === view.path) {
          v = Object.assign(v, view);
          break;
        }
      }
    },
  },
});
