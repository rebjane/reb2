<template>
  <div class="nav">
    <router-link to="/">
      <Reb2Logo class="logo" />
    </router-link>
    <Hamburger class="menu" @click.native="toggleNav" />
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
import Hamburger from "./Hamburger";

export default {
  watch: {},
  components: {
    Reb2Logo,
    Hamburger
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
  position: fixed;
  z-index: 1;

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
  bottom: 0;
  right: 0;
  margin-right: 3em;
  max-height: 200px;
  margin-bottom: 2em;
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
  margin-bottom: 2em;
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
</style>
