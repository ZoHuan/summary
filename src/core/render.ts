import pinia from "@/store";
import { appStore } from "@/store/modules/app";
import { useCache } from "@/hooks/web/useCache";
import { updateTheme } from "@/config/setting.config";
import defaultSettings from "@/config/defaultSettings";
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
  //   APP_LANGUAGE,
} from "@/store/mutation-types";

const app = appStore(pinia);
const { storage } = useCache();

export default function () {
  const isMobil = navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  );
  app.device = isMobil ? "mobile" : "desktop";
  app.theme = storage.get(TOGGLE_THEME) || defaultSettings.theme;
  app.layout = storage.get(TOGGLE_LAYOUT) || defaultSettings.layout;
  app.sidebar = storage.get(TOGGLE_SIDEBAR) || defaultSettings.sidebar;
  app.multiTab = storage.get(TOGGLE_MULTI_TAB) || defaultSettings.multiTab;
  app.contentWidth =
    storage.get(TOGGLE_CONTENT_WIDTH) || defaultSettings.contentWidth;
  app.fixedHeader =
    storage.get(TOGGLE_FIXED_HEADER) || defaultSettings.fixedHeader;
  app.fixSiderbar =
    storage.get(TOGGLE_FIXED_SIDEBAR) || defaultSettings.fixSiderbar;
  app.fixedHeaderHidden =
    storage.get(TOGGLE_HEADER_HIDDEN) || defaultSettings.fixedHeaderHidden;
  app.color = storage.get(TOGGLE_COLOR) || defaultSettings.color;
  app.weak = storage.get(TOGGLE_WEAK) || defaultSettings.weak;

  updateTheme(app.color);
}
