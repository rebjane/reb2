<template>
  <div class="nav">
    <div class="main-menu-wrapper">
      <p class="rebecca">
        <router-link exact to="/">
          <Reb2Logo :fill="'black'" />
        </router-link>
      </p>
    </div>
    <transition appear v-if="time.timeString" name="time">
      <p class="time">{{ time.timeString }}</p>
    </transition>
    <!-- main menu is in this component -->
    <Scrollbar v-if=" !navOpen" />
    <div class="socials">
      <ul>
        <li v-for="(item, i) in socialmedia" :key="i">
          <span>{{item.title}}</span>
        </li>
      </ul>
    </div>
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
    }
  },
  data() {
    return {
      time: new Time(),
      socialmedia: [
        {
          title: "instagram",
          link: ""
        },
        {
          title: "behance",
          link: ""
        },
        {
          title: "creative market",
          link: ""
        }
      ]
    };
  },
  computed: {
    ...mapState(["navOpen", "signatureLoaded"])
  },
  methods: {
    toggleNav() {
      this.$store.commit("setNavOpen", true);
    }
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../styles/stylesheet.scss";
.side-title {
  position: fixed;
  width: 300px;
  top: 50%;
  left: -120px;
  height: 0px;
  transform: translateY(-100%);
}
.logo {
  width: 50px;
  margin-top: 20px;
  margin-left: 20px;
  top: 0;
  left: 0;
  position: fixed;
}
.nav {
  top: 0;
  left: 0;
  // position: fixed;
  z-index: 1;
  overflow: visible;
  height: 0%;
  width: 100%;
  // mix-blend-mode: difference;
}
.menu {
  position: fixed;
  right: 0;
  width: 25px;
  top: 0;
  top: 40px;
  right: 40px;
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
  // top: 50%;
  // transform: translateY(-50%);
  // right: 0;
  left: 0;
  bottom: 0%;
  z-index: 2;
  opacity: 1;
  margin-left: 3em;
  margin-bottom: 2em;
  // transform: translateX(-50%);

  // color: white;
  color: black;

  // writing-mode: vertical-lr;
  font-size: 14px;
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
  color: black;

  overflow: hidden;
  font-size: 18px;
}
.main-menu-wrapper {
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
    text-align: center;
    font-family: $suisse;
    // color: white;
    color: black;

    font-size: 12px;
    margin-left: 3em;
    width: 6em;
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
      color: black;

      // padding-bottom: 2em;
      padding-right: 2em;
      font-size: 18px;
      cursor: pointer;
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
  bottom: 0;
  left: 25%;
  margin-bottom: 2em;
  transform: translateY(50%);
  ul {
    list-style: none;
    padding: 0;
    cursor: pointer;

    li {
      display: inline-block;
      padding-right: 2em;
      position: relative;
      font-size: 14px;
      &:after {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        width: 2em;
        z-index: 4;
        background: white;

        height: calc(100% + 3px);
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
