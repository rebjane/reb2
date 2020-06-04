<template>
  <div class="scrollbar-div">
    <div class="scroll-line" ref="scrollline">
      <ul v-if=" winresize.size.desktop">
        <transition-group appear name="in" v-for="(item, i) in menu" :key="i">
          <li :style="`transition-delay: ${i * 50}ms`" @click="doScroll(i)" :key="i">
            <span>
              <router-link to>{{item.title}}</router-link>
            </span>
          </li>
        </transition-group>
      </ul>
      <div ref="scrollbar" class="scroll-bar"></div>
    </div>
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
        this.$refs.scrollbar.style = `width: ${this.width(
          this.sbwidth,
          this.slwidth,
          e.elWidth - window.innerWidth,
          e.pos
        )}px;`;
      }
    },
    winresize() {
      this.slwidth = this.$refs.scrollline.getBoundingClientRect().width;
      this.$refs.scrollbar.style = `width: ${this.width(
        this.sbwidth,
        this.slwidth,
        this.scroll.elWidth - window.innerWidth,
        this.scroll.pos
      )}px;`;
    }
  },
  data() {
    return {
      slwidth: null,
      sbwidth: null,
      menu: this.$nav
    };
  },
  computed: {
    ...mapState(["scroll", "winresize"])
  },
  methods: {
    width(sb, sl, el, pos) {
      return ((sl - sb) / el) * pos + sb;
    },
    doScroll(i) {
      this.$emit("scrollTo", i * window.innerWidth + 1);
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
  height: 0;
  z-index: 10;
  mix-blend-mode: difference;
}

.in-enter {
  opacity: 0;
  transform: translateY(100%);
}
.in-enter-active {
  @include ease(all);
}
// span {
//   opacity: 1;
//   transform: translateY(0%);
// }
.scroll-line {
  overflow: hidden;
  // border-top: 1px solid black;
  position: absolute;
  // bottom: 0;
  top: 0;
  white-space: nowrap;
  // padding-bottom: 2em;
  margin-top: 1em;

  // width: 50%;
  left: 50%;
  transform: translateX(-50%);
  @include below($tablet) {
    width: calc(100% - 80px);
    border-bottom: 1px solid white;
  }
}
.scroll-bar {
  position: absolute;
  // bottom: 0;
  top: 50%;
  height: 1px;
  @include below($tablet) {
    height: 6px;
  }
  // width: 60px;
  width: 0;
  background: white;
  // margin-bottom: 2em;
  // margin-top: 1em;
  transform: translateY(-50%);
  left: 0;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
  color: white;

  li {
    display: inline-block;
    // cursor: pointer;
    opacity: 1;
    transform: translateY(0%);
    position: relative;
    @include mini();

    text-align: left;
    // width: 100px;
    a {
      padding: 0 2em;
    }
    span {
      font-family: $acuminc;
    }
  }
}
</style>
