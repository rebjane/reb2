<template>
  <div id="index" ref="app">
    <keep-alive>
      <transition :key="$route.path" appear name="view" v-if="isHomePage ? loaded : data && loaded">
        <router-view
          :key="$route.path"
          class="view"
          :scrollTo="scrollToScrollPos"
          :data="data"
          :route="$route"
          :winresize="winresize"
          @mobileNavTitle="handleMobileNavTitle"
        />
      </transition>
    </keep-alive>
    <div class="transition-curtain" ref="transition" />
    <!-- <Loading v-if="!loaded" /> -->
    <div class="nav-wrapper">
      <transition appear v-if="navOpen" :key="navOpen" name="navscreen">
        <NavScreen class="navscreen" :key="navOpen" @scrollTo="scrollTo" />
      </transition>

      <transition name="nav" v-if="loaded && showMainNav" appear :key="loaded && showMainNav">
        <NavMenu :key="loaded && isHomePage" @scrollTo="scrollTo" :mblNavTitle="mblNavTitle" />
      </transition>
      <transition
        name="nav"
        v-else-if="loaded && !showMainNav"
        appear
        :key="loaded && !showMainNav"
      >
        <WorkPageNavMenu :key="loaded && !showMainNav" />
      </transition>
    </div>

    <!-- && signatureLoaded -->
    <transition appear name="cartscreen">
      <CartScreen v-if="showCart" class="cartscreen" />
    </transition>
    <div ref="cart" v-if="!navOpen" class="cart link" @click="toggleCartOverlay">
      <CartFull class="fullcart link" v-if="showFullCart" />

      <Cart class="emptycart link" v-else />
    </div>
    <transition appear name="popup">
      <Popup class="popup" :data="popup" v-if="popup" />
    </transition>
    <CursorThing class="cursor" v-if="loaded && winresize.userAgent.desktop" />
    <Loading v-if="!loaded" class="loadingcurtain" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import Loading from "./Loading.vue";
import NavMenu from "./components/NavMenu.vue";
import CursorThing from "./components/CursorThing.vue";
import WorkPageNavMenu from "./components/WorkPageNavMenu.vue";
import CartScreen from "./components/CartScreen.vue";
import Cart from "./components/Cart.vue";
import CartFull from "./components/CartFull.vue";
import Popup from "./components/Popup.vue";

export default {
  name: "Index",

  beforeMounted() {},
  components: {
    Loading,
    NavMenu,
    CursorThing,
    WorkPageNavMenu,
    CartScreen,
    Popup,
    Cart,
    CartFull
    // Scrollbar
    // Index
  },
  watch: {
    cart: {
      handler() {
        this.$refs.cart.style = `transform: translateY(0%)`;

        // console.log(this.$refs.cart);
        // this.$refs.cart.style = `transform: translateY(50%)`;
        setTimeout(() => {
          this.$refs.cart.style = `transform: translateY(50%)`;
        }, 100);
        setTimeout(() => {
          this.$refs.cart.style = `transform: translateY(0%)`;
        }, 200);
        if (this.cart.length) {
          setTimeout(() => {
            this.showFullCart = true;
          }, 150);
        } else {
          setTimeout(() => {
            this.showFullCart = false;
          }, 150);
        }
      },
      deep: true
    },
    loaded() {
      this.url();
    },

    $route() {
      this.isHomePage = window.location.pathname === "/";
      // if (this.isHomePage) {
      //   this.scrollToScrollPos = this.$store.state.lastScrollPos;
      // }
      this.$store.commit("updateRoute", {
        path: this.$route.path,
        isHome: this.$route.path === "/"
      });
      setTimeout(() => {
        this.showMainNav = this.isHomePage;
      }, 750);
      this.url();
      this.transition();
    }
  },
  data() {
    return {
      time: 0,
      scroll: null,
      data: null,
      isHomePage: false,
      transitionStyle:
        "transition: transform 750ms cubic-bezier(0.91, 0.02, 0.275, 1);",
      scrollIndex: 0,
      scrollToScrollPos: null,
      showMainNav: true,
      mblNavTitle: null,
      showFullCart: false
      // prev: 0
    };
  },
  methods: {
    toggleCartOverlay() {
      this.$store.commit("updateShowCart", !this.showCart);
    },
    handleMobileNavTitle(e) {
      this.mblNavTitle = e;
    },
    scrollTo(e) {
      //clicking top nav items
      this.scrollToScrollPos = e;
    },
    dowinresize() {
      var desktop = !this.$tablet;
      var interval = window.innerWidth - this.$store.state.winresize.width;
      this.$store.commit("updateWinResize", {
        width: window.innerWidth,
        height: window.innerHeight,
        interval: interval,
        dir: interval < 0 ? -1 : 1,
        size: {
          tablet: window.innerWidth <= 800,
          desktop: window.innerWidth > 800
        },
        userAgent: {
          tablet: this.$tablet,
          desktop: desktop
        }
        // userAgent: userAgent
      });
      this.prev = window.innerWidth;
    },
    transition() {
      this.$refs.transition.style = "height: 100%; bottom: 0";
      setTimeout(() => {
        this.$refs.transition.style = "height: 0%; top: 0";
      }, 1000);
    },
    url() {
      if (!this.isHomePage && this.$work) {
        var url = window.location.pathname.split("/");
        url = url[url.length - 1];
        this.data = this.$work.filter(i => i.uid === url)[0];
      }
    }
  },
  computed: {
    ...mapState([
      "signatureLoaded",
      "loadPct",
      "loaded",
      "navOpen",
      "winresize",
      "showCart",
      "cart",
      "popup"
    ])
  },
  mounted() {
    this.dowinresize();
    window.addEventListener("resize", this.$dowinresize);
    // window.addEventListener("mouseup", this.$dowinresize);
  }
};
</script>

