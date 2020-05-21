<template>
  <div class="scrollbar-div">
    <div class="scroll-line" ref="scrollline">
      <ul>
        <li v-for="(item, i) in menu" :key="i">
          <span>{{item.title}}</span>
        </li>
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
      sbwidth: null,
      menu: [
        {
          title: "INTRO"
        },
        {
          title: "DESIGN"
        },
        {
          title: "ILLUSTRATION"
        },
        {
          title: "ABOUT"
        },
        {
          title: "CONTACT"
        }
      ]
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
  z-index: 10;
}
.scroll-line {
  // border-top: 1px solid black;
  position: absolute;
  // bottom: 0;
  top: 0;

  // padding-bottom: 2em;
  margin-top: 1em;

  // width: 50%;
  left: 50%;
  transform: translateX(-50%);
}
.scroll-bar {
  position: absolute;
  // bottom: 0;
  bottom: 0;
  height: 3px;
  width: 60px;
  background: black;
  // margin-bottom: 2em;
  // margin-top: 1em;
  transform: translateY(50%);
  left: 0;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
  cursor: pointer;

  li {
    display: inline-block;
    padding-right: 2em;
    position: relative;
    font-size: 12px;

    &:after {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      width: 2em;
      z-index: 1;
      background: white;

      height: calc(100% + 3px);
    }
    :not(:last-child) {
      padding-right: 0;
    }
    span {
      font-family: $acuminc;
    }
  }
}
</style>
