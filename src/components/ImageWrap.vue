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
    winresize: {
      handler(e) {
        // this.getMidPos();
        //when resizing, need to offset for horizontal parallax so it doesn't fall off the view
        this.resizeObj = {
          canvasWidth: this.getSize(this.imgInfo.width, this.imgInfo.height)
            .width,
          canvasHeight: this.getSize(this.imgInfo.width, this.imgInfo.height)
            .height,
          scale: 1,
          imgWidth: this.getSize(this.imgInfo.width, this.imgInfo.height).width,
          imgHeight: this.getSize(this.imgInfo.width, this.imgInfo.height)
            .height,
          canvasLeft: 0,
          canvasTop: 0,
          midPos: null
        };
        //parallax re-positioning based on win resize
        if (this.isParallax) {
          this.offset += e.interval * 2;
          this.transform();
          this.$refs.image.style = this.parallaxTransform;
        }
      }
    },
    scrollObj: {
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
      default: false
    },
    horiz: {
      type: Boolean,
      default: false
    },
    scrollObj: {
      type: Object,
      default: null
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
      parallaxTransform: 0,
      offset: 0,
      width: 0
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
        var left = this.$refs.imgCol.getBoundingClientRect().left;
        this.width = this.$refs.imgCol.getBoundingClientRect().width;
        this.midPos = left - (window.innerWidth - this.width) / 2;
      } else {
        // for  vert
        var top = this.$refs.imgCol.getBoundingClientRect().top;
        var height = this.$refs.imgCol.getBoundingClientRect().height;
        this.midPos = top - (window.innerHeight - height) / 2;

        // console.log(top, height);
      }
    },
    transform() {
      if (this.horiz) {
        this.parallaxTransform = `transform: translateX(${this.parallax(
          this.midPos,
          this.scrollObj ? this.scrollObj.pos - this.offset : 1
        )}px)`;
      } else {
        this.parallaxTransform = `transform: translateY(${this.parallax(
          this.midPos,
          this.scrollObj ? this.scrollObj.pos - this.offset : 1
        )}px)`;
      }
    },
    parallax(midPos, scrollPos) {
      return (midPos - scrollPos) * 0.7;
    },
    getSize(width, height) {
      var newHeight, newWidth;
      if (this.imgInfo.heightResize) {
        var colHeight = Math.min(
          window.innerHeight / 2,
          this.imgInfo.heightResize
        ); //that hundred value's sorta random for now
        newWidth = (colHeight / height) * width;
        newHeight = colHeight;
      } else {
        var colWidth = Math.min(
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
    setTimeout(() => {
      this.getMidPos();
    }, 500); //temporary fix
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../styles/stylesheet.scss";
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
