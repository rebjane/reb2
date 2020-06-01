<template>
  <div class="head-text">
    <h2
      v-if="title && winresize.size.desktop"
      :style="`color: ${color}; border-bottom: 1px solid ${color};`"
    >{{title}}</h2>
    <p v-if="body" :style="`color: ${color};`">{{body}}</p>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "HeadText",
  props: {
    title: {
      type: String,
      default: null
    },
    body: {
      type: String,
      default: null
    },
    color: {
      type: String,
      default: "black"
    }
  },
  computed: {
    ...mapState(["winresize"])
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../styles/stylesheet.scss";
.head-text {
  // margin-top: 10%;
  @include above($tablet) {
    // top: 50%;
    // transform: translateY(-50%);
    // margin-left: 3em;
    // position: absolute;
    // text-align: left;
    // // max-width: 20%;
    // width: 300px;
    // // border-right: 1px solid $bg;
    // padding-right: 2em;
    // z-index: 4;
    width: 30%;
    display: inline-block;
    vertical-align: top;
    margin-top: 50vh;
    transform: translateY(-50%);
    text-align: left;
  }
  @include below($tablet) {
    text-align: left;
    @include padding();
  }
  h2 {
    font-size: 50px;
    // border-bottom: 1px solid $bg;
    margin: 0;
    font-family: $acumin;
  }
  .desc {
    margin-bottom: 3em;
  }
  pointer-events: none;
}
</style>
