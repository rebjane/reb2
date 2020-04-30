<template>
  <div id="index" ref="index">
    <Loading />
    <!-- <App  /> -->
  </div>
</template>

<script>
import { mapState } from "vuex";
import Loading from "./Loading.vue";
export default {
  name: "App",
  watch: {},
  beforeMounted() {},
  components: {
    Loading
  },
  data() {
    return {
      time: 0
    };
  },
  computed: {
    ...mapState(["signatureLoaded", "loadPct"])
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
</style>
