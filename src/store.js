import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // mNavOpen: false,
    // scrollPos: {
    // 	dir: -1,
    // 	navBg: false
    // },
    // freeze: false,
    // resizeCb: {
    // 	width: window.innerWidth,
    // 	height: window.innerHeight,
    // 	isMobile: window.innerWidth < 800
    // }
    signatureLoaded: false,
    navOpen: false,
  },

  mutations: {
    setSignatureLoaded(state, signatureLoaded) {
      Vue.set(state, "signatureLoaded", signatureLoaded);
    },
    setNavOpen(state, navOpen) {
      Vue.set(state, "navOpen", navOpen);
    },
  },

  actions: {
    setSignatureLoaded(context, signatureLoaded) {
      context.commit("setSignatureLoaded", signatureLoaded);
    },
    setNavOpen(context, navOpen) {
      context.commit("setNavOpen", navOpen);
    },
  },
});
