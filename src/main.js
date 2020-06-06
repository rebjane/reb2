import Vue from "vue";
// import App from "./App.vue";
import Index from "./Index.vue";
import { loader } from "./loadComponents.js";
import store from "./store.js";
import router from "./router.js";
import { imageLoader } from "./imageLoader.js";
import { smtp } from "./smtp.js";
Vue.prototype.$imageLoader = imageLoader;
Vue.prototype.$smtp = smtp;
// console.log(smtp);
// import { threeLoader } from "./threeLoader.js";
// import signature from "./assets/reb2.o-animated-BAKED.gltf";
import { prismic } from "./prismic.js";
Vue.prototype.$loadPct = (prog) => (prog / 2) * 100;
Vue.prototype.$loaded = 0;

Vue.prototype.$dowinresize = async () => {
  return new Promise((res) => {
    Vue.prototype.$agent = (() => {
      return navigator;
    })();
    // console.log(Vue.prototype.$agent);

    Vue.prototype.$tablet = (() => {
      function Android() {
        return navigator.userAgent.match(/Android/i);
      }
      function BlackBerry() {
        return navigator.userAgent.match(/BlackBerry/i);
      }
      function iOS() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
      }

      function Opera() {
        return navigator.userAgent.match(/Opera Mini/i);
      }
      function Windows() {
        return (
          navigator.userAgent.match(/IEMobile/i) ||
          navigator.userAgent.match(/WPDesktop/i)
        );
      }
      // return Android() || BlackBerry() || iOS() || Opera() || Windows();
      if (Android() || BlackBerry() || iOS() || Opera() || Windows()) {
        return true;
      } else {
        return false;
      }
    })();

    var desktop = !Vue.prototype.$tablet;
    var interval = window.innerWidth - store.state.winresize.width;
    store.commit("updateWinResize", {
      width: window.innerWidth,
      height: window.innerHeight,
      interval: interval,
      dir: interval < 0 ? -1 : 1,
      size: {
        tablet: window.innerWidth <= 800,
        desktop: window.innerWidth > 800,
      },
      userAgent: {
        tablet: Vue.prototype.$tablet,
        desktop: desktop,
      },
      // userAgent: userAgent
    });
    // console.log(Vue.prototype.$tablet);
    res(Vue.prototype.$tablet);
  });
};

Vue.use(store);
new Vue({
  store,
  router,
  render: (h) => h(Index),
}).$mount("#app");

preLoading();
async function loadingPct() {
  return new Promise((res) => {
    var loading = setInterval(async () => {
      if (store.state.loadPct === 100) {
        clearInterval(loading);
        store.commit("setLoadPct", "");

        res();
      } else {
        store.commit("setLoadPct", store.state.loadPct + 50);
      }
    }, 500);
  });
}

// async function threeLoad() {
//   return new Promise((resolve) => {
//     if (Vue.prototype.$tablet) {
//       resolve();
//       return;
//     }
//     threeLoader.loadGLTF(signature).then((res) => resolve(res));
//   });
// }

async function preLoading() {
  Vue.prototype.$dowinresize().then(() => {
    // threeLoad().then(() => { //for now, the loading is ridiculous
    store.commit("setLoadedGLTFs", true);
    Promise.all([
      loadingPct(),
      loader.loadTheComponents(),
      prismic.fetchData(),
    ]).then(() => {
      setTimeout(() => {
        store.commit("setLoaded", true);
      }, 800); //to allow for loading to transition out
    });
    // });
  });
}
