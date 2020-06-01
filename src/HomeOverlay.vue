<template>
  <div class="intro">
    <div class="wrap" ref="wrap">
      <!-- <Smiley :fill="'black'" class="smiley" /> -->

      <transition-group tag="div" class="intro-title" v-for="(item, i) in data.items" :key="i">
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
    <!-- <p class="scroll-cta" :ref="$cms.textField(this.data.primary.scroll_cta_ref)"></p> -->
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
    //accounts for any route change (resets to false so it doesn't initialize scroll before when it should)
    this.$store.commit("allowScroll", false);
    // console.log(this.data);
    new Promise(res => {
      this.data.items.forEach(async item => {
        this.opts.push({
          string: this.$cms.textField(item.string),
          tag: this.$tag(item.string[0].type),
          refName: this.$cms.textField(item.ref_name),
          el: this.$refs[this.$cms.textField(item.ref_name)][0],
          delay: item.delay,
          logo_before: item.reb_logo_before_this,
          bold_start: item.string[0].spans.length
            ? item.string[0].spans[0].start
            : 0,
          bold_end: item.string[0].spans.length
            ? item.string[0].spans[0].end
            : 0
        });
      });
      //scroll cta
      // if (this.data.primary) {
      //   this.opts.push({
      //     string: this.$cms.textField(this.data.primary.scroll_cta_string),
      //     tag: "p",
      //     refName: this.$cms.textField(this.data.primary.scroll_cta_ref),
      //     el: this.$refs[this.$cms.textField(this.data.primary.scroll_cta_ref)],
      //     delay: this.data.primary.scroll_cta_delay,
      //     logo_before: false,
      //     bold_start: 0,
      //     bold_end: 0
      //   });
      // }
      res(this.opts);
    }).then(() => this.$nextTick(() => new WaveText(this.opts)));

    setTimeout(() => {
      // this.$emit("canScroll", true);
      this.$store.commit("allowScroll", true);
    }, this.opts[this.opts.length - 1].delay + 100);
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
  position: relative;
  margin: 0;
  margin-bottom: 0;
  display: inline-block;
  // @include outline($bg);
  // font-family: $suisse;
  font-family: $acumin;
  font-size: 50px;
  @include above($tablet) {
    font-size: 80px;
  }
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
  // display: inline-block;
  display: table;

  margin-right: auto;
  margin-left: 20%;
  text-align: left;
  // transform: translateX(-50%);

  // text-align: left;
}
.scroll-cta {
  position: absolute;
  // bottom: 0;
  // left: 50%;
  // transform: translateX(-50%);
  right: 0;
  transform: translateY(-50%);
  top: 50%;
  margin-right: 6em;
}
p {
  // font-family: $acumin;
  font-family: $suisse;
  // font-style: italic;
}
</style>
