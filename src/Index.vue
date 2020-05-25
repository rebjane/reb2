<template>
  <div id="index" ref="app">
    <keep-alive>
      <transition :key="title" appear v-if="isHomePage ? loaded : data && loaded" name="up">
        <router-view class="view" :scrollTo="scrollToScrollPos" :data="data" :route="$route" />
      </transition>
    </keep-alive>
    <!-- <Loading v-if="!loaded" /> -->
    <Loading v-if="!loaded" />
    <NavMenu v-if="loaded && isHomePage " @scrollTo="scrollTo" class="nav" />
    <WorkPageNavMenu v-else-if="loaded && !isHomePage" />
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
      this.url();
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
      title:
        window.location.pathname === "/"
          ? "home"
          : window.location.pathname.split("/").join("")
    };
  },
  methods: {
    scrollTo(e) {
      //clicking top nav items
      this.scrollToScrollPos = e;
    },
    url() {
      if (!this.isHomePage) {
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
    ...mapState(["signatureLoaded", "loadPct", "loaded", "navOpen"])
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
@import "./styles/stylesheet.scss";
#index {
  overflow: hidden;
  height: 100vh;
  // width: 100%;
  // background: $bg;
  // background: white;
  background: $lbg;
}
.nav {
  position: fixed;
}
.scroll {
  position: relative;
  min-height: 100%;
}

// .left-enter,
// .right-enter,
// .left-leave-to,
// .right-leave-to {
//   max-height: 0% !important;
// }
// .left-enter-active,
// .right-enter-active,
// .left-leave-active,
// .right-leave-active {
//   @include ease(max-height);
// }
// .right-enter-active,
// .right-leave-active {
//   transition-delay: 100ms;
// }

// .leftpane,
// .rightpane {
//   max-height: 100%;
//   background: $light;
//   height: 100%;
//   position: fixed;
//   width: 50%;
//   bottom: 0;
//   z-index: 2;
// }
// .rightpane {
//   right: 0;
// }
.title {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
}
.view {
  transform: translateY(0%);
  min-height: 100%;
}
// .up-enter {
//   transform: translateY(100%);
// }
// .up-leave-to {
//   transform: translateY(-100%);
// }
// .up-enter-to {
//   transform: translateY(0%);
// }
// .up-leave-active,
// .up-enter-active {
//   @include ease(transform);
// }
</style>
