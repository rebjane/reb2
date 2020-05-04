<template>
  <div class="carousel-vertical">
    <div ref="carousel" class="carousel">
      <!-- <transition v-for="(item, i) in items" :key="i">
        <div class="image-wrap">
          <div :ref="`image-${i}`" class="image" :style="`background-image: url(${item.url});`">
            <img style="opacity: 0;" :src="item.url" />
          </div>
        </div>
      </transition>-->
      <transition v-for="(item, i) in items" :key="i">
        <div class="image-wrap">
          <div :ref="`image-${i}`" class="image" :style="`background-image: url(${item.url});`">
            <img style="opacity: 0;" :src="item.url" v-if="key !== i" />
            <RippleImage :img="item.url" v-if="key === i" :resize="resizeObj" />
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "CarouselVertical",
  props: {
    msg: String
  },
  watch: {
    scroll: {
      handler() {
        this.imageSizing();
      }
    }
  },
  computed: {
    ...mapState(["signatureLoaded", "navOpen", "scroll"])
  },
  data() {
    return {
      midPos: [],
      key: 0,
      resizeObj: {},
      items: [
        {
          url:
            "https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
          width: 981, // i expect these values to come with prismic asutomaticallt
          height: 736
        },
        {
          url:
            "https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
          width: 981, // i expect these values to come with prismic asutomaticallt
          height: 736
        },
        {
          url:
            "https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
          width: 981, // i expect these values to come with prismic asutomaticallt
          height: 736
        },
        {
          url:
            "https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
          width: 981, // i expect these values to come with prismic asutomaticallt
          height: 736
        },
        {
          url:
            "https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
          width: 981, // i expect these values to come with prismic asutomaticallt
          height: 736
        },
        {
          url:
            "https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
          width: 981, // i expect these values to come with prismic asutomaticallt
          height: 736
        },
        {
          url:
            "https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
          width: 981, // i expect these values to come with prismic asutomaticallt
          height: 736
        },
        {
          url:
            "https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
          width: 981, // i expect these values to come with prismic asutomaticallt
          height: 736
        }
      ]
    };
  },
  methods: {
    imagePos() {
      this.$refs.carousel.children.forEach((item, i) => {
        var midPos = Math.abs(
          (window.innerHeight - item.getBoundingClientRect().height) / 2 -
            item.getBoundingClientRect().top
        );
        this.midPos.push({
          midPos: midPos,
          key: i + 1,
          isRipple: false
        });
      });
    },
    canvasLeft(imgWidthResize, divWidth) {
      return (divWidth - imgWidthResize) / 2;
    },

    canvasTop(divHeight, imgHeightResize) {
      return (divHeight - imgHeightResize) / 1.9;
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
        let size = Math.abs(midPos - this.scroll);

        let opacity = Math.min(size / 600, 1); //the lower the hundred val, the quicker it'll fade
        opacity = 1 - opacity;
        //divided by 1000 and cannot exceed 1
        size = Math.min(size / 1000, 1);
        //size is 1 less the calculation
        size = 1 - size;
        //size does not go below 0.7
        size = Math.max(size, 0.7);

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

        if (opacity > 0.9) {
          this.key = i;
          this.resizeObj = {
            canvasWidth: divWidth,
            canvasHeight: divHeight,
            scale: 1 + (1 - size),
            imgWidth: imgWidthResize,
            imgHeight: imgHeightResize,
            canvasLeft: canvasLeft,
            canvasTop: canvasTop
          };
          if (opacity < 0.8) {
            opacity = 0;
            item.style = `display: none;`;
          }
        }
      });
    }
  },
  mounted() {
    // this.$nextTick(() => {
    this.imagePos();
    // });
    window.addEventListener("resize", this.imageSizing);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../styles/stylesheet.scss";
.carousel-vertical {
  //   max-height: 100vh;
  margin: auto;
}
.image {
  background-repeat: no-repeat;
  background-size: contain;
  max-width: 60%;
  background-position: center;
  // height: 736px;
  // height: 100%;
  width: 100%;
  height: 600px;
  margin: auto;
  overflow: hidden;
}
.image-wrap {
  margin-bottom: -3em;
  width: 100%;

  &:last-child {
    margin-bottom: 5em;
  }
}
img {
  width: 100%;
}
.carousel {
  margin: auto;
}
</style>
