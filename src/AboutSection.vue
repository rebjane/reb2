<template>
  <div ref="about" class="about">
    <div class="parallaximage">
      <h2 class="toptitle">Here is</h2>
      <ImageWrap
        :ripple="true"
        :isParallax="true"
        :horiz="true"
        :imgInfo="$aboutImg"
        :img="rebImg"
        :scrollObj="scroll"
        class="pimg"
      />
      <h2 class="bottomtitle">my face.</h2>
      <div class="bio">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// import WaveText from "./wavetext.js";

export default {
  name: "Template",
  watch: {},
  components: {},
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      rebImg: require("./assets/reb.jpg")
    };
  },
  beforeDestroy() {},
  computed: {
    ...mapState(["signatureLoaded", "loadPct", "loaded", "navOpen", "scroll"])
  },
  methods: {},
  mounted() {
    console.log(this.$aboutImg);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "./styles/stylesheet.scss";
.about {
  height: 100vh;
  position: relative;
  // background: $bg;
  // height: 100%;
}
.bio {
  position: absolute;
  right: -50%;
  top: 50%;
  width: 50%;
  transform: translate3d(50%, -50%, 0);
  text-align: left;
}
.parallaximage {
  height: auto;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate3d(-100%, -50%, 0);
  display: inline-block;
  h2 {
    font-family: $suisse;
    font-size: 60px;
    position: absolute;
    margin: 0;
    z-index: 2;
    width: 100%;
  }
  .toptitle {
    left: 50%;
    top: 0;
    transform: translateX(-75%) translateY(-50%);
  }
  .bottomtitle {
    left: 50%;
    bottom: 0;
    transform: translateX(-75%) translateY(50%);
  }
}
</style>
