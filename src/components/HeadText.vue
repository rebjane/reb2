<template>
  <div class="head-text">
    <h2 v-if="title" :style="`color: ${color}; border-bottom: 1px solid ${color};`">{{title}}</h2>
    <p v-if="body" :style="`color: ${color};`">{{body}}</p>
  </div>
</template>

<script>
export default {
  name: "Template",
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
  top: 50%;
  transform: translateY(-50%);
  margin-left: 3em;
  position: fixed;
  text-align: left;
  // max-width: 20%;
  width: 300px;
  // border-right: 1px solid $bg;
  padding-right: 2em;
  z-index: 4;
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
