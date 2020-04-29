import Vue from "vue";
import App from "./App.vue";
import { loader } from "./loadComponents.js";
import store from "./store.js";
import { prismic } from "./prismic.js";

Vue.use(loader);
preLoading();
async function preLoading() {
  Promise.all([loader.loadTheComponents(), prismic.fetchData()]).then((res) => {
    console.log(res, "is all loaded!");
    new Vue({
      store,
      render: (h) => h(App),
    }).$mount("#app");
  });
}
