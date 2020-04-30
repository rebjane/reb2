<template>
  <div id="index" ref="app">
    <Loading v-if="!loaded" />
    <!-- <Index v-if="loaded" /> -->
    <router-view v-if="loaded" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import Loading from "./Loading.vue";
// import Index from "./Index.vue";

export default {
  name: "App",
  watch: {},
  beforeMounted() {},
  components: {
    Loading
    // Index
  },
  data() {
    return {
      time: 0
    };
  },
  computed: {
    ...mapState(["signatureLoaded", "loadPct", "loaded"])
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
/* canvas {
  -webkit-filter: grayscale(100%);
  filter: grayscale(100%);
} */
@import "./styles/stylesheet.scss";
#app {
  height: 100%;
  width: 100%;
  background: $bg;
}
</style>
