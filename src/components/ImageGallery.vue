<template>
  <div class="image-gallery">
    <div class="gallery">
      <transition v-for="(item, i) in data.items" :key="i">
        <div class="image" :style="`background-image: url(${item.image.url})`">
          <img :src="item.image.url" style="opacity: 0;" />
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ImageGallery",
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  computed: {
    ...mapState(["winresize"])
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
  max-height: 100%;
  position: relative;
  // width: 100%;
  text-align: center;
  @include workpadding();
  padding-top: 3em;
  padding-bottom: 3em;
}
.gallery {
  // width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-wrap: wrap;
}
.image {
  display: inline-block;

  // width: calc(33% - 2em);
  @include below($tablet) {
    width: 100%;
    height: 100%;
    padding-top: 1em;
    padding-bottom: 1em;
  }
  @include above($tablet) {
    flex: 1;
    // height: 70vh;
  }
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin: 0 1em;
  // height: 40vh;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
