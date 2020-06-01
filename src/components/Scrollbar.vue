<template>
  <div class="scrollbar-div">
    <div class="scroll-line" ref="scrollline">
      <ul>
        <li v-for="(item, i) in menu" :key="i" @click="$emit('scrollTo', i * ww)">
          <span>
            <router-link to>{{item.title}}</router-link>
          </span>
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
          e.elWidth - this.ww,
          e.pos
        )}px;`;
      }
    }
  },
  data() {
    return {
      slwidth: null,
      sbwidth: null,
      ww: window.innerWidth,
      menu: this.$nav
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
  // height: 100vh;
  height: 0;
  // position: relative;
  // pointer-events: none;
  z-index: 10;
  mix-blend-mode: difference;
}
.scroll-line {
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
}
.scroll-bar {
  position: absolute;
  // bottom: 0;
  top: 50%;
  height: 1px;
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

    position: relative;
    font-size: 12px;
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
