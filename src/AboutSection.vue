<template>
  <div ref="about" class="about">
    <div class="parallaximage">
      <ParallaxImage :imgInfo="$aboutImg" :img="rebImg" />
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
    ...mapState(["signatureLoaded", "loadPct", "loaded", "navOpen"])
  },
  methods: {},
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "./styles/stylesheet.scss";
.about {
  height: 100vh;
  position: relative;
  background: $bg;
  // height: 100%;
}
.parallaximage {
  position: absolute;
  width: auto;
  display: inline-block;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  z-index: 3;
}
</style>
