<template>
  <div ref="about" class="about">
    <div ref="imgCol" :style="`height: ${newHeight}px;`" class="col col-1">
      <RippleImage
        :style="`transform: translateY(${parallaxTransform}px);`"
        v-if="reb"
        :img="reb"
        :resize="resizeObj"
      />
    </div>
    <div class="col col-2">
      <div class="horiz-line" />
      <p>My name’s Rebecca and I’m a:</p>
      <h3 ref="des">
        <router-link exact to="/work" class="wave-link" />
      </h3>
      <br />
      <h3 ref="ill">
        <router-link exact to="/work" class="wave-link" />
      </h3>
      <br />

      <h3 ref="pop">
        <router-link exact to="/work" class="wave-link" />
      </h3>
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
        this.transform();
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
        canvasWidth: this.getSize(this.$aboutImg.width, this.$aboutImg.height)
          .width,
        canvasHeight: this.getSize(this.$aboutImg.width, this.$aboutImg.height)
          .height,
        scale: 1,
        imgWidth: this.getSize(this.$aboutImg.width, this.$aboutImg.height)
          .width,
        imgHeight: this.getSize(this.$aboutImg.width, this.$aboutImg.height)
          .height,
        canvasLeft: 0,
        canvasTop: 0,
        midPos: null
      },
      refTop: null,
      waveText: false,
      newHeight: this.getSize(this.$aboutImg.width, this.$aboutImg.height)
        .height,
      parallaxTransform: 0
    };
  },
  beforeDestroy() {},
  computed: {
    ...mapState(["signatureLoaded", "loadPct", "loaded", "navOpen", "scroll"])
  },
  methods: {
    getMidPos() {
      var top = this.$refs.imgCol.getBoundingClientRect().top;
      var height = this.$refs.imgCol.getBoundingClientRect().height;
      this.midPos = Math.abs((window.innerHeight - height) / 2 - top);
    },
    transform() {
      this.parallaxTransform = this.parallax(this.midPos, this.scroll);
    },
    parallax(midPos, scrollPos) {
      return (midPos - scrollPos) * 0.7;
    },
    getSize(width, height) {
      var colWidth = Math.min(window.innerWidth / 2, 400); //that hundred value's sorta random for now
      var newHeight = (colWidth / width) * height;
      var newWidth = colWidth;
      return {
        width: newWidth,
        height: newHeight
      };
    }
  },
  mounted() {
    this.refTop =
      this.$refs.about.getBoundingClientRect().top - window.innerHeight / 2;
    this.$nextTick(() => {
      this.getMidPos();
    });
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
  margin: 0 $pad;
}
p {
  color: $bg;
  margin-bottom: 4em;
  margin-top: 6em;
}
h3 {
  font-family: $acumin;
  font-size: 60px;
  margin: 0.25em 0;
  font-style: italic;
  position: relative;
  @include waveLink($bg);
  display: inline-block;
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
