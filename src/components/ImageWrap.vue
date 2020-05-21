<template>
  <div ref="parallax" class="parallax">
    <div ref="imgCol" class="col col-1">
      <div v-if="ripple" ref="image">
        <RippleImage :img="img" :resize="resizeObj" />
      </div>
      <div v-else ref="image">
        <img :style="`width: ${
            resizeObj.imgWidth
          }px;`" :src="img" />
        <p v-if="imgInfo.title">{{imgInfo.title}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// import WaveText from "./wavetext.js";

export default {
  name: "Template",
  watch: {
    scroll: {
      handler() {
        this.transform();
        if (this.isParallax) {
          this.$refs.image.style = this.parallaxTransform;
        }
      }
    }
  },
  components: {},
  props: {
    ripple: {
      type: Boolean,
      default: true
    },
    imgInfo: {
      type: Object,
      default: null
    },
    speedFactor: {
      type: Number,
      default: 1
    },
    img: {
      type: String,
      default: null
    },
    isParallax: {
      type: Boolean,
      default: true
    },
    horiz: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      resizeObj: {
        canvasWidth: this.getSize(this.imgInfo.width, this.imgInfo.height)
          .width,
        canvasHeight: this.getSize(this.imgInfo.width, this.imgInfo.height)
          .height,
        scale: 1,
        imgWidth: this.getSize(this.imgInfo.width, this.imgInfo.height).width,
        imgHeight: this.getSize(this.imgInfo.width, this.imgInfo.height).height,
        canvasLeft: 0,
        canvasTop: 0,
        midPos: null
      },
      waveText: false,
      newHeight: this.getSize(this.imgInfo.width, this.imgInfo.height).height,
      parallaxTransform: 0
    };
  },
  beforeDestroy() {},
  computed: {
    ...mapState(["signatureLoaded", "loadPct", "loaded", "navOpen", "scroll"])
  },
  methods: {
    getMidPos() {
      //for  vert
      // var top = this.$refs.imgCol.getBoundingClientRect().top;
      // var height = this.$refs.imgCol.getBoundingClientRect().height;
      // this.midPos = top - (window.innerHeight - height) / 2;
      // console.log("top ", top, "height ", height, "this.midPos ", this.midPos);
      // console.log((window.innerHeight - height) / 2);
      if (this.horiz) {
        var left = this.$refs.imgCol.getBoundingClientRect().left;
        var width = this.$refs.imgCol.getBoundingClientRect().width;
        this.midPos = left - (window.innerWidth - width) / 2;
      } else {
        //for  vert
        var top = this.$refs.imgCol.getBoundingClientRect().top;
        var height = this.$refs.imgCol.getBoundingClientRect().height;
        this.midPos = top - (window.innerHeight - height) / 2;
      }
    },
    transform() {
      if (this.horiz) {
        this.parallaxTransform = `transform: translateX(${this.parallax(
          this.midPos,
          this.scroll.pos
        ) * this.speedFactor}px)`;
      } else {
        this.parallaxTransform = `transform: translateY(${this.parallax(
          this.midPos,
          this.scroll.pos
        ) * this.speedFactor}px)`;
      }
    },
    parallax(midPos, scrollPos) {
      return (midPos - scrollPos) * 0.7;
    },
    getSize(width, height) {
      // var colWidth = Math.min(window.innerWidth / 2, 400); //that hundred value's sorta random for now
      // var newHeight = (colWidth / width) * height;
      // var newWidth = colWidth;
      var newHeight, newWidth;
      if (this.imgInfo.heightResize) {
        var colHeight = Math.min(
          window.innerHeight / 2,
          this.imgInfo.heightResize
        ); //that hundred value's sorta random for now
        newWidth = (colHeight / height) * width;
        newHeight = colHeight;
      } else {
        var colWidth = Math.min(window.innerWidth / 2, 400); //that hundred value's sorta random for now
        newHeight = (colWidth / width) * height;
        newWidth = colWidth;
      }
      return {
        width: newWidth,
        height: newHeight
      };
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getMidPos();
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../styles/stylesheet.scss";
.parallax {
  // display: block;
  position: relative;
  height: 100vh;
  margin: auto;
  overflow: visible;

  // height: 100%;
  // margin: 0 $pad;
}
h3 {
  font-family: $acumin;
  font-size: 60px;
  margin: 0.25em 0;
  font-style: italic;
  position: relative;
  @include waveLink($bg);
  display: inline-block;
}
.col {
  width: 50%;
  display: inline-block;
  text-align: left;
  position: relative;
}
.horiz-line {
  width: 100%;
  border-top: 1px solid $bg;
  height: 1px;
}
.col-1 {
  float: left;
}
.image {
  height: 100%;
  color: $bg;
}
p {
  text-align: center;
}
</style>
