<template>
  <div class="carousel-title">
    <transition-group appear name="next">
      <h2 :key="info.key+''" class="title">{{info.title }}</h2>
    </transition-group>
    <!-- <div class="line" /> -->
    <!-- <transition-group appear name="next">
      <h2 :key="info.key+''" class="date">{{info.date}}</h2>
    </transition-group>-->
  </div>
</template>

<script>
export default {
  name: "Template",
  props: {
    info: {
      type: Object,
      default: Object.create({
        title: "default",
        date: "default"
      })
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
.title {
  position: absolute;
  top: 40vh;
  transform: translateY(-100%) translateX(-50%);
  left: 50%;
  // font-family: $suisse;
  font-family: $acumin;

  @include title();

  // background: black;

  // @include outline(black);
  color: black;
}
// .line {
//   position: fixed;
//   top: 50vh;
//   width: 100%;
//   border-bottom: 1px solid white;
//   opacity: 0.3;
//   z-index: 0;
// }
.date {
  position: absolute;
  top: 60vh;
  transform: translateY(-100%) translateX(-50%);
  // @include outline(white);
  color: white;
  // right: 3em;
  left: 50%;
  opacity: 1;
  font-family: $suisse;
  @include title();

  background: black;
}
.carousel-title {
  position: absolute;
  top: 0;
  height: 0;
  max-width: 100%;
  z-index: 0;
  pointer-events: none;

  // mix-blend-mode: difference;
  left: 0;
}
.next-enter {
  opacity: 0;
  transform: translateY(0%) translateX(-50%);
}
.next-enter-active {
  @include ease(all);
}
.next-enter-to {
  opacity: 1;
  transform: translateY(-100%) translateX(-50%);
}
.next-leave-active {
  @include ease(all);
}
.next-leave-to {
  opacity: 0;
  transform: translateY(-200%) translateX(-50%);
}
</style>
