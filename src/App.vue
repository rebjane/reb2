


<template>
  <div id="app-wrapper">
    <div id="app" ref="appofficial">
      <div class="inner">
        <transition v-for="(item , i) in $home" :key="i">
          <div
            :ref="`component-${i} ${item.slice_type === 'WorkSection' ? 'vert' : null}`"
            :class="`component ${scroll.pos > i * (winw * 0.75) ? 'inview' : 'hidden'}`"
          >
            <component
              :inview="handleInview(i)"
              :is="item.slice_type"
              :data="item"
              @deafenGlobalScroll="deafenGlobalScroll"
            />
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import Scrolly from "./scrolly.js";
import Scrollbar from "./components/Scrollbar.vue";
import { mapState } from "vuex";
export default {
  name: "Index",
  props: {
    scrollTo: Number,
    winresize: Object
  },

  watch: {
    winresize: {
      handler() {
        if (this.globalscroll) this.globalscroll.winresize();
      }
    },
    scrollTo: {
      handler(pos) {
        if (this.globalscroll) this.globalscroll.scrollTo(pos);
      },
      deep: true
    },
    // route: {
    //   handler() {
    //     if (!this.globalScroll) this.initScroll();
    //   },
    //   deep: true,
    //   immediate: true
    // },
    scrollAllowed: {
      handler(e) {
        if (e) this.initScroll();
      },
      deep: true
    },

    deep: true,
    immediate: true
  },
  // beforeDestroy() {
  //   this.$refs.app.style = "transform: translateY(-50%)";
  // },
  components: {
    Scrollbar
  },
  beforeDestroy() {
    this.globalScroll = null;
  },
  data() {
    return {
      time: 0,
      globalscroll: null,
      rebImg: require("./assets/reb.jpg"),
      winw: window.innerWidth,
      vertComponents: []
      // canScroll: true
    };
  },
  computed: {
    ...mapState([
      "signatureLoaded",
      "navOpen",
      "scrollAllowed",
      "scroll",
      "loaded"
    ])
  },
  methods: {
    handleInview(i) {
      return this.scroll.pos > i * (this.winw * 0.75) ? true : false;
    },
    initScroll() {
      if (!this.globalscroll)
        this.$nextTick(
          () =>
            (this.globalscroll = new Scrolly(
              document.getElementById("app"),
              "h"
            ))
        );
    },
    deafenGlobalScroll(e) {
      if (this.globalscroll) {
        if (e) {
          this.globalscroll.deafen();
        } else {
          this.globalscroll.listen();
        }
      }
    }
  },
  mounted() {
    //process vertical  components (post-rendered in the template)
    // Object.keys(this.$refs).forEach((item, i) => {
    //   if (item.includes("vert")) {
    //     // console.log(this.$refs[i]);
    //     this.vertComponents.push({
    //       scroll: new Scrolly(this.$refs[item][0], "v"),
    //       left: this.$refs[item][0].getBoundingClientRect().left
    //     });
    //     //for  some reason the index started at 1, should be 0. so deafening the vert scrolls for now, so scroll lsitener can hear out and enable when necessary
    //     this.vertComponents[i - 1].scroll.deafen();
    //     console.log(this.vertComponents, i - 1);
    //   }
    // });
  }
};
</script>

<style lang="scss">
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
      position: relative;
      @include below($tablet) {
        > div:first-child {
          padding-top: 5em;
        }
      }
    }
  }
}
</style>
