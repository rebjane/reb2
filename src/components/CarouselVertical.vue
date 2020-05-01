<template>
  <div class="carousel-vertical">
    <div ref="carousel" class="carousel">
      <transition v-for="(item, i) in items" :key="i">
        <div class="image-wrap">
          <div :ref="`image-${i}`" class="image" :style="`background-image: url(${item.url});`">
            <img style="opacity: 0;" :src="item.url" />
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
      items: [
        {
          url:
            "https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
        },
        {
          url:
            "https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
        },
        {
          url:
            "https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
        },
        {
          url:
            "https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
        },
        {
          url:
            "https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
        },
        {
          url:
            "https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
        },
        {
          url:
            "https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
        },
        {
          url:
            "https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
        },
        {
          url:
            "https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
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
          key: i + 1
        });
      });
    },
    imageSizing() {
      this.$refs.carousel.children.forEach((item, i) => {
        //where its middle y coordinate is located, relative to the page
        let midPos = this.midPos[i].midPos;
        //the middle position, less your scroll position (generates linear relative value to your position and each element's midPos)
        let size = Math.abs(midPos - this.scroll);
        //divided by 1000 and cannot exceed 1
        size = Math.min(size / 1000, 1);
        //size is 1 less the calculation
        size = 1 - size;
        //size does not go below 0.7
        size = Math.max(size, 0.7);

        item.style = `transform: scale(${size});`;
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
  margin: auto;
  margin-bottom: 0em;
}
.carousel {
  margin: auto;
}
</style>
