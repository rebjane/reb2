<template>
  <div class="signingoff">
    <HeadText
      :title="$cms.textField(data.primary.so_title)"
      :body="$cms.textField(data.primary.so_body)"
    />
    <Signature v-if="this.playOnce" />
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
        }, 3000);
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
    ...mapState(["signatureLoaded", "loadPct", "loaded", "navOpen", "route"])
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
p {
  color: white;
}
</style>
