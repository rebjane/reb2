<template>
  <div ref="page" class="intro"></div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Template",
  components: {},
  props: {
    msg: String
  },
  data() {
    return {
      scroll: null
    };
  },
  beforeDestroy() {},
  computed: {
    ...mapState(["signatureLoaded", "loadPct", "loaded", "navOpen"])
  },
  methods: {},
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "./styles/stylesheet.scss";
.intro {
  height: 100vh;
}
p {
  color: white;
}
</style>
