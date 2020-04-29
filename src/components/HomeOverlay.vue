<template>
  <div class="overlay-homepage">
    <transition appear name="bg">
      <div class="overlay-bg" />
    </transition>
    <p ref="wave" />
    <h1 class="designer" ref="designer" />
    <h1 ref="illustrator" />
    <h1 ref="popcorn" />
  </div>
</template>

<script>
import WaveText from "../wavetext.js";

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
        string: "Welcome to the creative archives of Rebecca Jane.", //Welcome to the creative archives of Rebecca Jane.
        el: this.$refs.wave,
        delay: 1000
      },
      {
        string: "designer.", //designer.
        el: this.$refs.designer,
        delay: 2000
      },
      {
        string: "illustrator.", //illustrator.
        el: this.$refs.illustrator,
        delay: 2250
      },
      {
        string: "popcorn lover.", //popcorn lover.
        el: this.$refs.popcorn,
        delay: 2500
      }
    ];
    new WaveText(opts);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../styles/stylesheet.scss";

h1 {
  font-size: 60px;
  margin: 20px;
}
.designer {
  margin-top: 40px;
}
span {
  opacity: 0;
}
.overlay-homepage {
  position: absolute;
  top: 50%;
  width: 100%;
  transform: translateY(-50%);
}
.overlay-bg {
  height: 208%;
  width: 100%;
  background: #161616;
  position: absolute;
  top: -54%;
  left: 0;
  transform: translateY(0%);
  z-index: -1;
  opacity: 0.8;
  @include ease(opacity);
}
.bg-enter-active {
  opacity: 0;
}
</style>
