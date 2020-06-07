<template>
  <div ref="workwrap" class="worksection-wrapper outer">
    <div class="header">
      <h2 v-if="header">{{header}}</h2>
    </div>
    <CarouselHoriz class="horiz" :horiz="true" :data="carouselData" v-if="carouselData" />
  </div>
</template>

<script>
import { mapState } from "vuex";
// import Scrolly from "./scrolly.js";
// import Scrollbar from "./components/Scrollbar.vue";

export default {
  name: "Template",
  watch: {},
  components: {
    // Scrollbar
  },
  props: {
    data: Object,
    inview: Boolean
  },
  data() {
    return {
      carouselData: null,
      workscroll: null,
      globalscrollStopped: false,
      header: null
    };
  },
  computed: {
    ...mapState([
      "signatureLoaded",
      "loadPct",
      "loaded",
      "navOpen",
      "vertscroll",
      "scroll",
      "scrollAllowed",
      "winresize"
    ])
  },
  methods: {
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
    // console.log(this.$cms.textField(this.data.primary.heading).toUpperCase());
    this.header = this.$cms.textField(this.data.primary.heading).toUpperCase();
    //filter by what kind of work (ie. work, illustration, design)
    this.carouselData = this.$work.filter(
      i => i.type_of_work === this.data.primary.type_of_work
    );
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "./styles/stylesheet.scss";
.worksection-wrapper {
  // background: white;

  height: 100%;
  padding-right: $medpad;
  display: flex;
}
.scroll {
  position: relative;
  height: 100%;
  overflow: hidden;
}
.header {
  position: relative;
  // width: 300px;

  h2 {
    // position: absolute;
    hyphens: none;
    font-family: $acumin;
    // @include
    text-align: center;
    // transform: translateY(-50%) rotate(-90deg);

    top: 50vh;
    margin: 0;
    margin-top: 50vh;
    transform: translateY(-50%);
    margin-right: 2em;
    margin-left: 4em;

    @include title();
  }
  // position: absolute;
  // float: left;
}
.horiz {
  display: inline-block;
  @include below($tablet) {
    margin-top: $top;
  }
}
</style>
