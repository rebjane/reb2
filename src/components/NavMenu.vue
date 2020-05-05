<template>
  <div class="nav">
    <router-link exact to="/">
      <Reb2Logo class="logo" />
    </router-link>
    <div class="side-title">
      <SlidingText :rotate="270" :speed="50" :fs="14" :text="'work'" />
    </div>
    <!-- <Hamburger class="menu" @click.native="toggleNav" /> -->
    <div class="main-menu">
      <span>
        <a>about</a>
      </span>
      <span>
        <a>work</a>
      </span>
      <span>
        <a>contact</a>
      </span>
    </div>
    <!-- <transition v-if="signatureLoaded"> -->
    <transition appear v-if="time.timeString" name="time">
      <p class="time">{{ time.timeString }}</p>
    </transition>
    <transition appear name="line">
      <div class="line" />
    </transition>
    <!-- <transition appear name="bottom">
      <p class="bottom-text">Developed with love by myself.</p>
    </transition>-->
    <!-- </transition> -->
  </div>
</template>

<script>
import { mapState } from "vuex";
import Time from "../time.js";
import Reb2Logo from "./Reb2Logo";
// import Hamburger from "./Hamburger";

export default {
  watch: {},
  components: {
    Reb2Logo
    // Hamburger
  },
  name: "NavMenu",
  props: {
    msg: String
  },
  data() {
    return {
      time: new Time()
    };
  },
  computed: {
    ...mapState(["navOpen", "signatureLoaded"])
  },
  methods: {
    toggleNav() {
      this.$store.commit("setNavOpen", true);
    }
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../styles/stylesheet.scss";
.side-title {
  position: fixed;
  width: 300px;
  top: 50%;
  left: -120px;
  height: 0px;
  transform: translateY(-100%);
}
.logo {
  width: 50px;
  margin-top: 20px;
  margin-left: 20px;
  top: 0;
  left: 0;
  position: fixed;
}
.nav {
  top: 0;
  left: 0;
  // position: fixed;
  z-index: 1;
  overflow: visible;
  height: 0%;
  width: 100%;
}
.menu {
  position: fixed;
  right: 0;
  width: 25px;
  top: 0;
  top: 40px;
  right: 40px;
}

.bottom-text {
  position: fixed;
  color: white;
  bottom: 0;
  margin-bottom: 2em;
  left: 50%;
  transform: translateX(-50%);
}
// * {
//   background-blend-mode: difference;
// }
.line {
  position: fixed;
  z-index: 2;
  top: 50%;
  transform: translateY(-50%);
  right: 0;
  margin-right: 3em;
  max-height: 200px;
  margin-bottom: 2em;
  height: 200px;
  border-right: 1px solid $bg;
}
.line-enter-active {
  @include ease(max-height);
}
.line-enter {
  max-height: 0px;
}

.time {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 2;
  opacity: 1;
  transform: translateY(0%);
  margin-right: 3em;
  margin-top: 2em;
  color: $bg;
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
p {
  color: white;
  overflow: hidden;
  font-size: 14px;
}
.main-menu {
  position: fixed;
  top: 0;
  left: 20%;
  top: 2em;
  a {
    font-family: $suisse;
    padding-right: 4em;
  }
}
</style>
