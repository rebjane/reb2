<template>
  <div class="signingoff">
    <HeadText
      :title="$cms.textField(data.primary.so_title)"
      :body="$cms.textField(data.primary.so_body)"
      class="text"
    />
    <Signature v-if="playOnce && winresize.userAgent.desktop" />
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Template",
  watch: {
    inview() {
      if (!this.playOnce && this.inview) {
        setTimeout(() => {
          this.playOnce = true;
        }, 2000);
      }
    }
  },
  components: {},
  props: {
    inview: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      scroll: null,
      playOnce: false
    };
  },
  beforeDestroy() {},
  computed: {
    ...mapState([
      "signatureLoaded",
      "loadPct",
      "loaded",
      "navOpen",
      "route",
      "winresize"
    ])
  },
  methods: {},
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "./styles/stylesheet.scss";
.workpage {
  padding-top: 100px;
  // height: 100%;
}
.text {
  position: absolute;
  left: 8em;
}
p {
  color: white;
}
</style>
