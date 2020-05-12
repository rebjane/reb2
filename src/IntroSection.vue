<template>
  <div class="intro">
    <div class="wrap">
      <Smiley :fill="'black'" class="smiley" />
      <h1 ref="welcometo" />
      <transition appear name="logo">
        <Reb2Logo :fill="'black'" class="logo" />
      </transition>
      <h1 ref="eccas" />
      <br />
      <h1 class="designer wavetext" ref="designer" />
      <p ref="scroll" />
    </div>
  </div>
</template>

<script>
import WaveText from "./wavetext.js";

export default {
  name: "HomeOverlay",
  props: {
    msg: String
  },
  data() {
    var intro;
    return {
      intro
    };
  },
  methods: {},
  mounted() {
    let opts = [
      {
        string: "Welcome to", //Welcome to the creative archives of Rebecca Jane.
        el: this.$refs.welcometo,
        delay: 0
      },
      {
        string: "ecca's", //Welcome to the creative archives of Rebecca Jane.
        el: this.$refs.eccas,
        delay: 400
      },
      {
        string: "creative archive.", //designer.
        el: this.$refs.designer,
        delay: 650,
        link: true
      },
      {
        string: "PLEASE SCROLL.", //designer.
        el: this.$refs.scroll,
        delay: 4000,
        link: true
      }
    ];
    new WaveText(opts);
    setTimeout(() => {
      this.$emit("canScroll", true);
    }, opts[opts.length - 1].delay + 1000);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "./styles/stylesheet.scss";
.smiley {
  width: 4em;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}
.underline {
  position: absolute;
  left: 0;
  bottom: -2px;
  height: 2px;
  background: white;
  width: 100%;
}
.logo {
  @include ease(all);
  opacity: 1;
  transform: translateY(0%);
  transition-delay: 400ms;
}

.logo-enter {
  opacity: 0;
  transform: translateY(50%);
}

h1 {
  font-size: 80px;
  position: relative;
  margin: 0;
  margin-bottom: 0;
  display: inline-block;
  // @include outline($bg);
  font-family: $suisse;
}
.designer {
  // margin-top: 40px;
}
span {
  opacity: 0;
}
.intro {
  height: 100vh;
  // @include waveLink(white);
  position: relative;
  @include waveLink(#161616);
}

.bg-enter-active {
  opacity: 0;
}
.wrap {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 100%;
}
.logo {
  width: 150px;
  display: inline-block;
  margin: 1em 0em 1em 2em;
  height: auto;
  mix-blend-mode: difference;
}
</style>
