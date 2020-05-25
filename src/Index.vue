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
        />
      </transition>
    </keep-alive>
    <div class="transition-curtain" ref="transition" />
    <!-- <Loading v-if="!loaded" /> -->
    <Loading v-if="!loaded" class="loadingcurtain" />

    <div class="nav-wrapper">
      <transition name="nav" v-if="loaded && showMainNav" appear :key="loaded && showMainNav">
        <NavMenu :key="loaded && isHomePage" @scrollTo="scrollTo" />
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
    <NavScreen v-if="navOpen" />
    <CursorThing v-if="loaded" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import Loading from "./Loading.vue";
// import NavMenu from "./components/NavMenu.vue";
import CursorThing from "./components/CursorThing.vue";

export default {
  name: "Index",

  beforeMounted() {},
  components: {
    Loading,
    // NavMenu,
    CursorThing
    // Scrollbar
    // Index
  },
  watch: {
    loaded() {
      this.url();
    },
    $route() {
      this.isHomePage = window.location.pathname === "/";

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
      showMainNav: true
    };
  },
  methods: {
    scrollTo(e) {
      //clicking top nav items
      this.scrollToScrollPos = e;
    },
    dowinresize() {
      this.$store.commit("updateWinResize", {
        width: window.innerWidth,
        height: window.innerHeight
      });
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
      // return new Promise(res => {
      //   var url = window.location.pathname.split("/");
      //   url = url[url.length - 1];
      //   this.data = this.$work.filter(i => i.uid === url)[0];
      //   res(this.data);
      // });
    }
  },
  computed: {
    ...mapState([
      "signatureLoaded",
      "loadPct",
      "loaded",
      "navOpen",
      "winresize"
    ])
  },
  mounted() {
    window.addEventListener("resize", this.dowinresize);
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
  background: $lbg;
  z-index: 2;
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
  z-index: 3;
}
.nav-wrapper {
  // position: relative;
  height: 0;
  mix-blend-mode: difference;
}

#index {
  overflow: hidden;
  height: 100vh;
  // width: 100%;
  // background: $bg;
  // background: white;
  background: $lbg;
}
</style>
