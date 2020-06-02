<template>
  <div class="carousel-vertical">
    <div ref="carousel" class="carousel vert" v-if="items.length">
      <transition v-for="(item, i) in items" :key="i">
        <router-link class="rl" :to="`/${data[i].type_of_work}/${data[i].uid}`">
          <div
            class="image-wrap vert"
            @click="doWorkPageIndex(data, i)"
            :style="winresize.size.tablet ? `background-image: url(${item.url})` : null"
          >
            <ImageWrap
              class="image"
              :imgInfo="{title: item.title,
            img: item.url,
          src: item.url,
          width: item.width,
          height: item.height,
          widthResize: 450}"
              :img="item.url"
              :ripple="false"
              :isParallax="false"
              :horiz="horiz"
              :scrollObj="carouselScroll"
              :style="winresize.size.tablet ? `opacity: 0` : null"
            />
          </div>
          <p>{{item.title}}</p>
        </router-link>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "CarouselVertical",
  props: {
    data: {
      type: Array,
      default: null
    },
    horiz: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    vertscroll: {
      handler() {
        // this.imageSizing();
        // console.log(this.scroll.direction);
        if (this.vertscroll.direction === "v") {
          this.carouselScroll = this.vertscroll;
        }
      },
      deep: true
    }
  },
  computed: {
    ...mapState([
      "signatureLoaded",
      "navOpen",
      "vertscroll",
      "wpindex",
      "winresize"
    ])
  },
  data() {
    return {
      midPos: [],
      showHover: new Array(),
      key: 0,
      ripple: false,
      resizeObj: {},
      items: [],
      carouselScroll: null
    };
  },
  methods: {
    isHovering(isHover) {
      this.ripple = isHover;
      if (this.ripple) {
        this.imageSizing;
      }
    },
    doWorkPageIndex(data, i) {
      this.$store.commit("updateWorkPageIndex", {
        data: data,
        i: i
      });
    },
    imagePos() {
      this.$refs.carousel.children.forEach((item, i) => {
        //for horiz
        var midPos;
        if (this.horiz) {
          midPos = Math.abs(
            (window.innerWidth - item.getBoundingClientRect().width) / 2 -
              item.getBoundingClientRect().left
          );
        } else {
          //for vert
          midPos = Math.abs(
            (window.innerHeight - item.getBoundingClientRect().height) / 2 -
              item.getBoundingClientRect().top
          );
        }
        this.midPos.push({
          midPos: midPos,
          key: i,
          isRipple: false
        });
      });
    },
    canvasLeft(imgWidthResize, divWidth) {
      return (divWidth - imgWidthResize) / 2;
    },

    canvasTop(divHeight, imgHeightResize) {
      return (divHeight - imgHeightResize) / 1.95;
    },
    imgResizeHeight(iW, iH, divWidth) {
      return (iH / iW) * divWidth;
    },
    imgResizeWidth(iW, iH, divHeight) {
      return (iW * divHeight) / iH;
    },
    imageSizing() {
      this.$refs.carousel.children.forEach((item, i) => {
        //where its middle y coordinate is located, relative to the page
        let midPos = this.midPos[i].midPos;
        //the middle position, less your scroll position (generates linear relative value to your position and each element's midPos)
        let size = Math.abs(midPos - this.vertscroll.pos);

        let opacity = Math.min(size / 600, 1); //the lower the hundred val, the quicker it'll fade
        opacity = Math.max(0.5, 1 - opacity);
        //divided by 1000 and cannot exceed 1
        size = Math.min(size / 1000, 1);
        //size is 1 less the calculation
        size = 1 - size;
        //size does not go below 0.7
        size = Math.max(size, 0.9);

        item.style = `transform: scale(${size}); opacity: ${opacity};`;
        //-----------
        let iW = this.items[i].width;
        let iH = this.items[i].height;
        let canvasLeft = 0;
        let iRatio = iW / iH;
        let divWidth = item.children[0].getBoundingClientRect().width;
        let divHeight = item.children[0].getBoundingClientRect().height;
        let divRatio = divWidth / divHeight;
        let imgHeightResize = divHeight;
        let imgWidthResize = divWidth;
        if (divRatio > iRatio) {
          // resize image width
          imgWidthResize = this.imgResizeWidth(iW, iH, divHeight);
          canvasLeft = this.canvasLeft(imgWidthResize, divWidth);
          // canvasLeft = 40;
        } else {
          //resize image height
          imgHeightResize = Math.min(
            divHeight,
            this.imgResizeHeight(iW, iH, divWidth)
          );
        }

        let canvasTop = this.canvasTop(divHeight, imgHeightResize);

        //-----------

        if (opacity > 0.7) {
          this.key = i;
          this.$emit("info", {
            title: this.items[i].title,
            date: this.items[i].date,
            key: i
          });
          this.resizeObj = {
            canvasWidth: divWidth,
            canvasHeight: imgHeightResize,
            scale: 1 + (1 - size),
            imgWidth: imgWidthResize,
            imgHeight: imgHeightResize,
            canvasLeft: canvasLeft,
            canvasTop: canvasTop
          };
        }
      });
    }
  },
  mounted() {
    // console.log(this.data);
    if (this.data.length) {
      new Promise(res => {
        this.data.forEach(item => {
          this.items.push({
            url: item.feature_image.url,
            width: item.feature_image.dimensions.width, // i expect these values to come with prismic automatically, 981 default
            height: item.feature_image.dimensions.height, //736 default
            title: this.$cms.textField(item.title),
            date: item.date
          });
        });
        res(this.items);
      }).then(() => {
        this.imagePos();
        this.$emit("info", {
          title: this.items[0].title,
          date: this.items[0].date,
          key: 0
        });
        // window.addEventListener("resize", this.imageSizing);
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../styles/stylesheet.scss";
.carousel-vertical {
  // max-height: 100vh;
  // padding-bottom: 200px;
  // height: 100%;
  margin: auto;
  // border-left: 1px solid $lightgrey;
  // border-right: 1px solid $lightgrey;
}

.carousel {
  margin: auto;
  height: 100%;
  @include above($tablet) {
    width: 100%;
  }
  @include below($tablet) {
    margin: 3em 1em;
  }
}
.rl {
  // @include above($tablet) {
  //   display: inline-block;
  //   width: 50%;
  // }
  width: 100%;
}
.image {
  transform: scale(1);
  pointer-events: none;
  background-repeat: no-repeat;
  background-size: contain;
  // max-width: 60%;
  background-position: center;
  // border: 1px solid $bg;
  // height: 736px;
  // height: 100%;
  display: inline-block;
  @include ease(filter);
  position: relative;
  filter: brightness(100%);
  // cursor: pointer;
  &:hover {
    filter: brightness(50%);
  }

  // width: 100%;
  // height: 300px;
  margin: auto;
  // overflow: hidden;
}
.image-wrap {
  //for horiz
  // &:nth-child(3) {
  //   margin-left: -30%;
  //   margin-right: -30%;
  // }
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  // @include above($tablet) {
  //   margin: 1em;
  //   padding: 1em;
  // }

  display: inline-block;
  position: relative;
  overflow: visible;
  @include below($tablet) {
    width: 100%;
  }
  // width: calc(50% - 1em);
  .bordering {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 80%;
    width: 100%;
    border: 1px solid black;
  }
}
.hover {
  position: absolute;
  width: 100%;
  height: 100%;
  background: $bg;
  z-index: 1;
  opacity: 0.3;
  pointer-events: none;
}
h3 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  z-index: 3;
  color: white;
  opacity: 1;
  font-size: 10em;
  margin: 0;
  font-family: $suisse;
  font-weight: bold;
  pointer-events: none;
}
img {
  width: 100%;
}

.h3-enter,
.h3-leave-to {
  opacity: 0;
}
.h3-enter-active,
.h3-leave-active {
  @include ease(opacity);
}
.h3-enter-to {
  opacity: 1;
}
</style>
