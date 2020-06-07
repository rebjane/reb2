<template>
  <div class="nav-screen">
    <ul class="main">
      <transition appear name="navlist" v-for="(item, i) in $nav" :key="i">
        <li
          v-if="navOpen"
          class="link"
          :style="`transition-delay: ${(i * 70) + 100}ms`"
          @click.prevent="handleClick(i)"
        >{{item.title}}</li>
      </transition>
    </ul>
    <ul class="socials link">
      <transition appear name="navlist" v-for="(item, i) in $navsocials" :key="i">
        <li v-if="navOpen" :style="`transition-delay: ${(i * 70) + 100}ms`">
          <a target="_blank" :href="item.link.url">{{$cms.textField(item.label)}}</a>
        </li>
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
      this.$emit("scrollTo", this.$nav[i].left);
      this.$store.commit("setNavOpen", false);
    }
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../styles/stylesheet.scss";
.main,
.socials {
  position: fixed;
  bottom: 2em;
  color: white;
  list-style: none;
  padding: 0;
}
.main {
  left: 3em;
  li {
    font-family: $acumin;
    margin: 30px 0;
    @include sub();
    opacity: 1;
    transform: translateY(0%);
    &:last-child {
      margin-bottom: 0;
    }
  }
}

.socials {
  right: 3em;
  text-align: right;
  li {
    font-family: $acuminc;
    margin: 30px 0;
    @include body();
    opacity: 1;
    transform: translateY(0%);
    &:last-child {
      margin-bottom: 0;
    }
  }
}
.navlist-enter,
.navlist-leave {
  transform: translateY(100%) !important;
  opacity: 0 !important;
}

.navlist-enter-to {
  transform: translateY(0%) !important;
  opacity: 1 !important;
}

.navlist-enter-active,
.navlist-leave-active {
  @include ease(all);
}
.navlist-leave-to {
  transform: translateY(-100%) !important;
  opacity: 0 !important;
}
</style>
