<template>
  <div class="full-screen-image">
    <div class="full-image-wrap" ref="image_wrap">
      <div
        class="full-image"
        ref="image"
        v-if="data.primary.image.url"
        :style="`background-image: url(${data.primary.image.url}); ${parallaxStyle}`"
      ></div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ImageFullScreen",
  watch: {
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
      focalPos: 0
    };
  },
  computed: {
    ...mapState(["vertscroll"])
  },
  methods: {
    parallax(pos) {
      this.parallaxStyle = `transform: translateY(${this.math(
        this.focalPos,
        pos
      )}px)`;
      this.$refs.image = this.parallaxStyle;
    },
    math(midPos, scrollPos) {
      return (midPos - scrollPos) * 0.7;
    }
  },
  mounted() {
    setTimeout(() => {
      var height = this.$refs.image_wrap.getBoundingClientRect().height;
      var top = this.$refs.image_wrap.getBoundingClientRect().top;

      this.focalPos = top - (window.innerHeight - height) / 2;
    }, 1000);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../styles/stylesheet.scss";
.full-image-wrap {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
.full-image {
  height: 100vh;
  width: 100vw;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
