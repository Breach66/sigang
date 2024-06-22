import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router"; //先引入路由
import ElementPlus from "element-plus"; //导入ElementPlus
import "element-plus/dist/index.css"; //引入ElementPlus css样式
import * as ElementPlusIconsVue from "@element-plus/icons-vue"; //elementplus 图标
import { createPinia } from "pinia"; //引入pinia
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"; //pinia持久化插件
import axios from "axios"; //引入axios
const pinia = createPinia(); //创建一个pinia实例，用于在应用中集中管理状态（store）
pinia.use(piniaPluginPersistedstate); //  将持久化存储插件添加到pinia实例上
// const userStore = useAuthStore(); //使用authStore
// const token = userStore.userinfo.token; //获取token
const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component); //使用elementplus图标
}
app.use(router); //路由挂载
app.use(pinia); //挂载pinia
app.use(ElementPlus); //使用ElementPlus
app.mount("#app");
