<template>
  <div class="nav-screen">
    <ul>
      <transition appear name="navlist" v-for="(item, i) in $nav" :key="i">
        <li
          v-if="navOpen"
          class="link"
          :style="`transition-delay: ${(i * 70) + 100}ms`"
          @click.prevent="handleClick(i)"
        >{{item.title}}</li>
      </transition>
    </ul>
  </div>
</template>

<script>
// import WaveText from "../wavetext.js";
import { mapState } from "vuex";

export default {
  name: "NavScreen",

  props: {
    data: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      opts: null,
      lineLeaveStyle: "",
      ww: window.innerWidth
    };
  },
  computed: {
    ...mapState(["navOpen"])
  },
  methods: {
    handleClick(i) {
      this.$emit("scrollTo", i * this.ww + 1);
      this.$store.commit("setNavOpen", false);
    }
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../styles/stylesheet.scss";
ul {
  position: fixed;
  bottom: 2em;
  left: 3em;
  color: white;
  list-style: none;
  padding: 0;
  li {
    font-family: $acumin;
    margin: 1em 0;
    @include sub();
    opacity: 1;
    transform: translateY(0%);
  }
}
.navlist-enter,
.navlist-leave {
  transform: translateY(100%);
  opacity: 0;
}

.navlist-enter-to {
  transform: translateY(0%);
  opacity: 1;
}

.navlist-enter-active,
.navlist-leave-active {
  @include ease(all);
}
.navlist-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
</style>
