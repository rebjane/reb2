<template>
  <div class="nav-screen">
    <div class="nav" v-if="navOpen">
      <div class="back">
        <h3 ref="back" @click="toggleNav">
          <a class="wave-link" />
        </h3>
      </div>

      <div class="main">
        <h2 ref="work">
          <a class="wave-link" />
          <p class="sup">1</p>
        </h2>
        <br />

        <h2 ref="about">
          <a class="wave-link" />
          <p class="sup">2</p>
        </h2>
        <br />
        <h2 ref="contact">
          <a class="wave-link" />
          <p class="sup">3</p>
        </h2>
      </div>
      <div class="socials">
        <h3 ref="creativemarket">
          <a class="wave-link" />
        </h3>
        <br />
        <h3 ref="behance">
          <a class="wave-link" />
        </h3>
        <br />

        <h3 ref="dribbble">
          <a class="wave-link" />
        </h3>
        <br />

        <h3 ref="instagram">
          <a class="wave-link" />
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
      opts: null
    };
  },
  computed: {
    ...mapState(["navOpen"])
  },
  methods: {
    toggleNav() {
      this.$store.commit("setNavOpen", false);
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
        delay: 600
      },
      {
        string: "behance", //popcorn lover.
        el: this.$refs.behance,
        delay: 700
      },
      {
        string: "dribbble", //popcorn lover.
        el: this.$refs.dribbble,
        delay: 800
      },
      {
        string: "instagram", //popcorn lover.
        el: this.$refs.instagram,
        delay: 900
      },
      {
        string: "back", //popcorn lover.
        el: this.$refs.back,
        delay: 1000
      }
    ];
    new WaveText(this.opts);
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
</style>
