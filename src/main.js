import Vue from "vue";
import App from "./App.vue";
import { loader } from "./loadComponents.js";
import store from "./store.js";
import styles from "./styles/stylesheet.scss";
Vue.use(loader, styles);

Vue.config.productionTip = false;
loader.loadTheComponents().then((res) => {
  console.log(res);
  new Vue({
    store,
    render: (h) => h(App),
  }).$mount("#app");
});
