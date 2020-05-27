<template>
  <div class="horizarrowcursor">
    <svg :stroke="fill" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24.56 42.56">
      <polyline class="cls-1" points="24.21 12.43 12.28 0.5 12.28 17.23 12.28 0.5 0.35 12.43" />
      <polyline class="cls-1" points="24.21 30.13 12.28 42.06 12.28 17.23 12.28 42.06 0.35 30.13" />
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
.horizarrowcursor {
  width: 60px;
  height: 60px;
}
</style>
