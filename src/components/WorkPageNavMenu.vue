<template>
  <div class="work-nav-menu">
    <router-link to="/">
      <div class="back">
        <div class="arrow-wrap">
          <Arrow class="arrow up" />
        </div>
        <p>BACK</p>
      </div>
    </router-link>
    <div class="next">
      <p>NEXT</p>
      <div class="arrow-wrap">
        <Arrow class="arrow down" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WorkPageNavMenu",
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../styles/stylesheet.scss";
.arrow-wrap {
  //   height: 3em;
  width: 3em;
  margin: 2em 0;
}
.back,
.next {
  margin: 0 2em;
  position: fixed;
  cursor: pointer;
  //   height: 50%;

  p {
    writing-mode: vertical-lr;
    transform: rotate(180deg);
    margin: auto;
    font-family: $acuminc;
  }
}

.back {
  top: 0;
  .arrow {
    transform: rotate(-90deg);
  }
}

.next {
  bottom: 0;
  .arrow {
    transform: rotate(90deg);
  }
}
</style>
