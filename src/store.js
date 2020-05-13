import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    scroll: null,
    loaded: false,
    loadPct: 0,
    signatureLoaded: false,
    navOpen: false,
    scrollBarHeight: 0,
    scrollBarPos: 0,
    scrollForce: 0,
    gltfsLoaded: false,
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
    setScrollDir(state, scrollDir) {
      Vue.set(state, "scrollDir", scrollDir);
    },
    setScrollBarHeight(state, scrollBarHeight) {
      Vue.set(state, "scrollBarHeight", scrollBarHeight);
    },
    setScrollBarPos(state, scrollBarPos) {
      Vue.set(state, "scrollBarPos", scrollBarPos);
    },
    setScrollForce(state, scrollForce) {
      Vue.set(state, "scrollForce", scrollForce);
    },
    setLoadedGLTFs(state, gltfsLoaded) {
      Vue.set(state, "gltfsLoaded", gltfsLoaded);
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
    setScrollDir(context, scrollDir) {
      context.commit("setScrollDir", scrollDir);
    },
    setScrollBarHeight(context, scrollBarHeight) {
      context.commit("setScrollBarHeight", scrollBarHeight);
    },
    setScrollBarPos(context, scrollBarPos) {
      context.commit("setScrollBarPos", scrollBarPos);
    },
    setScrollForce(context, scrollForce) {
      context.commit("scrollForce", scrollForce);
    },
    setLoadedGLTFs(context, gltfsLoaded) {
      context.commit("gltfsLoaded", gltfsLoaded);
    },
  },
});
