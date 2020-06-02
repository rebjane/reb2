<template>
  <div ref="workwrap" class="worksection-wrapper outer">
    <HeadText
      :title="$cms.textField(data.primary.heading)"
      :body="$cms.textField(data.primary.desc)"
    />
    <div class="scrollouter">
      <div class="scroll" ref="scroll">
        <div ref="work" class="worksection carousel">
          <CarouselVertical
            ref="carousel"
            :horiz="horiz"
            @info="handleInfo"
            :data="carouselData"
            v-if="carouselData"
          />
        </div>
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
    winresize() {
      if (this.newscroll) {
        this.newscroll.size();
      }
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
      "vertscroll",
      "winresize"
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
    // console.log(this.data);

    //filter by what kind of work (ie. work, illustration, design)
    this.carouselData = this.$work.filter(
      i => i.type_of_work === this.data.primary.type_of_work
    );

    setTimeout(() => {
      //initialize a new vertical scroll and deafen
      this.newscroll = new Scrolly(this.$refs.scroll, "v");
      this.newscroll.deafen();

      //listener for when you want to scroll out of

      if (this.winresize.userAgent.desktop) {
        this.$refs.workwrap.addEventListener("mousemove", e => {
          if (e.target.className.includes("outer")) {
            this.toggleScroll(false);
            return;
          }
          this.toggleScroll(true);
        });
      } else {
        this.$refs.workwrap.addEventListener("touchstart", e => {
          if (e.target.className.includes("outer")) {
            this.toggleScroll(false);
            return;
          }
          this.toggleScroll(true);
        });
      }
    }, 1000);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "./styles/stylesheet.scss";
.worksection-wrapper {
  position: relative;
  @include above($tablet) {
    height: 100%;
  }
  // height: 100%;
}
.scroll {
  height: 100%;
}
.scrollouter {
  height: 100%;
  width: 100%;
  // @include below($tablet) {
  //   border-top: 1px solid black;
  // }
  @include above($tablet) {
    width: 50%;
  }
  overflow: hidden;
  display: inline-block;
}
.worksection {
  // height: 100%;
  // min-height: 200vh;
  // display: inline-block;
  position: relative;
  background: $lbg;
  margin-bottom: 5em;

  @include above($tablet) {
    margin-top: 5em;
  }

  @include ease(background);
  // &:hover {
  //   background: white;
  // }
}

.info {
  // margin-top: 10%;
  top: 50vh;
  transform: translateY(-50%);
  margin-left: 3em;
  position: absolute;
  text-align: left;
  // max-width: 20%;
  width: 300px;
  // border-right: 1px solid $bg;
  padding-right: 2em;
  z-index: 4;
  h2 {
    font-size: 50px;
    border-bottom: 1px solid $bg;
    margin: 0;
    font-family: $acumin;
  }
  .desc {
    margin-bottom: 3em;
  }
  pointer-events: none;
}

.title {
  position: absolute;
  top: 0;
  z-index: 0;
  width: 100%;
  // mix-blend-mode: difference;
}
</style>
