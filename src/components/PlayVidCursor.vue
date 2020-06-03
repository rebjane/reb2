<template>
  <div class="playvid">
    <svg :fill="fill" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 175 175">
      <rect class="cls-1" width="175" height="175" />
      <path d="M30.74,139.39V35.61L144.26,87.5Zm5-96v88.22L132.23,87.5Z" />
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
.playvid {
  width: 150%;
}
.cls-1 {
  opacity: 0;
}
</style>
