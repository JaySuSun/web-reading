import "./assets/main.css";
import 'animate.css';
import './assets/fonts/fonts.css'

import { createApp } from "vue";
import { createPinia } from "pinia";
// 引入ui 库
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import zhCn from "element-plus/es/locale/lang/zh-cn";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(ElementPlus, {
  locale: zhCn,
});
app.use(ElementPlus);
app.use(createPinia());
app.use(router);

app.mount("#app");
