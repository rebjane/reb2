


<template>
  <div id="app-wrapper">
    <div id="app" ref="appofficial">
      <!-- <div class="home-main" v-if="signatureLoaded">
      <HomeOverlay class="el" />-->
      <div>
        <!-- <div class="home"> -->
        <!-- <Signature class="sig" /> -->
        <!-- <HomeOverlay @canScroll="canScroll = true" class="el" /> -->
        <!-- v-if="signatureLoaded" -->
        <!-- </div> -->
        <!-- <div class="work"> -->
        <IntroSection />
        <WorkPage />
        <!-- </div> -->

        <AboutSection />
        <BackgroundSection />
        <!-- <WorkPage class="el" /> -->
      </div>

      <!-- </div> -->
    </div>
    <Scrollbar @scrollPos="handleScrollBarFunction" v-if="canScroll & !navOpen" />
  </div>
</template>

<script>
import Scrolly from "./scrolly.js";
import Scrollbar from "./components/Scrollbar.vue";
import { mapState } from "vuex";
export default {
  name: "Index",
  watch: {
    // canScroll: {
    //   handler(e) {
    //     if (e) {
    //       this.$nextTick(() => {
    //         this.scroll = new Scrolly(document.getElementById("app"));
    //       });
    //     }
    //   }
    // }
  },
  beforeMounted() {},
  components: {
    Scrollbar
  },
  data() {
    return {
      time: 0,
      scroll: null,
      // canScroll: false
      canScroll: true
    };
  },
  computed: {
    ...mapState(["signatureLoaded", "navOpen"])
  },
  methods: {
    handleScrollBarFunction(scroll) {
      this.scroll.scrollFromScrollBar(scroll);
    }
  },
  mounted() {
    this.scroll = new Scrolly(document.getElementById("app"));
  }
};
</script>

<style lang="scss">
/* canvas {
  -webkit-filter: grayscale(100%);
  filter: grayscale(100%);
} */
@import "./styles/stylesheet.scss";
img {
  width: 100%;
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
  background: $lbg;
  overflow: hidden;
  height: 100%;
  position: relative;
}
p {
  color: $bg;
  overflow: hidden;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow: hidden;
}

.intro {
  overflow: hidden;
}
.el,
.sig {
  position: relative;
}
.home {
  position: relative;
  height: 100vh;
}
// .sig {
//   left: -$pad;
// }
.work {
  position: relative;
  height: 100%;
}
</style>
