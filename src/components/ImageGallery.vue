<template>
  <div class="image-gallery">
    <p>image gallery</p>
    <div class="gallery">
      <transition v-for="(item, i) in data.items" :key="i">
        <div class="col">
          <ParallaxImage
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
  name: "Template",
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
  mounted() {
    console.log("ig", this.data);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../styles/stylesheet.scss";
.image-gallery {
  height: 100%;
  position: relative;
}
.gallery {
  width: 100%;
  position: relative;
}
.col {
  width: 50%;
  display: inline-block;
}
</style>
