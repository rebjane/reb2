<template>
  <div ref="workwrap" class="worksection-wrapper outer">
    <div class="scroll" ref="scroll">
      <!-- <div ref="carousel" class="carousel"> -->
      <CarouselHoriz :horiz="true" :data="carouselData" v-if="carouselData" />
      <!-- </div> -->
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
    scroll() {
      // console.log(this.$refs.workwrap.getBoundingClientRect().left);
      if (this.scroll.pos >= this.$refs.workwrap.getBoundingClientRect().left) {
        this.workscroll.listen();
        this.$emit("deafenGlobalScroll", true);
        this.$emit(
          "scrollTo",
          this.$refs.workwrap.getBoundingClientRect().right
        );
      }
    },
    scrollAllowed() {
      if (this.scrollAllowed) {
        this.workscroll = new Scrolly(this.$refs.scroll, "h");
        this.workscroll.deafen();
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
      carouselData: null,
      workscroll: null
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
    // console.log(this.data);

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
  background: white;
  height: 100%;
}
.scroll {
  position: relative;
  height: 100%;
  overflow: hidden;
}
</style>
