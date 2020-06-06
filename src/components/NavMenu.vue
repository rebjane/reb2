<template>
  <div class="nav">
    <div class="main-menu-wrapper">
      <div class="rebecca">
        <router-link exact to="/">
          <Reb2Logo class="logo" :fill="'white'" />
        </router-link>
      </div>
      <div class="header" v-if="winresize.size.tablet">
        <h2>{{mblNavTitle}}</h2>
      </div>
    </div>
    <Hamburger class="hamburger link" @click.native="toggleNav" v-if="winresize.size.tablet" />
    <transition appear v-if="time.timeString && !winresize.size.tablet" name="time">
      <p class="time">{{ time.timeString }}</p>
    </transition>
    <!-- main menu is in this component -->
    <Scrollbar v-if=" !navOpen" class="mainnav" @scrollTo="handleScrollTo" />
    <div class="socials" v-if="winresize.size.desktop">
      <ul>
        <transition v-for="(item, i) in socialmedia" :key="i" appear name="time">
          <a
            class="link"
            :target="item.link.url ? '_blank' : null"
            :href="item.link.url ? item.link.url : null"
            :style="`transition-delay: ${i * 50}ms`"
          >
            <li>
              <span>{{$cms.textField(item.label)}}</span>
            </li>
          </a>
        </transition>
      </ul>
    </div>
    <!-- <div v-else class="progress-bar"></div> -->
  </div>
</template>

<script>
import { mapState } from "vuex";
import Time from "../time.js";
import Reb2Logo from "./Reb2Logo";
// import Hamburger from "./Hamburger";

export default {
  watch: {},
  components: {
    Reb2Logo
    // Hamburger
  },
  name: "NavMenu",
  props: {
    data: {
      type: Object,
      default: null
    },
    mblNavTitle: String
  },
  data() {
    return {
      time: new Time(),
      socialmedia: this.$navsocials,
      header: this.$nav[0].title,
      timeLapsed: performance.now()
    };
  },
  computed: {
    ...mapState([
      "navOpen",
      "signatureLoaded",
      "scrollAllowed",
      "winresize",
      "scroll"
    ])
  },
  methods: {
    handleScrollTo(e) {
      this.$emit("scrollTo", e);
    },
    toggleNav() {
      // console.log("clicked");
      if (performance.now() > this.timeLapsed + 250) {
        this.$store.commit("setNavOpen", !this.navOpen);
        this.timeLapsed = performance.now();
      }
    }
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../styles/stylesheet.scss";
.hamburger {
  position: fixed;
  top: 0;
  width: 2em;
  right: 0;
  margin-top: 2em;
  margin-right: 2em;
  mix-blend-mode: difference;
  padding-bottom: 2em;
  padding-left: 2em;
}
.side-title {
  position: fixed;
  width: 300px;
  top: 50%;
  left: -120px;
  height: 0px;
  transform: translateY(-100%);
}
.logo {
  pointer-events: none;
  width: 50px;
  margin-top: 2em;
  margin-left: 2em;
  top: 0;
  left: 0;
  position: fixed;
}
.mainnav {
  position: fixed;
  @include above($tablet) {
    top: 0;
  }
  z-index: 10;
  mix-blend-mode: difference;
  width: 100%;
  @include below($tablet) {
    bottom: 2em;
  }
}

.menu {
  position: fixed;
  right: 0;
  width: 25px;
  top: 0;
  top: 40px;
  right: 40px;
}

.header {
  display: inline-block;
  margin-left: 1em;
  margin-top: 2em;
  transform: translateY(-50%);

  h2 {
    font-family: $acuminc;
    color: white;
    @include body();

    margin: 0;
  }
}

.bottom-text {
  position: fixed;
  // color: white;
  color: black;
  bottom: 0;
  margin-bottom: 2em;
  left: 50%;
  transform: translateX(-50%);
}
// * {
//   background-blend-mode: difference;
// }
.line {
  position: fixed;
  z-index: 2;
  top: 50%;
  transform: translateY(-50%);
  right: 0;
  margin-right: 3em;
  max-height: 200px;
  margin-bottom: 2em;
  height: 200px;
  border-right: 1px solid white;
}
.line-enter-active {
  @include ease(max-height);
}
.line-enter {
  max-height: 0px;
}

.time {
  position: fixed;
  mix-blend-mode: difference;

  // top: 50%;
  // transform: translateY(-50%);
  // right: 0;
  left: 0;
  bottom: 0%;
  z-index: 2;
  opacity: 1;
  margin-left: 2em;
  margin-bottom: 1em;
  // transform: translateX(-50%);

  // color: white;
  color: white;

  // writing-mode: vertical-lr;
  @include mini();
}
.time-enter-active {
  @include ease(all);
}
.time-enter {
  opacity: 0;
  transform: translateY(100%);
}
.bottom-enter {
  opacity: 0;
  transform: translateX(-50%) translateY(100%);
}
.bottom-enter-active {
  @include ease(all);
}
p {
  // color: white;
  color: white;

  overflow: hidden;
  @include body();
}
.main-menu-wrapper {
  mix-blend-mode: difference;
  // border-bottom: 1px solid white;
  position: fixed;
  // top: 50%;
  top: 0;
  // transform: translateY(-50%);
  left: 0;
  margin-left: 2em;
  margin-top: 1em;
  overflow: visible;
  margin-left: 1em;
  .rebecca {
    position: relative;
    a {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }
    text-align: center;
    font-family: $suisse;
    // color: white;
    color: white;

    @include mini();

    // margin-left: 3em;
    width: 6em;
    height: 6em;

    float: left;
  }
  .main-menu {
    // transform: rotate(-180deg);
    // transform-origin: center;
    // writing-mode: vertical-lr;

    // left: 20%;
    margin: auto;
    margin-left: 1em;
    display: inline-block;

    span {
      font-family: $acumin;
      // color: white;
      color: white;

      // padding-bottom: 2em;
      padding-right: 2em;
      @include body();

      // cursor: pointer;
      // &:last-child {
      //   padding-bottom: 1em;
      // }
    }
    // span:last-child {
    //   padding-left: 4em;
    //   color: #494949;
    // }
  }
}
.socials {
  mix-blend-mode: difference;

  position: fixed;
  bottom: 0;
  // margin-bottom: 1.5em;
  left: 50%;
  transform: translateY(50%) translateX(-50%);
  color: white;
  ul {
    list-style: none;
    padding: 0;
    // cursor: pointer;
    margin: 0;
    a {
      display: inline-block;
      padding-top: 1.5em;
      padding-bottom: 1.5em;
      margin-bottom: 4em;

      position: relative;
      @include mini();

      // &:after {
      //   content: "";
      //   position: absolute;
      //   top: 0;
      //   right: 0;
      //   width: 2em;
      //   z-index: 4;
      //   background: white;

      //   height: calc(100% + 3px);
      // }
      li {
        padding: 0 2em;
      }
      :not(:last-child) {
        padding-right: 0;
      }
      span {
        font-family: $acuminc;
      }
    }
  }
}
</style>
