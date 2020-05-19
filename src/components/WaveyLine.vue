<template>
  <div class="waveyline">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.4 15">
      <path
        d="M111.8,7.21c-2.55,3.49-5,6.79-9.8,6.79s-7.25-3.3-9.8-6.79S87,0,81.6,0,73.57,3.66,71,7.21,66,14,61.2,14,54,10.7,51.4,7.21,46.15,0,40.8,0s-8,3.66-10.61,7.21S25.24,14,20.4,14s-7.25-3.3-9.8-6.79S5.35,0,0,0V1C4.85,1,7.25,4.3,9.8,7.79S15,15,20.4,15s8-3.66,10.6-7.21S36,1,40.8,1s7.25,3.3,9.79,6.79S55.84,15,61.2,15s8-3.66,10.6-7.21S76.75,1,81.6,1s7.25,3.3,9.8,6.79S96.65,15,102,15s8-3.66,10.6-7.21,5-6.79,9.8-6.79V0C117.05,0,114.38,3.66,111.8,7.21Z"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: "Template",
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
</style>
