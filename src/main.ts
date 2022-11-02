import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import pinia from "./store";
import "@/mock";
import "@/permission";
import Initializer from "@/core/render";
import ElementPlus from "element-plus";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/display.css";
import "normalize.css/normalize.css";
import "@/assets/iconfont/iconfont.css";
import "@/assets/styles/index.css";
import "@/assets/styles/global.less";

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(router).use(pinia).use(ElementPlus).use(Initializer).mount("#app");
