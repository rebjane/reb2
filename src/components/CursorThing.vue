<template>
  <div v-show="!outOfBounds" class="cursor" ref="cursor">
    <component :fill="`white`" :is="curComponent" />
  </div>
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
      outOfBounds: false,
      curComponent: "ArrowCursor",
      topRightStyle: "top: 0; left: -80px;",
      centerStyle: "top: -40px; left: -40px;"
    };
  },
  methods: {
    cursorType(targ) {
      if (targ.includes("link")) {
        this.curComponent = "CircleCursor";
        this.$refs.cursor.style = this.centerStyle;
      } else if (targ.includes("carousel")) {
        this.curComponent = "VertArrowCursor";
        this.$refs.cursor.style = this.centerStyle;
      } else {
        this.curComponent = "ArrowCursor";
        this.$refs.cursor.style = this.topRightStyle;
      }
    },
    cursorMove() {
      window.addEventListener("mousemove", e => {
        e.stopPropagation();
        this.cursorType(e.target.className);
        // console.log(e.target.className);
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
  width: 80px;
  height: 80px;
  // border: 1px solid white;
  mix-blend-mode: difference;

  pointer-events: none;
  border-radius: 500px;
  position: fixed;
  z-index: 10;
}
</style>
