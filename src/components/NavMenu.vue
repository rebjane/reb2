<template>
  <div class="nav">
    <div class="main-menu-wrapper">
      <div class="rebecca">
        <router-link exact to="/">
          <Reb2Logo class="logo" :fill="winresize.size.tablet ? 'white' : 'black'" />
        </router-link>
      </div>
      <div class="header" v-if="winresize.size.tablet">
        <h2>{{mblNavTitle}}</h2>
      </div>
    </div>

    <Hamburger class="hamburger link" @click.native="toggleNav" v-if="winresize.size.tablet" />
    <!-- <transition appear v-if="time.timeString && !winresize.size.tablet" name="time">
      <p class="time">{{ time.timeString }}</p>
    </transition>-->
    <!-- main menu is in this component -->

    <Scrollbar
      v-if=" !navOpen"
      class="mainnav"
      @scrollTo="handleScrollTo"
      :mblNavTitle="mblNavTitle"
    />

    <div class="socials" v-if="winresize.size.desktop">
      <ul>
        <transition v-for="(item, i) in socialmedia" :key="i" appear name="time">
          <a
            class="link"
            :target="item.link.url ? '_blank' : null"
            :href="item.link.url ? item.link.url : null"
            :style="`transition-delay: ${i * 50}ms`"
          >
            <!-- {{item.icon}} -->
            <li class="link">
              <span v-if="!item.icon">{{$cms.textField(item.label)}}</span>
              <img class="link" v-else :src="item.icon.url" />
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
// .cart {
//   position: fixed;
//   right: 0;
//   top: 0;
// }
.logo {
  pointer-events: none;
  // margin-top: 2em;
  width: 40px;

  // margin-left: 2em;
  top: 0;
  left: 0;
  position: absolute;
  @include above($tablet) {
    top: 50%;
    left: 50%;
    width: 80px;

    transform: translateY(-50%) translateX(-50%);
  }
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
.link {
  img {
    width: 20px;
    height: auto;
  }
}
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
  margin-bottom: 0.5em;
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
  // border-bottom: 1px solid white;
  @include below($tablet) {
    mix-blend-mode: difference;
  }
  position: fixed;
  // top: 50%;
  top: 0;
  // transform: translateY(-50%);
  left: 0;
  // margin-left: 2em;
  // margin-top: 1em;
  overflow: visible;
  // margin-left: 1em;
  .rebecca {
    position: relative;
    @include above($tablet) {
      background: white;
      height: 100vh;
      width: 8vw;
      min-width: 100px;
    }
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
    @include below($tablet) {
      margin: 1em 0 0 1em;
    }
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
  position: fixed;
  @include above($tablet) {
    position: absolute;
    left: 0;
    width: 8vw;
    min-width: 100px;
    a {
      width: 50%;
    }
    ul {
      display: flex;
      // flex-direction: column;
      text-align: center;
      flex-wrap: wrap;
    }
  }
  @include below($tablet) {
    mix-blend-mode: difference;

    transform: translateY(0%) translateX(-50%);
  }
  bottom: 0;
  // margin-bottom: 1.5em;
  left: 50%;

  color: black;
  white-space: nowrap;
  ul {
    list-style: none;
    padding: 0;
    // cursor: pointer;
    margin: 0;
    a {
      display: inline-block;
      // padding-top: 1.5em;
      // padding-bottom: 1.5em;
      // margin-bottom: 0;

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
      @include below($tablet) {
        li {
          padding: 1em;
        }
      }
      @include above($tablet) {
        li {
          padding: 0.5em 0;
        }
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
