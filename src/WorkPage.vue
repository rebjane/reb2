<template>
  <div ref="page" class="workpage">
    <div v-if="data" class="inner" ref="scroll">
      <div class="intro-wrap">
        <div class="intro">
          <div
            class="main-image"
            :style="data.feature_image.url ? `background-image: url(${data.feature_image.url})` : null"
          >
            <img
              :src="data.feature_image.url || data.anim_link.url"
              :style="data.feature_image.url ? `opacity: 0` : null"
            />
          </div>
          <h1>{{$cms.textField(data.title)}}</h1>
        </div>
      </div>

      <transition v-for="(item , i) in data.body" :key="i">
        <div class="component">
          <component :is="item.slice_type" :data="item" :title="$cms.textField(data.title)" />
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
  name: "WorkPage",
  components: {
    Scrollbar
  },
  watch: {
    winresize() {
      if (this.scroll) this.scroll.size();
    },
    showCart: {
      handler() {
        // console.log(this.showCart);
        if (this.showCart && this.scroll) this.scroll.deafen();
        else if (!this.showCart && this.scroll) this.scroll.listen();
      },
      deep: true,
      immediate: true
    },
    popup: {
      handler() {
        // console.log(this.showCart);
        if (this.popup && this.scroll) this.scroll.deafen();
        else if (!this.popup && this.scroll) this.scroll.listen();
      },
      deep: true,
      immediate: true
    },
    data: {
      handler() {
        setTimeout(() => {
          this.scroll = new Scrolly(this.$refs.page, "v");
        }, 2000);
      },
      deep: true,
      immediate: true
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
      scroll: null
    };
  },
  beforeDestroy() {},
  computed: {
    ...mapState([
      "signatureLoaded",
      "loadPct",
      "loaded",
      "navOpen",
      "winresize",
      "showCart",
      "popup"
    ])
  },
  methods: {
    whatWorkPageThisIs() {
      //handles if your first landing is on a work page insetad of home page
      var uid = this.$route.path.split("/"); //split your uid by '/'
      var categorized = this.$work.filter(i => i.type_of_work === uid[1]); //what category (ie. work, illustration)
      uid = uid[uid.length - 1]; // what the last portion of the slug is / work's title
      var idx = categorized.indexOf(categorized.filter(i => i.uid === uid)[0]); //find what index in the $work array you're at

      this.$store.commit("updateWorkPageIndex", {
        data: categorized,
        i: idx
      });
    }
  },
  mounted() {
    this.whatWorkPageThisIs();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "./styles/stylesheet.scss";
.main-image {
  height: 80vh;
  width: 100%;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  text-align: center;
  img {
    // opacity: 0;
    max-width: 100%;
    max-height: 100%;
  }
}
.workpage {
  height: 100%;
  width: 100%;
  position: relative;
  .inner {
    position: fixed;
    width: 100%;
    padding-bottom: 3em;
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
.intro-wrap {
  // @include padding();
  width: 100%;
  display: inline-block;
  text-align: center;
  @include above($tablet) {
    padding-bottom: 5em;
  }
}
.intro {
  display: inline-block;
  width: auto;
  text-align: left;
  height: 100%;
}
h1 {
  font-family: $suisse;
  font-weight: normal;
  @include title();

  @include below($tablet) {
    @include workpadding();
  }
}
</style>
