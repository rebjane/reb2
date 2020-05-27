<template>
  <div class="arrowcursor">
    <svg :stroke="fill" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.13 32.13">
      <polyline class="cls-1" points="6.29 0.5 31.63 0.5 0.5 31.63 31.63 0.5 31.63 25.84" />
    </svg>
  </div>
</template>

<script>
export default {
  name: "Template",
  props: {
    fill: {
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
</style>
