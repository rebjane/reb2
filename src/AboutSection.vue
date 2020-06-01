<template>
  <div ref="about" class="about">
    <div class="parallaximage">
      <h2 v-if="data.primary.top_text" class="toptitle">{{$cms.textField(data.primary.top_text)}}</h2>
      <ImageWrap
        v-if="aboutImg"
        :ripple="true"
        :isParallax="true"
        :horiz="true"
        :imgInfo="aboutImg"
        :img="aboutImg.src"
        :scrollObj="scroll"
        class="pimg"
      />
      <h2
        v-if="data.primary.bottom_text.length"
        class="bottomtitle"
      >{{$cms.textField(data.primary.bottom_text)}}</h2>
    </div>
    <HeadText
      class="bio"
      :color="'white'"
      :title="$cms.textField(data.primary.about_title)"
      :body="$cms.textField(data.primary.about_body)"
    />
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
      aboutImg: null
    };
  },
  beforeDestroy() {},
  computed: {
    ...mapState(["signatureLoaded", "loadPct", "loaded", "navOpen", "scroll"])
  },
  methods: {},
  mounted() {
    this.$imageLoader.getObj(this.data.primary.about_image.url).then(res => {
      this.aboutImg = res;
    });
  }
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
.bio {
  // right: -100%;
  @include above($tablet) {
    left: 50%;
  }
}
.parallaximage {
  @include above($tablet) {
    height: auto;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate3d(-100%, -50%, 0);
    display: inline-block;
  }
  mix-blend-mode: difference;

  .toptitle,
  .bottomtitle {
    font-family: $suisse;
    font-size: 60px;
    color: white;
    width: 100%;
    @include above($tablet) {
      position: absolute;
      margin: 0;
      z-index: 2;
    }
  }
  .toptitle {
    left: 50%;
    top: 0;
    transform: translateX(-75%) translateY(-50%);
  }
  .bottomtitle {
    @include above($tablet) {
      left: 50%;
      bottom: 0;
      transform: translateX(-75%) translateY(50%);
    }
  }
}
</style>
