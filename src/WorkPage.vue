<template>
  <div class="workpage">
    <SlidingText text="work" />
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
@import "./styles/stylesheet.scss";
.workpage {
  height: 100%;
}
p {
  color: white;
}
</style>
