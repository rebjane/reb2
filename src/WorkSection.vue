<template>
  <div ref="workwrap" class="worksection-wrapper">
    <div class="info">
      <h2 v-if="data.primary.heading.length">{{$cms.textField(data.primary.heading)}}</h2>
      <p v-if="data.primary.desc.length">{{$cms.textField(data.primary.desc)}}</p>
      <p>Scroll</p>
    </div>
    <div class="scroll outer" ref="scroll">
      <div ref="work" class="worksection">
        <CarouselVertical
          ref="carousel"
          class="carousel"
          :horiz="horiz"
          @info="handleInfo"
          :data="carouselData"
          v-if="carouselData"
        />
      </div>
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
    // inview() {
    //   this.toggleScroll(this.inview);
    // }
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
      //ensure the scroll has already been made
      if (this.newscroll) {
        //if in view an d mouse is  over the element
        if (mouseOn && this.inview) {
          this.newscroll.listen();
          this.$emit("deafenGlobalScroll", true);

          //if themouse moves away,indicates i want to scroll away
        } else if (!mouseOn) {
          this.newscroll.deafen();
          this.$emit("deafenGlobalScroll", false);
        }
      }
    }
  },
  mounted() {
    console.log(this.data);

    //filter by what kind of work (ie. work, illustration, design)
    this.carouselData = this.$work.filter(
      i => i.type_of_work === this.data.primary.type_of_work
    );

    //initialize a new vertical scroll and deafen
    this.newscroll = new Scrolly(this.$refs.scroll, "v");
    this.newscroll.deafen();

    //listener for when you want to scroll out of
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
  position: relative;
  background: $lbg;

  @include ease(background);
  &:hover {
    background: white;
  }
}

.info {
  margin-top: 10%;
  margin-left: 2em;
  float: left;
  text-align: left;
  max-width: 20%;
  border-bottom: 1px solid $bg;

  h2 {
    font-size: 60px;
    border-bottom: 1px solid $bg;
    margin: 0;
    font-family: $acumin;
  }
  .desc {
    margin-bottom: 3em;
  }
  pointer-events: none;
}

.scroll {
  // display: inline-block;
  padding: 0 15% 0 25%;
  max-width: 90%;
}

.title {
  position: absolute;
  top: 0;
  z-index: 0;
  width: 100%;
  // mix-blend-mode: difference;
}
</style>
