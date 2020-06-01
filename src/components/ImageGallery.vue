<template>
  <div class="image-gallery">
    <div class="gallery">
      <transition v-for="(item, i) in data.items" :key="i">
        <div class="col">
          <ImageWrap
            class="image"
            :imgInfo="{img: item.image.url,
          src: item.image.url,
          width: item.image.dimensions.width,
          height: item.image.dimensions.height}"
            :img="item.image.url"
            :ripple="false"
            ref="parallax"
          />
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "ImageGallery",
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../styles/stylesheet.scss";
.image-gallery {
  height: 100%;
  position: relative;
  width: 100%;
  text-align: center;
}
.gallery {
  // width: 100%;
  height: 100%;
  display: inline-block;
  position: relative;
}
.col {
  position: relative;
  // width: 50%;
  min-width: 100%;
  text-align: center;
  @include above($tablet) {
    min-width: calc(50% - 2em);
    margin: 1em;
    &:nth-child(odd) {
      text-align: right;
    }
    &:nth-child(even) {
      text-align: left;
    }
  }
  height: 100%;
  display: inline-block;

  .image {
    // position: absolute;
    // left: 50%;
    // top: 50%;
    // transform: translate3d(-50%, -50%, 0);
    min-width: 100%;
  }
}
</style>
