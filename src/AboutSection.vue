<template>
  <div ref="about" class="about">
    <div class="bg" />

    <div class="about-outer" ref="outer">
      <div class="wrapper" ref="wrap">
        <div class="parallaximage-cont">
          <div class="parallaximage">
            <h2
              v-if="data.primary.top_text"
              class="toptitle"
            >{{$cms.textField(data.primary.top_text)}}</h2>
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
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Scrolly from "./scrolly.js";

// import WaveText from "./wavetext.js";

export default {
  name: "Template",
  watch: {},
  components: {},
  props: {
    data: {
      type: Object,
      default: null
    },
    inview: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      aboutImg: null,
      newscroll: null,
      start: {},
      dir: 1,
      startTouch: 0
    };
  },
  beforeDestroy() {},
  computed: {
    ...mapState([
      "signatureLoaded",
      "winresize",
      "loadPct",
      "loaded",
      "navOpen",
      "scroll"
    ])
  },
  methods: {
    toggleScroll(mouseOn) {
      // console.log(mouseOn);
      //ensure the scroll has already been made
      if (this.newscroll) {
        //if in view an d mouse is  over the element
        if (mouseOn && this.inview) {
          this.newscroll.listen();
          this.$emit("deafenGlobalScroll", true);

          //if themouse moves away,indicates i want to scroll away
        } else if (!mouseOn) {
          this.$refs.about.removeEventListener("touchmove", this.touchmove);
          this.newscroll.deafen();
          this.$emit("deafenGlobalScroll", false);
        }
      }
    },
    touchstart(e) {
      this.$refs.about.addEventListener("touchend", this.touchend);
      this.$refs.about.addEventListener("touchmove", this.touchmove);

      this.start = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
      };
      this.startTouch = performance.now();
    },
    touchmove(e) {
      if (performance.now() < this.startTouch + 300) {
        return;
      }
      this.toggleScroll(true);

      if (
        Math.abs(e.changedTouches[0].clientX - this.start.x) >
        window.innerWidth / 4
      ) {
        e.stopPropagation();
        if (this.scroll.pos) {
          this.$emit(
            "scrollTo",
            this.scroll.pos + (this.start.x - e.changedTouches[0].clientX)
          );
        }
        this.toggleScroll(false);
        return;
      }
    },
    touchend() {
      this.$refs.about.removeEventListener("touchmove", this.touchmove);
      this.toggleScroll(false);
    },
    initScroll() {
      if (this.winresize.userAgent.tablet) {
        //the possibility of vertical overflow on tablet / mobile. desktop - you can re-size. you can't stretch a tablet
        new Promise(res => {
          setTimeout(() => {
            if (
              this.$refs.wrap.offsetHeight + this.$refs.about.offsetTop >
              window.innerHeight
            ) {
              this.newscroll = new Scrolly(this.$refs.outer, "v");
              this.newscroll.deafen();
            }
            res();
          }, 500);
        }).then(() => {
          this.$refs.about.addEventListener("touchstart", this.touchstart);
        });
      }
    }
  },
  mounted() {
    this.$imageLoader.getObj(this.data.primary.about_image.url).then(res => {
      this.aboutImg = res;
    });

    this.initScroll();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "./styles/stylesheet.scss";
.about-outer {
  // height: calc(100% - #{$top});
  @include below($tablet) {
    height: 100%;
    position: fixed;
    width: 100vw;
    top: 0;
    margin-top: $top;
  }
}
.wrapper {
  @include below($tablet) {
    height: auto;
    position: absolute;
  }
}
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
  z-index: -1;
}
.bio {
  // right: -100%;
  @include below($tablet) {
    padding-top: 3em;
  }
  @include above($tablet) {
    right: 10%;
    position: absolute;
  }
  // @include below($tablet) {
  //   position: absolute;
  //   bottom: 0;
  //   margin-bottom: 3em;
  // }
}
.parallaximage-cont {
  // padding-top: 2em;
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
    @include title();
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
