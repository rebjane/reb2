<template>
  <div ref="page" class="workpage">
    <div v-if="data" class="inner" ref="scroll">
      <div class="intro-wrap">
        <div class="intro">
          <div class="main-image" :style="`background-image: url(${data.feature_image.url})`">
            <img :src="data.feature_image.url" />
          </div>
          <h1>{{$cms.textField(data.title)}}</h1>
        </div>
      </div>

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
  watch: {
    winresize() {
      if (this.scroll) this.scroll.size();
    },
    data: {
      handler() {
        setTimeout(() => {
          this.scroll = new Scrolly(this.$refs.page, "v");
        }, 1000);
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
      "winresize"
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
  img {
    opacity: 0;
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
  padding-bottom: 5em;
}
.intro {
  display: inline-block;
  width: auto;
  text-align: left;
  height: 100%;
}
h1 {
  font-family: $suisse;
  font-size: 60px;
  font-weight: normal;
  @include below($tablet) {
    font-size: 40px;
    margin-left: 1em;
  }
}
</style>
