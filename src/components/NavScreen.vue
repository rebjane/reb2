<template>
  <div class="nav-screen">
    <ul>
      <li
        class="link"
        v-for="(item, i) in $nav"
        :key="i"
        @click.prevent="handleClick(i)"
      >{{item.title}}</li>
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
  }
}
</style>
