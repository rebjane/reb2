<template>
  <div class="full-screen-image">
    <div class="full-image"></div>
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
</style>
