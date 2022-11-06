import { defineStore } from "pinia";
import { useCache } from "@/hooks/web/useCache";
import {
  // TOGGLE_MOBILE_TYPE,
  TOGGLE_THEME,
  TOGGLE_LAYOUT,
  TOGGLE_SIDEBAR,
  TOGGLE_MULTI_TAB,
  TOGGLE_CONTENT_WIDTH,
  TOGGLE_FIXED_HEADER,
  TOGGLE_FIXED_SIDEBAR,
  TOGGLE_HEADER_HIDDEN,
  TOGGLE_COLOR,
  TOGGLE_WEAK,
  // APP_LANGUAGE,
} from "@/store/mutation-types";

const { storage } = useCache();

export const appStore = defineStore({
  id: "app",
  state: () => ({
    device: "desktop", // 设备
    theme: "", // 主题
    layout: "", // layout布局
    topMenu: "Home", // 顶部菜单
    sidebar: true, // 侧边栏状态
    multiTab: true, // 默认多页签模式
    contentWidth: "", // 内容宽度
    fixedHeader: false, // 固定header
    fixSiderbar: false, // 固定Siderbar
    fixedHeaderHidden: false, // 自动隐藏header
    color: "", // 主题色
    weak: false, // 色盲
  }),

  actions: {
    toggleDevice(device: string) {
      this.device = device;
    },
    toggleTheme(theme: string) {
      storage.set(TOGGLE_THEME, theme);
      this.theme = theme;
    },
    toggleLayout(layout: string) {
      storage.set(TOGGLE_LAYOUT, layout);
      this.layout = layout;
    },
    toggleTopMenu(menu: string) {
      this.topMenu = menu;
    },
    toggleSidebar(flag: boolean) {
      storage.set(TOGGLE_SIDEBAR, flag);
      this.sidebar = flag;
    },
    toggleMultiTab(flag: boolean) {
      storage.set(TOGGLE_MULTI_TAB, flag);
      this.multiTab = flag;
    },
    toggleContentWidth(type: string) {
      storage.set(TOGGLE_CONTENT_WIDTH, type);
      this.contentWidth = type;
    },
    toggleFixedHeader(fixed: boolean) {
      if (!fixed) {
        this.toggleFixedHeaderHidden(false);
      }
      storage.set(TOGGLE_FIXED_HEADER, fixed);
      this.fixedHeader = fixed;
    },
    toggleFixedSiderbar(fixed: boolean) {
      storage.set(TOGGLE_FIXED_SIDEBAR, fixed);
      this.fixSiderbar = fixed;
    },
    toggleFixedHeaderHidden(hidden: boolean) {
      storage.set(TOGGLE_HEADER_HIDDEN, hidden);
      this.fixedHeaderHidden = hidden;
    },
    toggleColor(color: string) {
      storage.set(TOGGLE_COLOR, color);
      this.color = color;
    },
    toggleWeak(flag: boolean) {
      storage.set(TOGGLE_WEAK, flag);
      this.weak = flag;
    },
  },
});
