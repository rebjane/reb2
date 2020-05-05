<template>
  <div ref="about" class="about">
    <div class="col col-1">
      <img style="opacity: 0; position: absolute;" :src="reb" />
      <RippleImage :img="reb" :resize="resizeObj" />
    </div>
    <div class="col col-2">
      <p>My name’s Rebecca and I’m a:</p>
      <h3>Designer</h3>
      <h3>Illustrator</h3>
      <h3>Popcorn Lover</h3>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Template",
  components: {},
  props: {
    msg: String
  },
  data() {
    return {
      reb: require("./assets/reb.jpg"),
      resizeObj: {
        canvasWidth: 450,
        canvasHeight: 600,
        scale: 1,
        imgWidth: 450,
        imgHeight: 600,
        canvasLeft: 0,
        canvasTop: 0
      }
    };
  },
  beforeDestroy() {},
  computed: {
    ...mapState(["signatureLoaded", "loadPct", "loaded", "navOpen"])
  },
  methods: {},
  mounted() {}
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
  margin-bottom: 2em;
}
h3 {
  font-family: $acumin;
  font-size: 40px;
  margin: 0.5em;
  font-style: italic;
}
.col {
  width: 30%;
  display: inline-block;
}
.col-1 {
  float: left;
}
</style>
