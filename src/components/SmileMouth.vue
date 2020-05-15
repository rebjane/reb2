<template>
  <div class="mouth">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 136 68">
      <path class="cls-1" d="M136,0A68,68,0,0,1,0,0Z" />
    </svg>
  </div>
</template>

<script>
export default {
  name: "Template",
  props: {
    data: {
      type: Object,
      default: null
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
svg {
  fill: white;
}
</style>
