<template>
  <div class="carousel-horiz" v-if="items.length" ref="carousel">
    <!-- <div ref="carousel" class="carousel horiz" > -->
    <transition v-for="(item, i) in items" :key="i">
      <div class="item-outer" :style="isLastAndOdd(i, items) ? `margin-bottom: auto;` : null">
        <!-- {{item}} -->
        <router-link class="rl" :to="`/${data[i].type_of_work}/${data[i].uid}`">
          <div
            class="image-wrap horiz link"
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
          heightResize: wh / 3}"
              :img="item.url"
              :ripple="false"
              :isParallax="false"
              :horiz="horiz"
              :scrollObj="carouselScroll"
              :style="winresize.size.tablet ? `opacity: 0` : null"
            />
          </div>
          <p v-if="item.title">{{item.title}}</p>
        </router-link>
      </div>
    </transition>
    <!-- </div> -->
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
      carouselScroll: null,
      wh: window.innerHeight
    };
  },
  methods: {
    // isHovering(isHover) {
    //   this.ripple = isHover;
    //   if (this.ripple) {
    //     this.imageSizing;
    //   }
    // },
    doWorkPageIndex(data, i) {
      this.$store.commit("updateWorkPageIndex", {
        data: data,
        i: i
      });
    },
    isLastAndOdd(i, items) {
      if (i === items.length - 1 && i % 2 == 0) {
        return true;
      }
      return false;
    },
    setDynamicWidth() {
      // console.log(
      //   this.$refs.carousel.getBoundingClientRect().width *
      //     (this.items.length / 2)
      // );
      this.$refs.carousel.style = `width: ${this.$refs.carousel.getBoundingClientRect()
        .width *
        (this.items.length / 2)}px;`;
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
          if (item.feature_image.url) {
            this.items.push({
              url: item.feature_image.url,
              width: item.feature_image.dimensions.width, // i expect these values to come with prismic automatically, 981 default
              height: item.feature_image.dimensions.height, //736 default
              title: this.$cms.textField(item.title),
              date: item.date
            });
            //gotta create cases for External GIF (and maybe internal GIF, likely no but not sure yet)
          } else {
            // console.log(item.anim_link.url);
            this.items.push({
              url: item.anim_link.url, //palceholder for now
              width: item.anim_link.width, // palceholder for now
              height: item.anim_link.height, //palceholder for now
              title: this.$cms.textField(item.title),
              date: item.date
            });
          }
        });
        res(this.items);
      }).then(() => {
        if (this.$refs.carousel) this.imagePos();
        this.$emit("info", {
          title: this.items[0].title || "no title",
          date: this.items[0].date || "no date",
          key: 0
        });
        // window.addEventListener("resize", this.imageSizing);
      });
      this.$nextTick(() => {
        if (this.$refs.carousel) this.setDynamicWidth();
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../styles/stylesheet.scss";
.carousel-horiz {
  // flex-direction: row;
  // height: 100vh;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
.carousel {
  //   position: absolute;
  width: 100%;
  height: 100%;
}
.rl {
  // padding: 0 2em;
  display: inline-block;
  // @include above($tablet) {
  //   vertical-align: middle;
  //   transform: translateY(-50%);
  //   margin-top: 50vh;
  // }
  @include below($tablet) {
    width: 80vw;
  }
}
.item-outer {
  position: relative;
  // display: inline-block;
  &:nth-child(odd) {
    margin-top: auto;
  }
  &:nth-child(even) {
    margin-bottom: auto;
  }
  p {
    @include mini();
  }
}
.image-wrap {
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  @include below($tablet) {
    height: 100%;
    width: 80vw;
  }
}
</style>
