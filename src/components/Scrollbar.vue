<template>
  <div ref="scrollbar" class="scrollbar"></div>
</template>

<script>
export default {
  name: "Template",
  props: {
    msg: String
  },
  data() {
    return {
      pos: 0,
      dir: 0,
      startPos: 0
    };
  },
  methods: {
    doScroll(e) {
      var scroll = Math.min(
        Math.max(e.clientY - this.startPos, 0),
        window.innerHeight - 100
      );
      this.$refs.scrollbar.style = `transform: translateY(${scroll}px)`;
    },
    mousedown(e) {
      this.startPos = e.offsetY;
      window.addEventListener("mousemove", this.doScroll);
      window.addEventListener("mouseup", this.removeScroll);
    },
    removeScroll() {
      window.removeEventListener("mousemove", this.doScroll);
    }
  },
  mounted() {
    this.$refs.scrollbar.addEventListener("mousedown", this.mousedown);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../styles/stylesheet.scss";
.scrollbar {
  position: fixed;
  right: 0;
  top: 0;
  height: 100px;
  width: 20px;
  background-color: black;
}
</style>
