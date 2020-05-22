<template>
  <div ref="workwrap" class="worksection-wrapper outer">
    <div ref="work" class="worksection">
      <CarouselVertical :horiz="horiz" @info="handleInfo" :data="carouselData" v-if="carouselData" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Scrolly from "./scrolly.js";
// import Scrollbar from "./components/Scrollbar.vue";

export default {
  name: "Template",
  watch: {
    inview() {
      this.toggleScroll(this.inview);
    }
  },
  components: {
    // Scrollbar
  },
  props: {
    data: Object,
    inview: Boolean
  },
  data() {
    return {
      fixedTitlePos: 0,
      fixedCTitlePos: 0,
      topPos: null,
      bottomPos: null,
      newscroll: null,
      horiz: false,
      info: {
        title: this.data.primary.type_of_work,
        date: "default",
        key: 0
      },
      carouselData: null,
      vertScroll: null
      // data: this.$projectCarousel
    };
  },
  computed: {
    ...mapState([
      "signatureLoaded",
      "loadPct",
      "loaded",
      "navOpen",
      "vertscroll"
    ])
  },
  methods: {
    /* eslint-disable no-unused-vars*/
    handleInfo(e) {
      // this.info = e;
      // this.info.title = "work";
    },
    toggleScroll(mouseOn) {
      if (this.newscroll) {
        if (mouseOn && this.inview) {
          this.newscroll.listen();
          this.$emit("deafenGlobalScroll", true);
        } else if (!mouseOn) {
          this.newscroll.deafen();
          this.$emit("deafenGlobalScroll", false);
        }
      }
    }
  },
  mounted() {
    this.carouselData = this.$work.filter(
      i => i.type_of_work === this.data.primary.type_of_work
    );
    this.newscroll = new Scrolly(this.$refs.workwrap, "v");
    this.newscroll.deafen();
    this.$refs.workwrap.addEventListener("mousemove", e => {
      if (e.target.className.includes("outer")) {
        this.toggleScroll(false);
        return;
      }
      this.toggleScroll(true);
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "./styles/stylesheet.scss";
.worksection-wrapper {
  position: relative;
}
.worksection {
  height: 100%;
  min-height: 200vh;
  margin: 0 10em;
  position: relative;
}

.mousedetectarea {
  position: absolute;
  // pointer-events: none;
  height: 100%;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 2;
}

p {
  color: white;
}
.title {
  position: absolute;
  top: 0;
  z-index: 0;
  width: 100%;
  // mix-blend-mode: difference;
}
</style>
