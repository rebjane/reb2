<template>
  <div class="nav">
    <Reb2Logo class="logo" />
    <Hamburger class="menu" @click.native="toggleNav" />
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "NavMenu",
  props: {
    msg: String
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(["navOpen"])
  },
  methods: {
    toggleNav() {
      this.$store.commit("setNavOpen", true);
    }
  },
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
  z-index: 1;

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
