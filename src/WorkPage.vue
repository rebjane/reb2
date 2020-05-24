<template>
  <div ref="page" class="workpage">
    <div v-if="data" class="inner" ref="scroll">
      <transition v-for="(item , i) in data.body" :key="i">
        <div class="component">
          <component :is="item.slice_type" :data="item" />
        </div>
      </transition>
    </div>

    <!-- <RippleImage /> -->
  </div>
</template>

<script>
import { mapState } from "vuex";
import Scrolly from "./scrolly.js";
import Scrollbar from "./components/Scrollbar.vue";

export default {
  name: "Template",
  components: {
    Scrollbar
  },
  props: {
    // data: {
    //   type: Object,
    //   default: null
    // }
  },
  data() {
    return {
      scroll: null,
      data: null
    };
  },
  beforeDestroy() {},
  computed: {
    ...mapState(["signatureLoaded", "loadPct", "loaded", "navOpen"])
  },
  methods: {
    async getData() {
      return new Promise(res => {
        var url = window.location.href.split("/");
        url = url[url.length - 1];
        this.data = this.$work.filter(i => i.uid === url)[0];
        res(this.data);
      });
    }
  },
  mounted() {
    this.getData().then(() => {
      setTimeout(() => {
        this.scroll = new Scrolly(this.$refs.page, "v");
      }, 500);
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "./styles/stylesheet.scss";
.workpage {
  height: 100%;
  width: 100%;
  position: relative;
  .inner {
    position: fixed;

    .component {
      width: 100%;
      min-width: 100vw;
    }
  }
}
p {
  color: black;
  margin-top: 0;
}
</style>
