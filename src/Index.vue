<template>
  <div id="index" ref="app">
    <Loading v-if="!loaded" />

    <div class="scroll" ref="scroll">
      <router-view v-if="loaded" />
    </div>
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
//
// import Index from "./Index.vue";
import Scrolly from "./scrolly.js";

export default {
  name: "App",
  watch: {
    loaded() {
      this.$nextTick(() => {
        new Scrolly(this.$refs.app);
      });
    }
  },
  beforeMounted() {},
  components: {
    Loading,
    NavMenu
    // Index
  },
  data() {
    return {
      time: 0,
      showNav: false
    };
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
</style>
