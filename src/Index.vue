<template>
  <div id="index" ref="app">
    <Loading v-if="!loaded" />
    <keep-alive>
      <!-- v-on:beforeEnter="beforeEnter"
        v-on:enter="enter"
      v-on:leave="leave"-->
      <transition :key="title" appear v-if="loaded" name="up">
        <div>
          <router-view class="view" />
        </div>
      </transition>
    </keep-alive>

    <CursorThing />
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
import CursorThing from "./components/CursorThing.vue";

export default {
  name: "Index",

  beforeMounted() {},
  components: {
    Loading,
    NavMenu,
    CursorThing
    // Scrollbar
    // Index
  },
  data() {
    return {
      time: 0,
      scroll: null,
      transitionStyle:
        "transition: transform 750ms cubic-bezier(0.91, 0.02, 0.275, 1);",
      showNav: false,
      scrollIndex: 0,
      title:
        window.location.pathname === "/"
          ? "home"
          : window.location.pathname.split("/").join("")
    };
  },
  methods: {
    // beforeEnter(el) {
    //   el.style = `transform: translateX(-100%); ${this.transitionStyle}`;
    // },
    // enter(el, done) {
    //   el.style = "transform: translateX(0%)";
    //   done();
    // },
    // leave(el, done) {
    //   el.style = `transform: translateX(100%); ${this.transitionStyle}`;
    //   setTimeout(() => done(), 750);
    // }
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
.view {
  transform: translateY(0%);
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
