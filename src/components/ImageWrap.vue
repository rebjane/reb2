<template>
  <div ref="parallax" class="parallax">
    <div
      ref="imgCol"
      class="col"
      :style="`width: ${
            resizeObj.imgWidth
          }px;`"
    >
      <div v-if="ripple" ref="image">
        <RippleImage
          :style="`height: ${
            resizeObj.imgHeight
          }px;`"
          :img="img"
          :resize="resizeObj"
        />
      </div>
      <div class="image" ref="image" v-else>
        <img :style="`width: ${
            resizeObj.imgWidth
          }px;`" :src="img" />
        <!-- <p v-if="imgInfo.title">{{imgInfo.title}}</p> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// import WaveText from "./wavetext.js";

export default {
  name: "ImageWrap",
  watch: {
    winresize() {
      if (this.isParallax) {
        // this.getMidPos();
        this.isDesktop = this.winresize.size.desktop;
        this.left += this.winresize.interval;
        this.width = this.$refs.imgCol.getBoundingClientRect().width;
        this.pos += this.winresize.interval;
        this.midPos = this.left - (window.innerWidth - this.width) / 2;

        this.transform();
        this.$refs.image.style = this.parallaxTransform;
      }
    },
    isDesktop(e) {
      if (!e) {
        this.left += (window.innerWidth * this.winresize.dir) / 2;
        return;
      }
      this.left -= (window.innerWidth * this.winresize.dir) / 2;
    },
    // inview: {
    //   handler() {

    //   },
    //   deep: true
    // }
    scrollObj: {
      handler() {
        this.pos = this.scrollObj.pos;
        this.transform();
        if (this.isParallax) {
          // console.log(
          //   this.parallax(this.midPos, this.pos),
          //   this.pos,
          //   this.midPos
          // );

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
      default: false
    },
    horiz: {
      type: Boolean,
      default: false
    },
    scrollObj: {
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
      resizeObj: {
        canvasWidth: this.getSize(this.imgInfo.width, this.imgInfo.height)
          .width,
        canvasHeight: this.getSize(this.imgInfo.width, this.imgInfo.height)
          .height,
        scale: 1,
        imgWidth: this.getSize(this.imgInfo.width, this.imgInfo.height).width,
        imgHeight: this.getSize(this.imgInfo.width, this.imgInfo.height).height,
        canvasLeft: 0,
        canvasTop: 0
      },
      midPos: null,

      waveText: false,
      newHeight: this.getSize(this.imgInfo.width, this.imgInfo.height).height,
      parallaxTransform: 0,
      offset: 0,
      width: 0,
      left: 0,
      isDesktop: null,
      startedWinResize: false,
      pos: 0
    };
  },
  beforeDestroy() {},
  computed: {
    ...mapState(["navOpen", "winresize", "scroll"])
  },
  methods: {
    getMidPos() {
      if (this.horiz) {
        // for horiz
        this.left = this.$refs.imgCol.getBoundingClientRect().left;
        this.width = this.$refs.imgCol.getBoundingClientRect().width;
        this.midPos = this.left - (window.innerWidth - this.width) / 2;
      } else {
        // for  vert
        var top = this.$refs.imgCol.getBoundingClientRect().top;
        var height = this.$refs.imgCol.getBoundingClientRect().height;
        this.midPos = top - (window.innerHeight - height) / 2;
      }
    },
    transform() {
      if (this.horiz) {
        this.parallaxTransform = `transform: translateX(${this.parallax(
          this.midPos,
          this.pos
        )}px)`;
      } else {
        this.parallaxTransform = `transform: translateY(${this.parallax(
          this.midPos,
          this.pos
        )}px)`;
      }
      // console.log(this.parallax(this.midPos, this.scrollObj.pos));
    },
    parallax(midPos, scrollPos) {
      return Math.max(
        Math.min((midPos - scrollPos) * 0.3, this.width / 2),
        -this.width / 2
      );
    },
    getSize(width, height) {
      var newHeight, newWidth, colHeight, colWidth;
      if (this.imgInfo.heightResize) {
        colHeight = Math.min(window.innerHeight / 2, this.imgInfo.heightResize); //that hundred value's sorta random for now
        newWidth = (colHeight / height) * width;
        newHeight = colHeight;
      } else {
        colWidth = Math.min(
          window.innerWidth / 2,
          this.imgInfo.widthResize || 400 //random value
        ); //that hundred value's sorta random for now
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
    // this.$nextTick(() => {
    //   this.getMidPos();
    // });
    if (this.isParallax) {
      this.isDesktop = this.winresize.size.desktop;

      setTimeout(() => {
        this.getMidPos();
      }, 500); //temporary fix
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../styles/stylesheet.scss";
* {
  pointer-events: none;
}
.parallax {
  // display: block;
  position: relative;
  // height: 100vh;
  // width: 100%;
  width: auto;
  display: inline-block;
  margin: auto;
  overflow: visible;

  // height: 100%;
  // margin: 0 $pad;
}

.col {
  width: max-content;
  display: inline-block;
  text-align: left;
  position: relative;
}
.horiz-line {
  width: 100%;
  border-top: 1px solid $bg;
  height: 1px;
}

.image {
  height: 100%;
  color: $bg;
}
p {
  text-align: left;
}
</style>
