<template>
  <div class="textsection">
    <div class="text-rows">
      <transition v-for="(item, i) in data.items" :key="i">
        <div class="text-row">
          <div class="title">
            <h2>{{$cms.textField(item.text_title)}}</h2>
          </div>
          <div class="body" v-html="$cms.htmlField(item.text_body)">
            <!-- <p ></p> -->
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
.body {
  /deep/ a {
    color: white;
    text-decoration: underline;
    border-bottom: 1px solid black;
    // padding-bottom: 5px;
    font-family: $acumin;
    // color: red;
  }
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
  @include sub();

  font-weight: normal;
  margin: 0;
  @include below($tablet) {
    margin: 1em 0;
  }
}
p {
  font-family: $suisse;
  @include body();

  margin-top: 0;
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
