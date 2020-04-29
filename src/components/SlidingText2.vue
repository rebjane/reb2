<template>
  <div class="sliding-text">
    <!-- :style="`height: ${textHeight}px;`" -->
    <div class="st-container">
      <h2 ref="text">
        <span ref="innerText" v-for="(item, i) in quantity" :key="i" :style="spanStyle(i)">{{text}}</span>
      </h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "Template",
  props: {
    text: {
      type: String,
      default: "sliding text"
    }
  },
  data() {
    return {
      quantity: 1,
      textHeight: 0,
      textWidth: 0,
      spanWidth: 0
    };
  },
  methods: {
    getSize() {
      this.textWidth = this.$refs.text.getBoundingClientRect().width;
      this.textHeight = this.$refs.text.getBoundingClientRect().height;

      this.spanWidth = this.$refs.innerText[0].getBoundingClientRect().width;
      this.quantity = Math.floor(this.textWidth / this.spanWidth) + 1;

      console.log(this.spanWidth);
    },
    spanStyle(i) {
      return `left: ${i * this.spanWidth * 1.4}px;`;
    }
  },
  mounted() {
    this.getSize();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../styles/stylesheet.scss";

h2 {
  color: white;
  font-family: $acumin;
  font-size: 60px;
  font-weight: lighter;
  text-align: center;
  width: 100%;
  position: relative;
  height: 72px;
  width: 66%;
  margin-left: auto;
  margin-right: auto;

  span {
    position: absolute;
    left: 0;
  }
}
</style>
