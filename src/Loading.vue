<template>
  <div class="loading-component">
    <!-- <h1 ref="load"></h1> -->
    <span class="pct-eyes">{{`${pct[0]} ${pct[1]}`}}</span>
    <div class="cover top" />
    <div class="cover bottom" />
    <SlidingText col="white" :uniquekey="0" :rotate="90" class="loading zero" text="LOADING" />
    <SlidingText col="white" :uniquekey="1" :rotate="90" class="loading one" text="LOADING" />
    <SlidingText col="white" :uniquekey="2" :rotate="90" class="loading two" text="LOADING" />
    <SmileMouth class="smile" />
  </div>
</template>

<script>
// import WaveText from "./wavetext.js";
import SlidingText from "./components/SlidingText.vue";
import SmileMouth from "./components/SmileMouth.vue";

import { mapState } from "vuex";

export default {
  watch: {
    loadPct: {
      handler(e) {
        if (e.toString().split("").length === 1) {
          this.pct[0] = "0";
          this.pct[1] = e.toString();
        } else {
          this.pct = e.toString().split("");
        }
      }
    }
  },
  components: {
    SlidingText,
    SmileMouth
  },
  name: "Loading",
  props: {
    msg: String
  },
  data() {
    return {
      pct: [0, 0]
    };
  },
  computed: {
    ...mapState(["loadPct"])
  },
  methods: {},
  mounted() {
    // new WaveText([
    //   {
    //     string: `${0}%`, //Welcome to the creative archives of Rebecca Jane.
    //     removePrev: true,
    //     el: this.$refs.load,
    //     delay: 0
    //   }
    // ]);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "./styles/stylesheet.scss";
.loading-component {
  position: fixed;
  height: 100%;
  background: white;
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
.cover {
  position: fixed;
  height: 50%;
  width: 100%;
  background: $bg;
}
.top {
  z-index: 4;
}
.bottom {
  top: 50%;
}
.loading {
  position: fixed;
  z-index: 2;
  width: 100%;
  bottom: 0;
  mix-blend-mode: difference;
}
.one {
  padding: 0;
}
.zero {
  padding-top: 5em;
  padding-bottom: 0;
}
.two {
  padding-top: 0;
  padding-bottom: 5em;
}
.smile {
  position: fixed;
  top: 50%;
  z-index: 1;
  left: 50%;
  transform: translateX(-50%);
  width: 10em;
}
.pct-eyes {
  position: fixed;
  left: 50%;
  transform: translateX(-50%) translateY(-100%);
  color: white;
  font-family: $acumin;
  font-size: 100px;
  z-index: 6;
  top: 50%;
}
</style>
