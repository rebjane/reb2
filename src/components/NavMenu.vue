<template>
  <div class="nav">
    <Reb2Logo class="logo" />
    <Hamburger class="menu" />
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
.logo {
  width: 50px;
  margin-top: 20px;
  margin-left: 20px;
  top: 0;
  left: 0;
  position: fixed;
}
.nav {
  top: 0;
  left: 0;
  position: fixed;
  z-index: 5;

  height: 0%;
  width: 100%;
}
.menu {
  position: fixed;
  right: 0;
  width: 25px;
  top: 0;
  top: 40px;
  right: 40px;
}
</style>
