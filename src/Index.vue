<template>
  <div id="index" ref="app">
    <Loading v-if="!loaded" />

    <div class="scroll" ref="scroll">
      <router-view v-if="loaded" />
    </div>
    <SlidingText v-if="title && loaded" class="title" :text="title" />
    <CursorThing />
    <Scrollbar @scrollPos="handleScrollBarFunction" v-if="loaded & !navOpen" />
    <NavMenu v-if="showNav && loaded || loaded && signatureLoaded" />
    <NavScreen v-if="navOpen" />
    <div class="nav-curtains">
      <transition appear name="left" v-if="navOpen">
        <div class="leftpane" />
      </transition>
      <transition appear name="right" v-if="navOpen">
        <div class="rightpane" />
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Loading from "./Loading.vue";
import NavMenu from "./components/NavMenu.vue";
import SlidingText from "./components/SlidingText.vue";
import CursorThing from "./components/CursorThing.vue";
import Scrollbar from "./components/Scrollbar.vue";
//
// import Index from "./Index.vue";
import Scrolly from "./scrolly.js";

export default {
  name: "App",
  watch: {
    loaded() {
      this.$nextTick(() => {
        this.scroll = new Scrolly(this.$refs.app);
      });
    }
  },
  beforeMounted() {},
  components: {
    Loading,
    NavMenu,
    SlidingText,
    CursorThing,
    Scrollbar
    // Index
  },
  data() {
    return {
      time: 0,
      scroll: null,
      showNav: false,
      scrollIndex: 0,
      title:
        window.location.pathname === "/"
          ? null
          : window.location.pathname.split("/").join("")
    };
  },
  methods: {
    handleScrollBarFunction(scroll) {
      this.scroll.scrollFromScrollBar(scroll);
    }
  },
  computed: {
    ...mapState(["signatureLoaded", "loadPct", "loaded", "navOpen"])
  },
  mounted() {
    this.showNav = window.location.pathname !== "/";
  }
};
</script>

<style lang="scss" scoped>
/* canvas {
  -webkit-filter: grayscale(100%);
  filter: grayscale(100%);
} */
@import "./styles/stylesheet.scss";
#index {
  overflow: hidden;
  height: 100vh;
  width: 100%;
  background: $bg;
}
.scroll {
  position: relative;
  min-height: 100%;
}

.left-enter,
.right-enter,
.left-leave-to,
.right-leave-to {
  max-height: 0% !important;
}
.left-enter-active,
.right-enter-active,
.left-leave-active,
.right-leave-active {
  @include ease(max-height);
}
.right-enter-active,
.right-leave-active {
  transition-delay: 100ms;
}

.leftpane,
.rightpane {
  max-height: 100%;
  background: $light;
  height: 100%;
  position: fixed;
  width: 50%;
  bottom: 0;
  z-index: 2;
}
.rightpane {
  right: 0;
}
.title {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
}
</style>
