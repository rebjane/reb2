


<template>
  <div id="app" ref="appofficial">
    <div class="home-main" v-if="signatureLoaded">
      <CursorThing />
    </div>
    <Signature />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Index",

  beforeMounted() {},
  components: {},
  data() {
    return {
      time: 0
    };
  },
  computed: {
    ...mapState(["signatureLoaded", "navOpen"])
  },
  mounted() {}
};
</script>

<style lang="scss">
/* canvas {
  -webkit-filter: grayscale(100%);
  filter: grayscale(100%);
} */
@import "./styles/stylesheet.scss";
img {
  width: 100%;
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
  overflow: hidden;
  height: 100vh;
}
p {
  color: white;
  overflow: hidden;
}
p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow: hidden;
}

.intro {
  overflow: hidden;
}
</style>
