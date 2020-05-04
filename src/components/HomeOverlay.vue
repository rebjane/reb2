<template>
  <div class="overlay-homepage">
    <transition appear name="bg">
      <div class="overlay-bg" />
    </transition>

    <p ref="wave" />

    <h1 class="designer wavetext" ref="designer">
      <a class="wave-link" />
    </h1>

    <!-- <transition appear name="leftimage" v-if="showLeft">
      <div class="left-image"></div>
    </transition>-->

    <br />

    <h1 class="wavetext" ref="illustrator">
      <a class="wave-link" />
    </h1>

    <!-- <transition appear name="rightimage" v-if="showRight">
      <div class="right-image"></div>
    </transition>-->

    <br />

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
        delay: 2000,
        link: true
      },
      {
        string: "illustrator.", //illustrator.
        el: this.$refs.illustrator,
        delay: 2250,
        link: true
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

.underline {
  position: absolute;
  left: 0;
  bottom: -2px;
  height: 2px;
  background: white;
  width: 100%;
}

.leftimage-enter,
.leftimage-leave-to,
.rightimage-enter,
.rightimage-leave-to {
  width: 0px !important;
}
.leftimage-enter-active,
.leftimage-leave-active,
.rightimage-enter-active,
.rightimage-leave-active {
  @include ease(width);
}
.leftimage-enter-to,
.rightimage-enter-to {
  width: 300px !important;
}
.left-image {
  width: 300px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: calc(100% - 300px);
  height: 300px;
  background: white;
}
.right-image {
  // width: 300px;
  // width: 0;
  width: 300px;

  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: calc(100% - 300px);
  height: 300px;
  background: white;
}

h1 {
  font-size: 60px;
  position: relative;
  margin: 0;
  margin-bottom: 20px;
  display: inline-block;
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
  @include waveLink(white);
}
.overlay-bg {
  height: 300%;
  width: 100%;
  background: #161616;
  position: absolute;
  top: -100%;
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
