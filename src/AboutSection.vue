<template>
  <div ref="about" class="about">
    <div class="bg" />
    <div class="parallaximage-cont">
      <div class="parallaximage">
        <h2 v-if="data.primary.top_text" class="toptitle">{{$cms.textField(data.primary.top_text)}}</h2>
        <ImageWrap
          v-if="aboutImg"
          :ripple="false"
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
  // height: 100%;
}
.bg {
  position: absolute;
  width: 100%;
  height: calc(100% + #{$top});
  left: 0;
  top: -$top;
  background: $bg;
  z-index: 0;
}
.bio {
  // right: -100%;
  @include above($tablet) {
    right: 10%;
    position: absolute;
  }
  @include below($tablet) {
    position: absolute;
    bottom: 0;
    margin-bottom: 3em;
  }
}
.parallaximage-cont {
  padding-top: 2em;
}
.parallaximage {
  position: relative;
  @include above($tablet) {
    height: auto;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate3d(-75%, -50%, 0);
    display: inline-block;
  }
  // @include below($tablet) {
  //   transform: translateY(-15vh);
  // }
  mix-blend-mode: difference;

  .toptitle,
  .bottomtitle {
    font-family: $suisse;
    font-size: 60px;
    color: white;
    width: 100%;
    position: absolute;
    margin: 0;
    z-index: 2;
  }
  .toptitle {
    @include above($tablet) {
      left: 50%;
      top: 0;
      transform: translate3d(-75%, -50%, 0);
    }
    @include below($tablet) {
      top: 0;
      transform: translateY(-50%);
    }
  }
  .bottomtitle {
    @include above($tablet) {
      left: 50%;
      bottom: 0;
      transform: translate3d(-75%, 50%, 0);
    }
    @include below($tablet) {
      bottom: 0;
      transform: translateY(50%);
    }
  }
}
</style>
