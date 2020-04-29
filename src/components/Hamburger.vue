<template>
  <div class="hamburger">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 98 33">
      <rect class="cls-1" width="74" height="3" />
      <rect class="cls-1" x="24" y="30" width="74" height="3" />
    </svg>
  </div>
</template>

<script>
export default {
  name: "Template",
  props: {
    msg: String
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
svg {
  fill: white;
}
.hamburger {
  cursor: pointer;
}
</style>
