<template>
  <div ref="about" class="about">
    <div class="col col-1">
      <RippleImage v-if="reb" :img="reb" :resize="resizeObj" />
    </div>
    <div class="col col-2">
      <div class="horiz-line" />
      <p>My name’s Rebecca and I’m a:</p>
      <h3 ref="des"></h3>
      <h3 ref="ill"></h3>
      <h3 ref="pop"></h3>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import WaveText from "./wavetext.js";

export default {
  name: "Template",
  watch: {
    scroll: {
      handler(e) {
        if (e >= this.refTop && !this.waveText) {
          let opts = [
            {
              string: "Designer", //Welcome to the creative archives of Rebecca Jane.
              el: this.$refs.des,
              delay: 0
            },
            {
              string: "Illustrator", //designer.
              el: this.$refs.ill,
              delay: 500,
              link: true
            },
            {
              string: "Popcorn Lover", //Welcome to the creative archives of Rebecca Jane.
              el: this.$refs.pop,
              delay: 750
            }
          ];
          new WaveText(opts);
          this.waveText = true;
        }
      }
    }
  },
  components: {},
  props: {
    msg: String
  },
  data() {
    return {
      reb: require("./assets/reb.jpg"),
      resizeObj: {
        canvasWidth: this.$aboutImg.width,
        canvasHeight: this.$aboutImg.height,
        scale: 1,
        imgWidth: this.$aboutImg.width,
        imgHeight: this.$aboutImg.height,
        canvasLeft: 0,
        canvasTop: 0
      },
      refTop: null,
      waveText: false
    };
  },
  beforeDestroy() {},
  computed: {
    ...mapState(["signatureLoaded", "loadPct", "loaded", "navOpen", "scroll"])
  },
  methods: {
    async loadImg() {
      var img = new Image();
      img.src = this.reb;

      // await img.onload(e => {
      //   // var height = e.height;
      //   // var width = e.width;
      // });
    }
  },
  mounted() {
    this.refTop =
      this.$refs.about.getBoundingClientRect().top - window.innerHeight / 2;
    console.log(this.$aboutImg);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "./styles/stylesheet.scss";
.about {
  display: block;
  position: relative;
  height: 100vh;
  // height: 100%;
}
p {
  color: $bg;
  margin-bottom: 4em;
  margin-top: 6em;
}
h3 {
  font-family: $acumin;
  font-size: 60px;
  margin: 0.5em 0;
  font-style: italic;
}
.col {
  width: 50%;
  display: inline-block;
  text-align: left;
  position: relative;
}
.horiz-line {
  width: 100%;
  border-top: 1px solid $bg;
  height: 1px;
}
.col-1 {
  float: left;
}
</style>
