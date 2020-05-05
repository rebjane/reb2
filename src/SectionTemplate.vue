<template>
  <div ref="page" class="about"></div>
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
.workpage {
  padding-top: 100px;
  // height: 100%;
}
p {
  color: white;
}
</style>
