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
        // console.log(e);
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
        if (opacity > 0.9) {
          let imgWidth = this.items[i].width / this.items[i].height;
          imgWidth = imgWidth * item.children[0].getBoundingClientRect().height;
          this.key = i;
          this.resizeObj = {
            canvasWidth: item.children[0].getBoundingClientRect().width,
            canvasHeight: item.children[0].getBoundingClientRect().height,
            scale: 1 + (1 - size),
            imgWidth: imgWidth
          };
        }
      });
    }
  },
  mounted() {
    this.imagePos();
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
  background-size: cover;
  max-width: 60%;
  height: 600px;
  // height: 100%;
  // width: 100%;
  margin: auto;
  overflow: hidden;
}
.image-wrap {
  margin-bottom: -3em;
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
