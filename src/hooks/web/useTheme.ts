import { storeToRefs } from "pinia";
import { appStore } from "@/store/modules/app";

export default function () {
  const store = appStore();

  const {
    sidebar,
    device,
    theme,
    layout,
    topMenu,
    multiTab,
    contentWidth,
    fixedHeader,
    fixSiderbar,
    autoHideHeader,
    color,
    weak,
  } = storeToRefs(store);

  const isMobile = () => {
    return device.value === "mobile";
  };

  const isDesktop = () => {
    return device.value === "desktop";
  };

  return {
    sidebar,
    device,
    theme,
    layout,
    topMenu,
    multiTab,
    contentWidth,
    fixedHeader,
    fixSiderbar,
    autoHideHeader,
    color,
    weak,
    isMobile,
    isDesktop,
  };
}
