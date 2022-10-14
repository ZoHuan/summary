import pinia from "@/store";
import { userStore } from "@/store/modules/user";
import { appStore } from "@/store/modules/app";
import { useCache } from "@/hooks/web/useCache";
import defaultSettings from "@/config/defaultSettings";
import {
  ACCESS_TOKEN,
  TOGGLE_SIDEBAR,
  // TOGGLE_MOBILE_TYPE,
  TOGGLE_THEME,
  TOGGLE_LAYOUT,
  TOGGLE_MULTI_TAB,
  TOGGLE_CONTENT_WIDTH,
  TOGGLE_FIXED_HEADER,
  TOGGLE_FIXED_SIDEBAR,
  TOGGLE_HIDE_HEADER,
  TOGGLE_COLOR,
  TOGGLE_WEAK,
  //   APP_LANGUAGE,
} from "@/store/mutation-types";

const user = userStore(pinia);
const app = appStore(pinia);
const { storage } = useCache();

export default function () {
  app.sidebar = storage.get(TOGGLE_SIDEBAR) || true;
  app.theme = storage.get(TOGGLE_THEME) || defaultSettings.theme;
  app.layout = storage.get(TOGGLE_LAYOUT) || defaultSettings.layout;
  app.multiTab = storage.get(TOGGLE_MULTI_TAB) || defaultSettings.multiTab;
  app.contentWidth =
    storage.get(TOGGLE_CONTENT_WIDTH) || defaultSettings.contentWidth;
  app.fixedHeader =
    storage.get(TOGGLE_FIXED_HEADER) || defaultSettings.fixedHeader;
  app.fixSiderbar =
    storage.get(TOGGLE_FIXED_SIDEBAR) || defaultSettings.fixSiderbar;
  app.autoHideHeader =
    storage.get(TOGGLE_HIDE_HEADER) || defaultSettings.autoHideHeader;
  app.color = storage.get(TOGGLE_COLOR) || defaultSettings.primaryColor;
  app.weak = storage.get(TOGGLE_WEAK) || defaultSettings.colorWeak;

  user.token = storage.get(ACCESS_TOKEN);
}
