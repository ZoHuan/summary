/**
 * 项目默认配置项
 * theme - sidebar theme ['dark', 'light'] 两种主题
 * layout - 整体布局方式 ['sidemenu', 'topmenu', 'bothmenu'] 两种布局
 * sidebar - 侧边栏状态
 * multiTab - 多页签模式
 * contentWidth - 内容区布局： 流式 |  固定
 * fixedHeader - 固定 Header : boolean
 * fixSiderbar - 固定左侧菜单栏 ： boolean
 * fixedHeaderHidden - 向下滚动时，隐藏 Header : boolean
 * color - 默认主题色, 如果修改颜色不生效，请清理 localStorage
 * weak - 色盲模式
 *
 */

export default {
  theme: "dark", // theme for nav menu
  layout: "sidemenu", // nav menu position: `sidemenu` or `topmenu`
  sidebar: true,
  multiTab: true,
  contentWidth: "Fluid", // layout of content: Fluid or Fixed, only works when layout is topmenu
  fixedHeader: false, // sticky header
  fixSiderbar: false, // sticky siderbar
  fixedHeaderHidden: false, //  auto hide header
  color: "#1890ff", // '#F5222D', // primary color of ant design
  weak: false,

  title: "SUMMARY",
  pwa: false,
  iconfontUrl: "",
  production:
    process.env.NODE_ENV === "production" &&
    process.env.VUE_APP_PREVIEW !== "true",
};
