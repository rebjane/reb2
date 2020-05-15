<template>
  <div ref="page" class="workpage">
    <!-- <div class="scroll" ref="scroll"> -->
    <!-- <div class="line" :style="`transform: translateY(${fixedTitlePos}px) translateX(-50%); `" /> -->

    <CarouselVertical @info="handleInfo" :data="carouselData" v-if="carouselData" />
    <!-- </div> -->
    <CarouselTitle
      :info="info"
      :style="`transform: translateY(${fixedTitlePos}px);`"
      class="title"
      :text="'work'"
    />

    <!-- <SlidingText
      :style="`transform: translateY(${fixedTitlePos}px);`"
      class="title"
      :text="'work'"
    />-->

    <!-- <Scrollbar @scrollPos="handleScrollBarFunction" v-if="loaded & !navOpen" /> -->
  </div>
</template>

<script>
import { mapState } from "vuex";
// import Scrolly from "./scrolly.js";
// import Scrollbar from "./components/Scrollbar.vue";

export default {
  name: "Template",
  watch: {
    scroll: {
      handler(e) {
        if (this.scroll >= this.topPos && this.scroll <= this.bottomPos) {
          this.fixedTitlePos = e - this.topPos;
          this.fixedCTitlePos = e - this.topPos;
        }
      }
    }
  },
  components: {
    // Scrollbar
  },
  props: {
    data: Object
  },
  data() {
    return {
      fixedTitlePos: 0,
      fixedCTitlePos: 0,
      topPos: null,
      bottomPos: null,
      info: {
        title: this.data.primary.type_of_work,
        date: "default",
        key: 0
      },
      carouselData: null
      // data: this.$workCarousel
    };
  },
  computed: {
    ...mapState(["signatureLoaded", "loadPct", "loaded", "navOpen", "scroll"])
  },
  methods: {
    handleScrollBarFunction(scroll) {
      this.scroll.scrollFromScrollBar(scroll);
    },
    /* eslint-disable no-unused-vars*/
    handleInfo(e) {
      // this.info = e;
      // this.info.title = "work";
    }
  },
  mounted() {
    // console.log("workpage data", this.data.primary.type_of_work);

    //handle what carousel data based on what's chosen on the home page!
    //add to it after the other data is done
    switch (this.data.primary.type_of_work) {
      case "project": {
        this.carouselData = this.$workCarousel;
        break;
      }
    }
    this.$nextTick(() => {
      //   this.scroll = new Scrolly(this.$refs.page);
      this.topPos = this.$refs.page.getBoundingClientRect().top;

      this.bottomPos =
        this.$refs.page.getBoundingClientRect().bottom - window.innerHeight;
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "./styles/stylesheet.scss";
.workpage {
  padding-top: 100px;
  position: relative;
  height: 100%;
}
p {
  color: white;
}
.title {
  position: absolute;
  top: 0;
  z-index: 3;
  width: 100%;
  // mix-blend-mode: difference;
}
.line {
  position: absolute;
  top: 50vh;
  width: 100%;
  border-bottom: 1px solid $bg;
  opacity: 0.3;
  z-index: -1;
  width: 65%;
  left: 50%;
}
</style>
