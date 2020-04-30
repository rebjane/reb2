import Vue from "vue";
// import App from "./App.vue";
import Index from "./Index.vue";
import { loader } from "./loadComponents.js";
import store from "./store.js";
import router from "./router.js";

import { prismic } from "./prismic.js";

Vue.prototype.$loadPct = (prog) => (prog / 2) * 100;
Vue.prototype.$loaded = 0;

Vue.use(store);
new Vue({
  store,
  router,
  render: (h) => h(Index),
}).$mount("#app");

preLoading();

async function preLoading() {
  Promise.all([loader.loadTheComponents(), prismic.fetchData()]).then(() => {
    console.log("STOP looading anim here!");
    setTimeout(() => {
      store.commit("setLoaded", true);
    }, 500);
  });
  // return new Promise((res) => {
  //   //chaining helps to keep track of thr loading progress, but isn't ideal for load time...
  //   loader
  //     .loadTheComponents()
  //     .then(() => prismic.fetchData())
  //     .then(() => {
  //       store.commit("setLoaded", 100);
  //       res();
  //     });
  // });
}
