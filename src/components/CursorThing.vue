<template>
  <div class="cursor" ref="cursor"></div>
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
  methods: {
    cursorMove() {
      window.addEventListener("mousemove", e => {
        this.$refs.cursor.style = `transform: translate3d(${e.clientX}px, ${e.clientY}px, 0px);`;
      });
    }
  },
  mounted() {
    this.cursorMove();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.cursor {
  width: 200px;
  height: 200px;
  // background: white;
  border: 1px solid white;
  // opacity: 0.2;
  -webkit-filter: grayscale(100%);
  filter: grayscale(100%);
  // background-blend-mode: screen;
  pointer-events: none;
  border-radius: 500px;
  position: fixed;
  z-index: 10;
  top: -100px;
  left: -100px;
}
</style>
