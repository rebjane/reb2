import Vue from "vue";
// import App from "./App.vue";
import Index from "./Index.vue";
import { loader } from "./loadComponents.js";
import store from "./store.js";
import router from "./router.js";
import { imageLoader } from "./imageLoader.js";
import { threeLoader } from "./threeLoader.js";
import signature from "./assets/reb2.o-animated-BAKED.gltf";

import { prismic } from "./prismic.js";
Vue.prototype.$loadPct = (prog) => (prog / 2) * 100;
Vue.prototype.$loaded = 0;

Vue.use(store);
new Vue({
  store,
  router,
  render: (h) => h(Index),
}).$mount("#app");

async function LoadAllImages() {
  //load all these images here!

  return new Promise((res) => {
    Promise.all([imageLoader.getObj(require("./assets/reb.jpg"))]).then(
      (resolved) => {
        Vue.prototype.$aboutImg = resolved[0];
        // console.log(resolved[0]);
        res(resolved);
      }
    );
  });
}

preLoading();
async function loadingPct() {
  return new Promise((res) => {
    var loading = setInterval(async () => {
      if (store.state.loadPct === 99) {
        clearInterval(loading);
        res();
      } else {
        store.commit("setLoadPct", store.state.loadPct + 1);
      }
    }, 20);
  });
}

async function preLoading() {
  await threeLoader.loadGLTF(signature).then(() => {
    store.commit("setLoadedGLTFs", true);
    Promise.all([
      loadingPct(),
      loader.loadTheComponents(),
      prismic.fetchData(),
      LoadAllImages(),
    ]).then((res) => {
      console.log("res", res);
      setTimeout(() => {
        store.commit("setLoaded", true);
      }, 800); //to allow for loading to transition out
    });
  });
}
