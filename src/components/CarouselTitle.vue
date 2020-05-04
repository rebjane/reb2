<template>
  <div class="carousel-title">
    <transition-group appear name="next">
      <h2 :key="info.key+''" class="title">{{info.title}}</h2>
    </transition-group>
    <!-- <div class="line" /> -->
    <transition-group appear name="next">
      <h2 :key="info.key+''" class="date">{{info.date}}</h2>
    </transition-group>
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
  position: fixed;
  top: 50vh;
  transform: translateY(-100%);
  left: 0;
  color: white;
  font-family: $acumin;
  margin-left: 3em;
}
// .line {
//   position: fixed;
//   top: 50vh;
//   width: 100%;
//   border-bottom: 1px solid white;
//   opacity: 0.3;
// }
.date {
  position: fixed;
  top: 50vh;
  transform: translateY(-100%);
  right: 0;
  color: white;
  margin-right: 3em;
  opacity: 1;
  font-family: $acumin;
}
.carousel-title {
  position: fixed;
  top: 0;
  height: 0;
  z-index: 0;
}
.next-enter {
  opacity: 0;
  transform: translateY(0%);
}
.next-enter-active {
  @include ease(all);
}
.next-enter-to {
  opacity: 1;
  transform: translateY(-100%);
}
.next-leave-active {
  @include ease(all);
}
.next-leave-to {
  opacity: 0;
  transform: translateY(-200%);
}
</style>
