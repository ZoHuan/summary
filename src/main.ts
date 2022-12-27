import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import pinia from "./store";
import "@/mock";
import "@/permission";
import "@/core/render";
import "@/core/rem";
import ElementPlus from "element-plus";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import SeamlessScroll from "vue3-seamless-scroll";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/display.css";
import "normalize.css/normalize.css";
import "@/assets/font/font.css";
import "@/assets/iconfont/iconfont.css";
import "@/assets/styles/index.css";
import "@/assets/styles/global.less";

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app
  .use(router)
  .use(pinia)
  .use(ElementPlus, { locale: zhCn })
  .use(SeamlessScroll)
  .mount("#app");
