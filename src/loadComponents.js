import Vue from "vue";

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
      console.log("loading components");
      res("loaded components!");
    });
  }
}

export const loader = new LoadComponents();
