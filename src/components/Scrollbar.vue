<template>
  <div class="scrollbar-div">
    <div class="scroll-line">
      <!-- ref="scrollline" -->
      <ul v-if=" winresize.size.desktop">
        <transition-group appear name="in" v-for="(item, i) in menu" :key="i">
          <li :style="`transition-delay: ${i * 50}ms`" @click="doScroll(i)" :key="i">
            <span>
              <router-link to :ref="item.title.toUpperCase()">{{item.title}}</router-link>
            </span>
            <transition v-if="timedOut" appear :name="scroll.dir > 0 ? 'left' : 'right'">
              <div class="underline" v-if="mblNavTitle === item.title" />
            </transition>
          </li>
        </transition-group>
      </ul>
      <!-- <div ref="scrollbar" class="scroll-bar"></div> -->
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
    },
    mblNavTitle: String
  },
  watch: {},
  data() {
    return {
      slwidth: null,
      sbwidth: null,
      menu: this.$nav,
      timedOut: false
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
      this.$emit("scrollTo", this.$nav[i].left);
    }
  },
  mounted() {
    // this.slwidth = this.$refs.scrollline.getBoundingClientRect().width;
    // this.sbwidth = this.$refs.scrollbar.getBoundingClientRect().width;
    setTimeout(() => {
      this.timedOut = true;
    }, this.menu.length * 50);
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
  opacity: 0 !important;
  transform: translateY(100%) !important;
}
.in-enter-active {
  @include ease(all);
}
// span {
//   opacity: 1;
//   transform: translateY(0%);
// }
.scroll-line {
  @include above($tablet) {
    overflow: hidden;
  }
  // border-top: 1px solid black;
  position: absolute;
  // bottom: 0;
  top: 0;
  white-space: nowrap;
  // padding-bottom: 2em;
  margin-top: 2em;

  // width: 50%;
  left: 50%;
  transform: translateX(-50%);
  @include below($tablet) {
    overflow: visible;
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
.left-enter-active,
.right-leave-to {
  left: 0;
}
.left-leave-to,
.right-enter-active {
  right: 0;
}
.left-enter,
.left-leave-to,
.right-enter,
.right-leave-to {
  width: 0px !important;
}

.left-enter-active,
.left-leave-active,
.right-enter-active,
.right-leave-active {
  @include ease(width);
}

.underline {
  position: absolute;
  bottom: 0;
  border: 2px solid white;
  width: 100%;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
  color: white;

  li {
    display: inline-block;
    overflow: hidden;

    // cursor: pointer;
    opacity: 1;
    transform: translateY(0%);
    position: relative;
    @include body();

    text-align: left;
    // width: 100px;
    a {
      padding: 0 1em;
    }
    span {
      font-family: $acuminc;
    }
  }
}
</style>