<style lang="scss" >
@import "./styles/stylesheet.scss";
.transition-curtain {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  // background: $lbg;
  background: white;
  z-index: 9;
  height: 0;
  @include ease(height);
}

.view {
  transform: translateY(0%);
  min-height: 100%;
}
.view-leave-active {
  transition-delay: 750ms !important;
}
.loadingcurtain {
  position: fixed;
  z-index: 20;
}
.navscreen {
  position: fixed;
  background: black;
  // mix-blend-mode: difference;
  height: 100%;
  width: 100%;
  // top: 0;
  left: 0;
  z-index: 0;
  overflow: hidden;
  // vertical-align: bottom;
  bottom: 0;
}
.navscreen-enter,
.navscreen-leave-to {
  height: 0;
  /deep/ li {
    transform: translateY(-100%);
    opacity: 0;
  }
}

.navscreen-enter-active,
.navscreen-leave-active {
  @include ease(height);
  /deep/ li {
    @include ease(all);
  }
}
.navscreen-leave-active {
  /deep/ li {
    transform: translateY(-100%) !important;
    opacity: 0 !important;
    // color: green;
  }
}
.navscreen-enter-to {
  height: 100%;
}

#index {
  overflow: hidden;
  height: 100vh;
  // width: 100%;
  // background: $bg;
  background: white;
  // background: $lbg;
}
.cartscreen-enter,
.cartscreen-leave-to {
  max-height: 0 !important;
}
.cartscreen-enter-active,
.cartscreen-leave-active {
  @include ease(max-height);
}
.cartscreen {
  overflow: hidden;
  z-index: 3;
  max-height: 100%;
}
.cart {
  position: fixed;
  right: 0;
  padding: 0.25em 1em 1em 1em;
  mix-blend-mode: difference;
  @include above($tablet) {
    top: 0;
    // width: 5em;
    // height: 5em;
    width: 3em;
    height: 3em;
  }

  @include below($tablet) {
    bottom: 0;
    // width: 4em;
    // height: 4em;
    width: 3em;
    height: 3em;
  }
  z-index: 5;
  // background: black;
  transition: transform 100ms ease;
}
// .vert {
//   cursor: url("assets/vert-cursor.cur"), auto;
// }
.popup {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
  max-height: 100% !important;
  overflow: hidden;
  z-index: 10;
}
.popup-enter-active {
  bottom: 0 !important;
}
.popup-leave-active {
  top: 0 !important;
}
.popup-enter,
.popup-leave-to {
  max-height: 0 !important;
}
.popup-enter-active,
.popup-leave-active {
  @include ease(max-height);
}
.popup-enter-to,
.popup-leave {
  max-height: 100% !important;
}

.emptycart {
  // margin-top: 18px;
}
.cursor {
  z-index: 12;
}
</style>
