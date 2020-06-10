


<template>
  <div id="app-wrapper">
    <div id="app" ref="appofficial">
      <div class="inner">
        <transition v-for="(item , i) in $home" :key="i">
          <div
            ref="component"
            :class="`component ${scroll.pos> $nav[i].left && scroll.pos < $nav[i].right ? 'inview' : 'hidden'}`"
          >
            <component
              :inview="handleInview(i)"
              :is="item.slice_type"
              :data="item"
              @deafenGlobalScroll="deafenGlobalScroll"
              @scrollTo="scrollToPos"
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
    showCart: {
      handler() {
        // console.log(this.showCart);
        if (this.showCart && this.globalscroll) this.globalscroll.deafen();
        else if (!this.showCart && this.globalscroll)
          this.globalscroll.listen();
      },
      deep: true,
      immediate: true
    },
    popup: {
      handler() {
        if (this.popup && this.globalscroll) this.globalscroll.deafen();
        else if (!this.popup && this.globalscroll) this.globalscroll.listen();
      },
      deep: true,
      immediate: true
    },
    winresize: {
      handler() {
        this.winw = window.innerWidth;
        if (this.globalscroll) this.globalscroll.size();
      }
    },
    scrollTo: {
      handler(pos) {
        this.scrollToPos(pos);
      },
      deep: true,
      immediate: true
    }, //debugging
    // scroll() {
    //   console.log(this.scroll.pos);
    // },
    navOpen() {
      if (this.navOpen && this.globalscroll) {
        this.globalscroll.deafen();
      } else if (!this.navOpen && this.globalscroll) {
        this.globalscroll.listen();
      }
    },
    globalscroll() {
      if (this.$store.state.lastScrollPos !== 0) {
        setTimeout(() => {
          this.scrollToPos(this.$store.state.lastScrollPos);
        }, 750);
      }
    },
    scroll() {
      // console.log(this.scroll.);
      if (this.scroll.type === "main")
        this.$store.commit("updateLastScrollPos", this.scroll.pos);
    },
    scrollAllowed: {
      handler(e) {
        if (e) this.initScroll();
      },
      deep: true
    },

    deep: true,
    immediate: true
  },

  components: {
    Scrollbar
  },
  beforeDestroy() {
    // this.globalScroll = null;
    delete this.globalScroll;
    this.globalscroll.stop();

    this.$store.commit("allowScroll", false);
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
      "loaded",
      "showCart",
      "popup"
    ])
  },
  methods: {
    scrollToPos(pos) {
      if (this.globalscroll) this.globalscroll.scrollTo(pos);
    },
    handleInview(i) {
      if (
        this.scroll.pos > this.$nav[i].left - window.innerWidth / 6 &&
        this.scroll.pos < this.$nav[i].right
      ) {
        // console.log(this.$nav[i].title);
        this.$emit("mobileNavTitle", this.$nav[i].title);
      }
      return this.scroll.pos > this.$nav[i].left - window.innerWidth / 6 &&
        this.scroll.pos < this.$nav[i].right
        ? true
        : false;
    },
    initScroll() {
      this.globalscroll.listen();
    },
    getComponentSizings() {
      // for mobile, to ensure top title corresponds correctly when scrolling section to section
      // console.log(this.$refs.component);
      this.$refs.component.forEach((item, i) => {
        // console.log(item.getBoundingClientRect().width);
        this.$nav[i].left = item.getBoundingClientRect().left;
        this.$nav[i].right = item.getBoundingClientRect().right;
      });
      // console.log(this.$nav);
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
    if (!this.globalscroll)
      this.$nextTick(() => {
        this.globalscroll = new Scrolly(document.getElementById("app"), "main");
        // this.globalscroll.deafen();
        this.globalscroll.stop();
      });

    // mobile nav title starts with first item
    this.$emit("mobileNavTitle", this.$nav[0].title);
    this.$nextTick(() => {
      this.getComponentSizings();
    });
  }
};
</script>

<style lang="scss">
/* canvas {
  -webkit-filter: grayscale(100%);
  filter: grayscale(100%);
} */
@import "./styles/stylesheet.scss";
p {
  font-family: $suisse;
  color: $bg;
  overflow-wrap: break-word;
  // hyphens: auto;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: normal;
  color: $bg;
  overflow-wrap: break-word;
  // hyphens: auto;
  pointer-events: none;
}
#app-wrapper {
  height: 0;
}

#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
  // background: $lbg;
  background: white;

  // overflow-y: hidden;
  height: 100%;
  width: 100%;
  position: relative;
  .inner {
    display: flex;
    flex-direction: row;
    position: fixed;
    height: 100%;

    .component {
      // width: 100%;
      min-width: 100vw;
      position: relative;
      @include below($tablet) {
        > div:first-child {
          // margin-top: $top;
          // margin-top: $top;

          // height: calc(100vh - #{$top});
          // height: 100%;
          min-height: 100%;
        }
      }
    }
  }
}
</style>
