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
    scroll: null,
    loaded: false,
    loadPct: 0,
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
    setLoadPct(state, loadPct) {
      Vue.set(state, "loadPct", loadPct);
    },
    setLoaded(state, loaded) {
      Vue.set(state, "loaded", loaded);
    },
    setScroll(state, scroll) {
      Vue.set(state, "scroll", scroll);
    },
  },

  actions: {
    setSignatureLoaded(context, signatureLoaded) {
      context.commit("setSignatureLoaded", signatureLoaded);
    },
    setNavOpen(context, navOpen) {
      context.commit("setNavOpen", navOpen);
    },
    setLoadPct(context, loadPct) {
      context.commit("setLoadPct", loadPct);
    },
    setLoaded(context, loaded) {
      context.commit("setLoaded", loaded);
    },
    setScroll(context, scroll) {
      context.commit("setScroll", scroll);
    },
  },
});
