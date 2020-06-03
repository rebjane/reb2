<template>
  <div class="loading-component">
    <!-- <transition appear name="load"> -->
    <div class="loading" ref="inner">
      <h1 ref="load" />
    </div>
    <!-- </transition> -->
  </div>
</template>

<script>
import WaveText from "./wavetext.js";

import { mapState } from "vuex";

export default {
  watch: {
    loadPct: {
      handler(e) {
        // this.$refs.inner.innerHTML += `<h1 style="${
        //   this.style
        // }" id="${e.toString()}"></h1>`;
        this.opts.push({
          string: `${e.toString()}`,
          refName: e.toString(),
          // el: document.getElementById(e.toString()),
          el: this.$refs.load,

          delay: 0,
          logo_before: false,
          bold_start: 0,
          bold_end: 0,
          removePrev: true
        });
        new WaveText(this.opts);
      }
    }
  },
  components: {},
  name: "Loading",
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      pct: [0, 0],
      slideOut: false,
      showSlidingText: false,
      opts: [],
      style: "margin: 0; display: inline-block;"
    };
  },
  computed: {
    ...mapState(["loadPct", "gltfsLoaded"])
  },
  methods: {},
  mounted() {
    // this.$refs.inner.innerHTML += `<h1 style="${this.style}" id="0"></h1>`;
    this.opts.push({
      string: "0",
      refName: "0",
      tag: "h1",
      // el: document.getElementById("0"),
      el: this.$refs.load,
      delay: 0,
      logo_before: false,
      bold_start: 0,
      bold_end: 0,
      removePrev: true
    });
    new WaveText(this.opts);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "./styles/stylesheet.scss";
.load-enter-active {
  @include ease(all);
}
.load-enter {
  transform: translateY(100%);
  opacity: 0;
}
.loading {
  margin-top: 50vh;
  transform: translateY(-50%);
}
.loading-component {
  position: relative;
  height: 100vh;
  width: 100vw;
  font-size: 60px;
  text-align: right;
  h1 {
    // top: 50%;
    // transform: translateY(-50%);
    opacity: 1;
    right: 25%;
    margin: 0;
    margin-right: 1em;
  }
}
span {
  width: 100%;
}
</style>
