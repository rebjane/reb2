<template>
  <div ref="page" class="workpage">
    <div class="scroll" ref="scroll">
      <CarouselVertical />

      <!-- <RippleImage /> -->
    </div>
    <CarouselTitle />
    <Scrollbar v-if="loaded & !navOpen" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import Scrolly from "./scrolly.js";
import Scrollbar from "./components/Scrollbar.vue";

export default {
  name: "Template",
  components: {
    Scrollbar
  },
  props: {
    data: {
      type: Object,
      default: null
    }
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
  mounted() {
    this.$nextTick(() => {
      this.scroll = new Scrolly(this.$refs.page);
    });
  }
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
