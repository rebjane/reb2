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
    wpindex: 0,
    route: null,
    winresize: {
      width: window.innerWidth,
      height: window.innerHeight,
      interval: 0,
    },
    lastScrollPos: 0,
    cart: [],
    cartTotal: 0,
    showCart: false,
    popup: null,
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
    deafenScroll(state, deafened) {
      Vue.set(state, "deafened", deafened);
    },
    updateWinResize(state, winresize) {
      Vue.set(state, "winresize", winresize);
    },
    updateWorkPageIndex(state, wpindex) {
      Vue.set(state, "wpindex", wpindex);
    },
    updateRoute(state, route) {
      Vue.set(state, "route", route);
    },
    updateLastScrollPos(state, lastScrollPos) {
      Vue.set(state, "lastScrollPos", lastScrollPos);
    },
    updateCart(state, item) {
      if (this.state.cart.map((x) => x.item).indexOf(item.item) < 0) {
        this.state.cart.push(item);
      } else {
        //if product is already in cart, no duplicates
        this.state.cart.find((x) => x.item === item.item).qty += item.qty;
        this.state.cart.find((x) => x.item === item.item).total +=
          item.qty * item.price;
      }
      // console.log(this.state.cart.find((x) => x.item === item.item));
      Vue.set(state, "cart", this.state.cart);
      this.state.cartTotal = this.state.cart
        .map((x) => x.total)
        .reduce((a, b) => a + b);
      // this.mutations.updateCartTotal(this.state.cartTotal);
      Vue.set(state, "cartTotal", this.state.cartTotal.toFixed(2));

      // console.log("this.state.showCart", this.state.showCart);
    },
    emptyCart() {
      this.state.cart = [];
    },
    popupInfo(state, popup) {
      Vue.set(state, "popup", popup);
    },
    removeCart(state, item) {
      this.state.cartTotal -= item.total;
      Vue.set(state, "cartTotal", this.state.cartTotal.toFixed(2));

      this.state.cart = this.state.cart.filter((x) => x.item !== item.item);
      Vue.set(state, "cart", this.state.cart);
      // console.log(this.state.cart);
    },
    updateShowCart(state, showCart) {
      Vue.set(state, "showCart", showCart);
    },

    updateCartQuantity(state, updatedItem) {
      this.state.cart.map((x) =>
        x.item === updatedItem.item ? updatedItem : x.item
      );
      this.state.cartTotal = this.state.cart
        .map((x) => x.total)
        .reduce((a, b) => a + b);
      Vue.set(state, "cartTotal", this.state.cartTotal.toFixed(2));
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
    deafenScroll(context, deafened) {
      context.commit("deafenScroll", deafened);
    },
    setWinResize(context, winresize) {
      context.commit("setWinResize", winresize);
    },
  },
});
