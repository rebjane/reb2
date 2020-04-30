<template>
  <div class="loading">
    <h1 ref="load"></h1>
  </div>
</template>

<script>
import WaveText from "./wavetext.js";

import { mapState } from "vuex";

export default {
  watch: {
    loadPct: {
      handler(e) {
        new WaveText([
          {
            string: `${e}%`, //Welcome to the creative archives of Rebecca Jane.
            removePrev: true,
            el: this.$refs.load,
            delay: 0
          }
        ]);
      }
    }
  },
  name: "Loading",
  props: {
    msg: String
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(["loadPct"])
  },
  methods: {},
  mounted() {
    new WaveText([
      {
        string: `${0}%`, //Welcome to the creative archives of Rebecca Jane.
        removePrev: true,
        el: this.$refs.load,
        delay: 0
      }
    ]);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "./styles/stylesheet.scss";
.loading {
  position: fixed;
  height: 100%;
  background: $bg;
  width: 100%;

  h1 {
    font-size: 100px;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    color: white;
    margin: 0;
  }
}
</style>
