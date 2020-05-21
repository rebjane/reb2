


<template>
  <div id="app-wrapper">
    <div id="app" ref="appofficial">
      <!-- <div class="home-main" v-if="signatureLoaded">
      <HomeOverlay class="el" />-->
      <div class="inner">
        <!-- <div class="home"> -->
        <!-- <Signature class="sig" /> -->
        <!-- <HomeOverlay @canScroll="canScroll = true" class="el" /> -->
        <!-- v-if="signatureLoaded" -->
        <!-- </div> -->
        <!-- <div class="work"> -->
        <transition v-for="(item , i) in $home" :key="i">
          <component
            :is="item.slice_type"
            :ref="`component-${i}`"
            :data="item"
            :class="`component ${scroll.pos > i * winw ? 'inview' : null}`"
            :inview="scroll.pos > i * (winw * 0.75) ? true : false"
            @deafen="deafen"
          />
        </transition>
        <!-- <SlidingText
          :uniquekey="3"
          col="black"
          class="slidingtext"
          :text="'DESIGNER. ILLUSTRATOR. POPCORN-LOVER. | '"
        />-->
        <!-- <WorkSection /> -->
        <!-- </div> -->

        <!-- <BackgroundSection /> -->
        <!-- <AboutSection /> -->

        <!-- <WorkSection class="el" /> -->
      </div>

      <!-- </div> -->
    </div>
    <!-- <Scrollbar v-if="scrollAllowed & !navOpen" /> -->
  </div>
</template>

<script>
import Scrolly from "./scrolly.js";
import Scrollbar from "./components/Scrollbar.vue";
import { mapState } from "vuex";
export default {
  name: "Index",
  watch: {
    scrollAllowed: {
      handler(e) {
        if (e) {
          this.$nextTick(() => {
            this.newscroll = new Scrolly(document.getElementById("app"), "h");
          });
        }
      }
    },
    // scroll: {
    //   handler() {
    //     this.$store.commit("updateScroll", this.newscroll);
    //   }
    // },
    deep: true,
    immediate: true
  },
  beforeMounted() {},
  components: {
    Scrollbar
  },
  data() {
    return {
      time: 0,
      newscroll: null,
      rebImg: require("./assets/reb.jpg"),
      winw: window.innerWidth
      // canScroll: true
    };
  },
  computed: {
    ...mapState(["signatureLoaded", "navOpen", "scrollAllowed", "scroll"])
  },
  methods: {
    deafen() {
      this.newscroll.deafen();
    }
  },
  mounted() {
    // this.scroll = new Scrolly(document.getElementById("app"));
  }
};
</script>

<style lang="scss" >
/* canvas {
  -webkit-filter: grayscale(100%);
  filter: grayscale(100%);
} */
@import "./styles/stylesheet.scss";

#app-wrapper {
  height: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
  background: $lbg;
  // overflow-y: hidden;
  height: 100%;
  width: 100%;
  position: relative;
  .inner {
    display: flex;
    flex-direction: row;
    position: fixed;

    .component {
      width: 100%;
      min-width: 100vw;
    }
  }
}

h1 {
  font-family: $acumin;
  // color: white;
  color: $bg;

  font-weight: normal;
}
p {
  font-family: $suisse;
  color: $bg;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: normal;
  color: $bg;
}

html {
  overflow: hidden;
  height: 100%;
}

body {
  height: 100%;
  overflow: auto;
}
</style>
