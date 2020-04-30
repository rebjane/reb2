<template>
  <div class="nav-screen">
    <div class="nav" v-if="navOpen">
      <div class="back">
        <h3 ref="back" @click="toggleNav">
          <transition appear name="wavelink">
            <a class="wave-link" />
          </transition>
        </h3>
      </div>

      <div class="main">
        <transition appear name="line">
          <div :class="`sep ${lineLeaveStyle}`" />
        </transition>

        <h2 ref="work">
          <transition appear name="wavelink">
            <a class="wave-link" />
          </transition>
          <p class="sup">1</p>
        </h2>

        <br />

        <h2 ref="about">
          <transition appear name="wavelink">
            <a class="wave-link" />
          </transition>

          <p class="sup">2</p>
        </h2>
        <br />
        <h2 ref="contact">
          <transition appear name="wavelink">
            <a class="wave-link" />
          </transition>
          <p class="sup">3</p>
        </h2>
      </div>
      <div class="socials">
        <h3 ref="creativemarket">
          <transition appear name="wavelink">
            <a class="wave-link" />
          </transition>
        </h3>
        <br />
        <h3 ref="behance">
          <transition appear name="wavelink">
            <a class="wave-link" />
          </transition>
        </h3>
        <br />

        <h3 ref="dribbble">
          <transition appear name="wavelink">
            <a class="wave-link" />
          </transition>
        </h3>
        <br />

        <h3 ref="instagram">
          <transition appear name="wavelink">
            <a class="wave-link" />
          </transition>
        </h3>
      </div>
    </div>
  </div>
</template>

<script>
import WaveText from "../wavetext.js";
import { mapState } from "vuex";

export default {
  name: "Template",
  // watch: {
  //   navOpen: {
  //     handler(e) {
  //       if (e) {
  //       }
  //     }
  //   }
  // },
  props: {
    msg: String
  },
  data() {
    return {
      opts: null,
      lineLeaveStyle: ""
    };
  },
  computed: {
    ...mapState(["navOpen"])
  },
  methods: {
    toggleNav() {
      new WaveText(this.opts, "exit");
      this.lineLeaveStyle = "line-leave-to line-leave-active";
      setTimeout(() => {
        this.$store.commit("setNavOpen", false);
      }, 1500);
    }
  },
  mounted() {
    this.opts = [
      {
        string: "WORK", //designer.
        el: this.$refs.work,
        delay: 200
      },
      {
        string: "ABOUT", //illustrator.
        el: this.$refs.about,
        delay: 300
      },
      {
        string: "CONTACT", //popcorn lover.
        el: this.$refs.contact,
        delay: 400
      },
      {
        string: "creative market", //popcorn lover.
        el: this.$refs.creativemarket,
        delay: 500
      },
      {
        string: "behance", //popcorn lover.
        el: this.$refs.behance,
        delay: 600
      },
      {
        string: "dribbble", //popcorn lover.
        el: this.$refs.dribbble,
        delay: 700
      },
      {
        string: "instagram", //popcorn lover.
        el: this.$refs.instagram,
        delay: 800
      },
      {
        string: "back", //popcorn lover.
        el: this.$refs.back,
        delay: 900
      }
    ];
    new WaveText(this.opts, "enter");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../styles/stylesheet.scss";

.nav-screen {
  position: fixed;
  //   background: $light;
  top: 0;
  width: 100%;
  height: 0%;
  z-index: 1000;
  @include waveLink(black);
}

.back {
  position: fixed;
  right: 0;
  margin-right: 3em;
  margin-top: 3em;
  h3 {
    font-family: $suisse;
    font-size: 60px;
    font-weight: bold;
    font-style: italic;
    color: black;
    margin: 0;
  }
}

.sup {
  position: absolute;
  right: -1em;
  top: -1em;
  color: black;
  margin: 0;
  font-size: 14px;
}
.main {
  position: fixed;
  bottom: 0;
  left: 0;
  width: calc(50% - 3em);
  text-align: right;
}
h2 {
  color: black;
  overflow: visible;
  font-size: 60px;
  font-family: $acumin;
  position: relative;
  display: inline-block;
  margin: 0;
  margin-bottom: 0.5em;
}
.socials {
  position: fixed;
  right: 0;
  bottom: 0;
  width: 50%;
  margin-right: 3em;
  text-align: right;

  h3 {
    font-size: 20px;
    font-family: $suisse;
    color: black;
    display: inline-block;
    position: relative;
    font-weight: bold;
    font-style: italic;
    margin: 0;
    margin-bottom: 1em;
  }
}
.sep {
  left: 50%;
  max-height: 200px;
  bottom: 0;
  margin-bottom: 2em;
  width: 1px;
  height: 50%;
  border-right: 1px solid #979797;
  position: fixed;
}
.line-enter-active,
.line-leave-active {
  @include ease(max-height);
}
.line-enter,
.line-leave-to {
  max-height: 0px;
}
</style>
