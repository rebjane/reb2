<template>
  <div class="typecursor">
    <svg :fill="fill" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 175 175">
      <path
        d="M133.5,33.29V27.63c-16.59,0-29.67,2.37-38.88,7a29.66,29.66,0,0,0-7.12,4.87,29.66,29.66,0,0,0-7.12-4.87c-9.21-4.66-22.29-7-38.88-7v5.66c31.94,0,41.36,9.27,43.17,11.51V84.49H62v5.66H84.67v40.06c-1.81,2.24-11.24,11.5-43.17,11.5v5.66c16.59,0,29.67-2.37,38.88-7a29.66,29.66,0,0,0,7.12-4.87,29.66,29.66,0,0,0,7.12,4.87c9.21,4.66,22.29,7,38.88,7v-5.66c-31.94,0-41.36-9.27-43.17-11.51v-40h23.35V84.49H90.33V44.79C92.14,42.55,101.57,33.29,133.5,33.29Z"
      />
      <rect class="cls-1" width="175" height="175" />
    </svg>
  </div>
</template>

<script>
export default {
  name: "TypeCursor",
  props: {
    fill: {
      type: String,
      default: "black",
    },
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../styles/stylesheet.scss";
.cls-1 {
  opacity: 0;
}
.typecursor {
  width: 130%;
}
</style>
