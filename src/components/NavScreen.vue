<template>
  <div class="nav-screen"></div>
</template>

<script>
// import WaveText from "../wavetext.js";
import { mapState } from "vuex";

export default {
  name: "NavScreen",

  props: {
    data: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      opts: null,
      lineLeaveStyle: ""
    };
  },
  computed: {
    ...mapState(["navOpen"])
  },
  methods: {},
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../styles/stylesheet.scss";
</style>
