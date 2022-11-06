import { storeToRefs } from "pinia";
import { appStore } from "@/store/modules/app";

export default function () {
  const store = appStore();

  const {
    device,
    theme,
    layout,
    topMenu,
    sidebar,
    multiTab,
    contentWidth,
    fixedHeader,
    fixSiderbar,
    fixedHeaderHidden,
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
    device,
    theme,
    layout,
    topMenu,
    sidebar,
    multiTab,
    contentWidth,
    fixedHeader,
    fixSiderbar,
    fixedHeaderHidden,
    color,
    weak,
    isMobile,
    isDesktop,
  };
}
