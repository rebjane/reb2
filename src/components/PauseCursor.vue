<template>
  <div class="pausecursor">
    <svg :fill="fill" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 175 175">
      <rect class="cls-1" width="175" height="175" />
      <path d="M65.24,40.71v93.58H51.5V40.71H65.24m5-5H46.5V139.29H70.24V35.71Z" />
      <path d="M123.5,40.71v93.58H109.76V40.71H123.5m5-5H104.76V139.29H128.5V35.71Z" />
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
.pausecursor {
  width: 150%;
}
.cls-1 {
  opacity: 0;
}
</style>
