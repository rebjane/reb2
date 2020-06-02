<template>
  <div class="textsection">
    <div class="text-rows">
      <transition v-for="(item, i) in data.items" :key="i">
        <div class="text-row">
          <div class="title">
            <h2>{{$cms.textField(item.text_title)}}</h2>
          </div>
          <div class="body">
            <p>{{$cms.textField(item.text_body)}}</p>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "TextSlice",
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
.textsection {
  // padding: 4em;
  @include workpadding();
}
.text-rows {
  width: 100%;
  margin: auto;
}
.text-row {
  margin: 2em 0;
  padding-top: 1em;
  position: relative;
  border-top: 1px solid $bg;
}
h2 {
  font-family: $acumin;
  font-size: 30px;
  font-weight: normal;
  margin: 0;
  @include below($tablet) {
    margin: 1em 0;
  }
}
p {
  font-family: $suisse;
  font-size: 14px;
  line-height: 2;
  margin-top: 0;
}
.title {
}

.title,
.body {
  display: inline-block;
  vertical-align: top;
  height: 100%;
  width: 100%;
  @include above($tablet) {
    width: 50%;
  }
}
</style>
