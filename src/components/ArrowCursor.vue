<template>
  <div class="arrowcursor">
    <svg :fill="fill" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 175 175">
      <rect class="cls-1" width="175" height="175" />
      <polygon
        points="139.62 111.62 134.62 111.62 134.62 40.69 57.82 40.69 57.82 35.69 139.62 35.69 139.62 111.62"
      />
      <rect
        x="16.54"
        y="85.29"
        width="140.71"
        height="5"
        transform="translate(-36.62 87.16) rotate(-45)"
      />
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
.arrowcursor {
  width: 150%;
}
.cls-1 {
  opacity: 0;
}
</style>
