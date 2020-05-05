<template>
  <div class="scrollbar-div">
    <div class="scroll" />

    <div ref="scrollbar" class="scrollbar"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Template",
  props: {
    msg: String
  },
  watch: {
    scroll: {
      handler() {
        this.$refs.scrollbar.style = `transform: translateY(${this.scrollBarPos}px)`;
      }
    }
  },
  data() {
    return {
      pos: 0,
      dir: 0,
      startPos: 0,
      barHeight: null
    };
  },
  computed: {
    ...mapState(["scroll", "scrollBarHeight", "scrollBarPos"])
  },
  methods: {
    doScroll(e) {
      var scroll = Math.min(
        Math.max(e.clientY - this.startPos, 0),
        window.innerHeight - this.barHeight
      );
      this.$refs.scrollbar.style = `transform: translateY(${scroll}px)`;
      this.$emit("scrollPos", scroll);
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
    this.barHeight = this.$refs.scrollbar.getBoundingClientRect().height;
    this.$store.commit("setScrollBarHeight", this.barHeight);
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
  height: 60px;
  width: 10px;
  border-radius: 100px;
  opacity: 0.5;
  background-color: $bg;
}
.scroll {
  position: fixed;
  right: 0;
  width: 10px;
  height: 100%;
  top: 0;
  opacity: 0.05;
  background-color: $bg;
}
.scrollbar-div {
  position: fixed;
  right: 0;
  top: 0;
  height: 100%;
}
</style>
