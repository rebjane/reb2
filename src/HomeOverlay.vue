<template>
  <div class="intro">
    <div class="wrap" ref="wrap">
      <Smiley :fill="'black'" class="smiley" />

      <transition-group
        tag="div"
        class="intro-title"
        v-for="(item, i) in data.items"
        :key="i"
        :style="`display: ${item.break_to_next_line ? 'table' : 'inline-block'};`"
      >
        <span :key="i+''" v-if="item.reb_logo_before_this">
          <transition appear name="logo">
            <Reb2Logo :fill="'black'" class="logo" />
          </transition>
        </span>
        <component
          :is="`${$tag(item.string[0].type)}`"
          :key="`${i}c`"
          :ref="`${$cms.textField(item.ref_name)}`"
        />
      </transition-group>
    </div>
  </div>
</template>

<script>
import WaveText from "./wavetext.js";

export default {
  name: "HomeOverlay",
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  data() {
    var intro;
    return {
      intro,
      opts: []
    };
  },
  methods: {},
  mounted() {
    new Promise(res => {
      this.data.items.forEach(async item => {
        this.opts.push({
          string: this.$cms.textField(item.string),
          tag: this.$tag(item.string[0].type),
          refName: this.$cms.textField(item.ref_name),
          el: this.$refs[this.$cms.textField(item.ref_name)][0],
          delay: item.delay,
          logo_before: item.reb_logo_before_this
        });
      });
      res(this.opts);
    }).then(() => this.$nextTick(() => new WaveText(this.opts)));

    setTimeout(() => {
      // this.$emit("canScroll", true);
      this.$store.commit("allowScroll", true);
    }, this.opts[this.opts.length - 1].delay + 1000);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "./styles/stylesheet.scss";
.smiley {
  width: 4em;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}
.underline {
  position: absolute;
  left: 0;
  bottom: -2px;
  height: 2px;
  background: white;
  width: 100%;
}
.logo {
  @include ease(all);
  opacity: 1;
  transform: translateY(0%);
  transition-delay: 400ms;
}

.logo-enter {
  opacity: 0;
  transform: translateY(50%);
}

h1 {
  font-size: 80px;
  position: relative;
  margin: 0;
  margin-bottom: 0;
  display: inline-block;
  // @include outline($bg);
  font-family: $suisse;
}
.designer {
  // margin-top: 40px;
}
span {
  // opacity: 0;
}
.intro {
  height: 100vh;
  // @include waveLink(white);
  position: relative;
  @include waveLink(#161616);
}

.bg-enter-active {
  opacity: 0;
}
.wrap {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 100%;
}
.logo {
  width: 150px;
  display: inline-block;
  margin: 1em 0em 1em 2em;
  height: auto;
  mix-blend-mode: difference;
}
span {
  overflow: visible;
}
.intro-title {
  display: inline-block;
  margin: auto;
}
</style>
