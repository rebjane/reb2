


<template>
  <div id="index" ref="index">
    <div class="scroll" ref="scroll">
      <div class="home-main" v-if="signatureLoaded">
        <CursorThing />
        <HomeOverlay />
      </div>
      <Signature />
    </div>
    <transition v-if="signatureLoaded">
      <div class="fixed">
        <NavMenu />

        <transition appear v-if="time.timeString" name="time">
          <p class="time">{{ time.timeString }}</p>
        </transition>
        <transition appear name="line">
          <div class="line" />
        </transition>
        <transition appear name="bottom">
          <p class="bottom-text">Developed with love by myself.</p>
        </transition>
      </div>
    </transition>
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
import Scrolly from "./scrolly.js";
import Time from "./time.js";
export default {
  name: "Index",
  watch: {
    signatureLoaded: {
      handler(e) {
        if (e) {
          this.time = new Time();
          new Scrolly(this.$refs.index);
        }
      }
    }
  },
  beforeMounted() {},
  components: {},
  data() {
    return {
      time: 0
    };
  },
  computed: {
    ...mapState(["signatureLoaded", "navOpen"])
  },
  mounted() {}
};
</script>

<style lang="scss">
/* canvas {
  -webkit-filter: grayscale(100%);
  filter: grayscale(100%);
} */
@import "./styles/stylesheet.scss";
img {
  width: 100%;
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
  overflow: hidden;
  height: 100vh;
}
p {
  color: white;
  overflow: hidden;
}
p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow: hidden;
}
.scroll {
  position: relative;
  min-height: 100%;
}
.intro {
  overflow: hidden;
}
html {
  overflow: hidden;
  height: 100%;
}

body {
  height: 100%;
  overflow: auto;
}
.bottom-text {
  position: fixed;
  color: white;
  bottom: 0;
  margin-bottom: 3em;
  left: 50%;
  transform: translateX(-50%);
}
// * {
//   background-blend-mode: difference;
// }
.line {
  position: fixed;
  z-index: 2;
  bottom: 0;
  right: 0;
  margin-right: 3em;
  max-height: 200px;
  margin-bottom: 3em;
  height: 200px;
  border-right: 1px solid white;
}
.line-enter-active {
  @include ease(max-height);
}
.line-enter {
  max-height: 0px;
}

.time {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 2;
  opacity: 1;
  transform: translateY(0%);
  margin-left: 3em;
  margin-bottom: 3em;
}
.time-enter-active {
  @include ease(all);
}
.time-enter {
  opacity: 0;
  transform: translateY(100%);
}
.bottom-enter {
  opacity: 0;
  transform: translateX(-50%) translateY(100%);
}
.bottom-enter-active {
  @include ease(all);
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
