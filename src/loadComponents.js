import Vue from "vue";
import store from "./store.js";

class LoadComponents {
  constructor() {}
  async loadTheComponents() {
    return new Promise((res) => {
      Vue.prototype.$THREE = require("../node_modules/three/build/three.module.js");
      Vue.component("Template", require("./components/Template.vue").default);
      Vue.component("Signature", require("./components/Signature.vue").default);
      Vue.component("Reb2Logo", require("./components/Reb2Logo.vue").default);
      Vue.component("NavMenu", require("./components/NavMenu.vue").default);
      Vue.component("Hamburger", require("./components/Hamburger.vue").default);
      Vue.component("NavScreen", require("./components/NavScreen.vue").default);
      Vue.component(
        "RippleImage",
        require("./components/RippleImage.vue").default
      );

      Vue.component(
        "CarouselVertical",
        require("./components/CarouselVertical.vue").default
      );

      // Vue.component("Loading", require("./components/Loading.vue").default),
      setTimeout(() => {}, 2000);
      Vue.component(
        "SlidingText",
        require("./components/SlidingText.vue").default
      );

      Vue.component(
        "CursorThing",
        require("./components/CursorThing.vue").default
      );

      Vue.component(
        "HomeOverlay",
        require("./components/HomeOverlay.vue").default
      );

      setTimeout(() => {
        store.commit(
          "setLoadPct",
          Vue.prototype.$loadPct((Vue.prototype.$loaded += 1))
        );
        res();
      }, 1000);
    });
  }
}

export const loader = new LoadComponents();

// return new Promise((res) => {
//   Vue.prototype.$THREE = require("../node_modules/three/build/three.module.js");
//   Vue.component("Template", require("./components/Template.vue").default);
//   Vue.component("Signature", require("./components/Signature.vue").default);
//   Vue.component("Reb2Logo", require("./components/Reb2Logo.vue").default);
//   Vue.component("NavMenu", require("./components/NavMenu.vue").default);
//   Vue.component("Hamburger", require("./components/Hamburger.vue").default);
//   Vue.component("NavScreen", require("./components/NavScreen.vue").default);
//   // Vue.component("Loading", require("./components/Loading.vue").default),
//   setTimeout(() => {}, 2000);
//   Vue.component(
//     "SlidingText",
//     require("./components/SlidingText.vue").default
//   );

//   Vue.component(
//     "CursorThing",
//     require("./components/CursorThing.vue").default
//   );

//   Vue.component(
//     "HomeOverlay",
//     require("./components/HomeOverlay.vue").default
//   );
//   setTimeout(() => {
//     console.log("first");
//     store.commit("setLoaded", (store.state.loaded += 1));

//     res();
//   }, 2000);
// });

// (Vue.prototype.$THREE = require("../node_modules/three/build/three.module.js")),
// Vue.component("Template", require("./components/Template.vue").default),
// Vue.component(
//   "Signature",
//   require("./components/Signature.vue").default
// ),
// Vue.component("Reb2Logo", require("./components/Reb2Logo.vue").default),
// Vue.component("NavMenu", require("./components/NavMenu.vue").default),
// Vue.component(
//   "Hamburger",
//   require("./components/Hamburger.vue").default
// ),
// Vue.component(
//   "NavScreen",
//   require("./components/NavScreen.vue").default
// ),
// // Vue.component("Loading", require("./components/Loading.vue").default),
// setTimeout(() => {}, 4000),
// Vue.component(
//   "SlidingText",
//   require("./components/SlidingText.vue").default
// ),

// Vue.component(
//   "CursorThing",
//   require("./components/CursorThing.vue").default
// ),

// Vue.component(
//   "HomeOverlay",
//   require("./components/HomeOverlay.vue").default
// ),
