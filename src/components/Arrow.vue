<template>
  <div class="arrow">
    <svg :fill="fill" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 77.6 35.16">
      <path
        d="M56.4,35.16A.5.5,0,0,1,56,35a.51.51,0,0,1,.07-.71L75.71,18.08H.5a.5.5,0,0,1,0-1H75.71L56.08.89a.5.5,0,0,1,.63-.78L77.42,17.19l.06.06h0s0,0,0,0h0l0,.08h0a.45.45,0,0,1,0,.16h0a.78.78,0,0,1,0,.14l0,.09h0a.76.76,0,0,1-.11.14L56.71,35.05A.51.51,0,0,1,56.4,35.16Z"
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
.arrow {
  @include below($tablet) {
    width: 2em;
  }
  @include above($tablet) {
    width: 4em;
  }
}
</style>
