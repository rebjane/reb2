<template>
  <div class="scrollbar-div">
    <div class="scroll-line" ref="scrollline" />

    <div ref="scrollbar" class="scroll-bar"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Scrollbar",
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  watch: {
    scroll: {
      handler(e) {
        // console.log(e);
        this.$refs.scrollbar.style = `width: ${this.width(
          this.sbwidth,
          this.slwidth,
          e.elWidth,
          e.pos
        )}px;`;
      }
    }
  },
  data() {
    return {
      slwidth: null,
      sbwidth: null
    };
  },
  computed: {
    ...mapState(["scroll"])
  },
  methods: {
    width(sb, sl, el, pos) {
      return ((sl - sb) / el) * pos + sb;
    }
  },
  mounted() {
    this.slwidth = this.$refs.scrollline.getBoundingClientRect().width;
    this.sbwidth = this.$refs.scrollbar.getBoundingClientRect().width;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../styles/stylesheet.scss";
.scrollbar-div {
  height: 100vh;
  position: relative;
  pointer-events: none;
}
.scroll-line {
  border-top: 1px solid black;
  position: absolute;
  bottom: 0;
  padding-bottom: 2em;
  width: 50%;
  left: 25%;
}
.scroll-bar {
  position: absolute;
  bottom: 0;
  height: 10px;
  width: 60px;
  background: black;
  margin-bottom: 2em;
  transform: translateY(50%);
  left: 25%;
}
</style>
