<template>
  <div class="cursor" v-show="!outOfBounds" ref="cursor"></div>
</template>

<script>
import { TimelineMax, Power4 } from "gsap";

export default {
  name: "Template",
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      timeline: new TimelineMax(),
      outOfBounds: false
    };
  },
  methods: {
    cursorMove() {
      window.addEventListener("mousemove", e => {
        if (
          e.clientX <= 10 ||
          e.clientX >= window.innerWidth - 10 ||
          e.clientY <= 10 ||
          e.clientY >= window.innerHeight - 10
        ) {
          this.outOfBounds = true;
        } else {
          this.outOfBounds = false;
        }

        this.timeline.to(this.$refs.cursor, 0.008, {
          css: {
            x: e.clientX,
            y: e.clientY
          },
          ease: Power4.easeOut
        });

        // this.$refs.cursor.style = `transform: translate3d(${e.clientX}px, ${e.clientY}px, 0px);`;
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
  width: 100px;
  height: 100px;
  // background: white;
  border: 1px solid white;
  mix-blend-mode: difference;
  // opacity: 0.2;
  -webkit-filter: grayscale(100%);
  filter: grayscale(100%);
  // background-blend-mode: screen;
  pointer-events: none;
  border-radius: 500px;
  position: fixed;
  z-index: 10;
  top: -50px;
  left: -50px;
}
</style>
