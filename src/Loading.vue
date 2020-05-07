<template>
  <div class="loading-component">
    <!-- <h1 ref="load"></h1> -->
    <div :class="`cover top ${slideOut ? 'top-out' : null}`">
      <div class="eyebrows">
        <Eyebrow class="eyebrow" />
        <Eyebrow class="eyebrow" />
      </div>
      <div class="pct-eyes">{{`${pct[0]} ${pct[1]}`}}</div>
    </div>
    <div :class="`cover bottom ${slideOut ? 'bottom-out' : null}`">
      <SlidingText col="white" :uniquekey="0" :rotate="90" class="loading zero" text="LOADING" />
      <SlidingText col="white" :uniquekey="1" :rotate="90" class="loading one" text="LOADING" />
      <SlidingText col="white" :uniquekey="2" :rotate="90" class="loading two" text="LOADING" />
      <SmileMouth class="smile" />
    </div>
  </div>
</template>

<script>
// import WaveText from "./wavetext.js";
import SlidingText from "./components/SlidingText.vue";
import SmileMouth from "./components/SmileMouth.vue";
import Eyebrow from "./components/Eyebrow.vue";

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
        if (e === 99) {
          this.slideOut = true;
        }
      }
    }
  },
  components: {
    SlidingText,
    SmileMouth,
    Eyebrow
  },
  name: "Loading",
  props: {
    msg: String
  },
  data() {
    return {
      pct: [0, 0],
      slideOut: false
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
  position: absolute;
  height: 100%;
  background: white;
  width: 100%;

  h1 {
    font-size: 100px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    color: white;
    margin: 0;
  }
}
.cover {
  position: relative;
  height: 50%;
  width: 100%;
  background: $bg;
}
.top {
  z-index: 4;
  transform: translateY(0%);
  @include ease(transform);
}
.top-out {
  transform: translateY(-100%);
}

.bottom {
  transform: translateY(0%);
  @include ease(transform);
}
.bottom-out {
  transform: translateY(100%);
}
.loading {
  position: absolute;
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
  position: absolute;
  top: 0;
  z-index: 1;
  left: 50%;
  transform: translateX(-50%);
  width: 10em;
}
.pct-eyes {
  position: absolute;
  left: 50%;
  transform: translateX(-50%) translateY(-100%);
  color: white;
  font-family: $acumin;
  font-size: 100px;
  z-index: 6;
  top: 100%;
  display: inline-block;
}
.eyebrows {
  position: absolute;
  left: 50%;
  transform: translateX(-50%) translateY(-100%);
  color: white;
  z-index: 6;
  top: 64%;
  .eyebrow {
    display: inline-block;
    width: 4em;
    &:first-child {
      padding-right: 2em;
    }
  }
}
</style>
