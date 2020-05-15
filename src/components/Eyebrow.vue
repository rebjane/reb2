<template>
  <div class="eyebrow">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 71 35.5">
      <path class="cls-1" d="M71,35.5H68a32.5,32.5,0,0,0-65,0H0a35.5,35.5,0,0,1,71,0Z" />
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
