<template>
  <div class="circlecursor">
    <svg :stroke="fill" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36.67 36.67">
      <circle class="cls-1" cx="18.34" cy="18.34" r="17.84" />
    </svg>
  </div>
</template>

<script>
export default {
  name: "Template",
  props: {
    fill: {
      type: String,
      default: "white"
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
