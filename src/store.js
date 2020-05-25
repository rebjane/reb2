import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    scroll: {
      pos: 0,
      dir: 0,
      elWidth: 0,
    },
    vertscroll: {
      pos: 0,
      dir: 0,
      elWidth: 0,
    },
    loaded: false,
    loadPct: 0,
    signatureLoaded: false,
    navOpen: false,
    gltfsLoaded: false,
    scrollAllowed: false,
    winresize: null,
    wpindex: 0,
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
    updateScroll(state, scroll) {
      Vue.set(state, "scroll", scroll);
    },

    updateVertScroll(state, vertscroll) {
      Vue.set(state, "vertscroll", vertscroll);
    },

    setLoadedGLTFs(state, gltfsLoaded) {
      Vue.set(state, "gltfsLoaded", gltfsLoaded);
    },
    allowScroll(state, scrollAllowed) {
      Vue.set(state, "scrollAllowed", scrollAllowed);
    },
    updateWinResize(state, winresize) {
      Vue.set(state, "winresize", winresize);
    },
    updateWorkPageIndex(state, wpindex) {
      Vue.set(state, "wpindex", wpindex);
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

    setLoadedGLTFs(context, gltfsLoaded) {
      context.commit("setLoadedGLTFs", gltfsLoaded);
    },
    allowScroll(context, scrollAllowed) {
      context.commit("allowScroll", scrollAllowed);
    },
    setWinResize(context, winresize) {
      context.commit("setWinResize", winresize);
    },
  },
});
