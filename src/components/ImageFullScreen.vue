<template>
  <div class="full-screen-image">
    <div class="full-image-wrap" ref="image_wrap">
      <div
        class="full-image"
        ref="image"
        v-if="data.primary.image.url"
        :style="`background-image: url(${data.primary.image.url}); `"
      ></div>
      <!-- ${parallaxStyle} -->
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ImageFullScreen",
  watch: {
    winresize(e) {
      this.height = this.$refs.image_wrap.getBoundingClientRect().height;
      this.focalPos = this.top - (window.innerHeight - this.height) / 2;

      this.offset = e.interval * 1.4;
      this.parallax(this.vertscroll.pos + this.offset);
    },
    vertscroll() {
      if (this.vertscroll.direction === "v") {
        this.parallax(this.vertscroll.pos);
      }
    },
    deep: true
  },
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      parallaxStyle: null,
      focalPos: 0,
      top: 0,
      height: 0,
      offset: 0
    };
  },
  computed: {
    ...mapState(["vertscroll", "winresize"])
  },
  methods: {
    calculate() {
      this.height = this.$refs.image_wrap.getBoundingClientRect().height;
      this.top = this.$refs.image_wrap.getBoundingClientRect().top;

      this.focalPos = this.top - (window.innerHeight - this.height) / 2;
    },
    parallax(pos) {
      this.parallaxStyle = `transform: translateY(${this.math(
        this.focalPos,
        pos
      )}px)`;
      this.$refs.image = this.parallaxStyle;
    },
    math(midPos, scrollPos) {
      return (midPos - scrollPos) * 0.4;
    }
  },
  mounted() {
    // setTimeout(() => {
    //   this.calculate();
    // }, 1000);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../styles/stylesheet.scss";
.full-image-wrap {
  padding: 3em 0;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  @include below($tablet) {
    height: 40vh;
  }
}
.full-image {
  height: 100vh;
  width: 100vw;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  @include below($tablet) {
    height: 40vh;
  }
}
</style>
