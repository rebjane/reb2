<template>
  <div ref="bg" class="background-section">
    <div
      class="parallaximage"
      ref="parallaxouter"
      :style="`opacity: ${imgOpacity};`"
      @mouseover="textOpacity = 0.2, imgOpacity = 1"
      @mouseleave="textOpacity = 1, imgOpacity = 0.5"
    >
      <ParallaxImage :imgInfo="$aboutImg" :img="rebImg" ref="parallax" />
    </div>
    <p class="pre">But who AM I?</p>
    <div class="nav-curtains">
      <transition appear name="left" v-if="show">
        <div class="leftpane" />
      </transition>

      <transition appear name="right" v-if="show">
        <div class="rightpane" />
      </transition>
      <div class="text-container" :style="`opacity: ${textOpacity}`">
        <p class="title">Background</p>
        <p class="text">
          I’m a
          <b>coffee-addicted</b>,
          <b>popcorn-loving</b> creator with a passion for making cool things,
          <b>learning French</b>, and
          <b>singing out loud to rock music.</b>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Background",
  watch: {
    scroll() {
      this.show = this.scroll >= this.bgTop;
    }
  },
  components: {},
  props: {
    msg: String
  },
  data() {
    return {
      bgTop: null,
      show: false,
      textOpacity: 1,
      imgOpacity: 0.5,
      rebImg: require("./assets/reb.jpg")
    };
  },
  beforeDestroy() {},
  computed: {
    ...mapState(["signatureLoaded", "loadPct", "loaded", "navOpen", "scroll"])
  },
  methods: {},
  mounted() {
    this.bgTop =
      this.$refs.bg.getBoundingClientRect().top - window.innerHeight / 3;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "./styles/stylesheet.scss";
.background-section {
  height: 100vh;
  position: relative;
  // height: 100%;
}
.text-container {
  padding: 0 $pad;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 3;
  @include ease(opacity);
  pointer-events: none;
  // mix-blend-mode: difference;
}
.left-enter,
.right-enter,
.left-leave-to,
.right-leave-to {
  max-height: 0% !important;
}
.left-enter-active,
.right-enter-active,
.left-leave-active,
.right-leave-active {
  @include ease(max-height);
}
.right-enter-active,
.right-leave-active {
  transition-delay: 100ms;
}

.leftpane,
.rightpane {
  max-height: 100%;
  background: $bg;
  height: 100%;
  position: absolute;
  width: 50%;
  bottom: 0;
  z-index: 2;
}
.rightpane {
  right: 0;
}
.title {
  text-align: center;
  color: $lbg;
  margin-bottom: 4em;
}
.pre {
  position: absolute;
  top: 0;
  text-align: center;
  left: 50%;
  transform: translateX(-50%);
}
.text {
  //   color: white;
  text-align: center;
  @include outline($lbg);
  b {
    color: $lbg;
  }
  margin: 0;
  font-family: $acumin;
  font-size: 50px;
  font-weight: bold;
  font-style: italic;
}
.parallaximage {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  z-index: 3;
  @include ease(opacity);
}
</style>
