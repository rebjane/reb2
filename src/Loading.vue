<template>
  <div class="loading-component">
    <span>{{loadPct}}</span>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  watch: {
    loadPct: Number
  },
  components: {},
  name: "Loading",
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      pct: [0, 0],
      slideOut: false,
      showSlidingText: false
    };
  },
  computed: {
    ...mapState(["loadPct", "gltfsLoaded"])
  },
  methods: {},
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "./styles/stylesheet.scss";
</style>
