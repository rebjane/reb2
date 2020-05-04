<template>
  <div ref="page" class="workpage">
    <div class="scroll" ref="scroll">
      <CarouselVertical @info="handleInfo" />
    </div>
    <CarouselTitle :info="info" />
    <SlidingText class="title" :text="'work'" />

    <!-- <Scrollbar @scrollPos="handleScrollBarFunction" v-if="loaded & !navOpen" /> -->
  </div>
</template>

<script>
import { mapState } from "vuex";
// import Scrolly from "./scrolly.js";
// import Scrollbar from "./components/Scrollbar.vue";

export default {
  name: "Template",
  components: {
    // Scrollbar
  },
  props: {
    msg: String
  },
  data() {
    return {
      scroll: null,
      info: {
        title: "default",
        date: "default",
        key: 0
      }
    };
  },
  computed: {
    ...mapState(["signatureLoaded", "loadPct", "loaded", "navOpen"])
  },
  methods: {
    handleScrollBarFunction(scroll) {
      this.scroll.scrollFromScrollBar(scroll);
    },
    handleInfo(e) {
      this.info = e;
    }
  },
  mounted() {
    // this.$nextTick(() => {
    //   this.scroll = new Scrolly(this.$refs.page);
    // });
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
.title {
  position: absolute;
  top: 0;
  z-index: 3;
  width: 100%;
}
</style>
