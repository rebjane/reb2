<template>
  <div class="hamburger">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 98 33">
      <rect class="cls-1" width="74" height="3" ref="top" />
      <rect class="cls-1" x="24" y="30" width="74" height="3" ref="bottom" />
    </svg>
  </div>
</template>

<script>
import { TimelineMax } from "gsap";
import { mapState } from "vuex";

export default {
  name: "Template",
  watch: {
    navOpen: {
      handler(open) {
        this.animate(open);
      }
    }
  },
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      timeline: new TimelineMax({ paused: true }),
      timeline1: new TimelineMax({ paused: true })
    };
  },
  computed: {
    ...mapState(["navOpen"])
  },
  methods: {
    animate(open) {
      this.timeline.to(this.$refs.top, 0.25, {
        x: this.$refs.top.getBoundingClientRect().width / 2,
        y: -11,
        transform: "rotate(45deg)"
      });
      this.timeline.to(
        this.$refs.bottom,
        0.25,
        {
          x: -this.$refs.bottom.getBoundingClientRect().width / 2,
          y: 11,
          transform: "rotate(-45deg)"
        },
        "-=.25"
      );

      if (open) {
        this.timeline.play();
      } else {
        this.timeline.reverse(0.25);
      }
      setTimeout(() => {
        this.timeline.pause();
        this.timeline1.pause();
      }, 300);
    }
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
svg {
  fill: white;
  overflow: visible;
}
// .hamburger {
//   // cursor: pointer;
// }
</style>
