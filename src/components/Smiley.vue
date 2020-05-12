<template>
  <div class="smiley">
    <svg :fill="fill" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 115.26 115.26">
      <path
        d="M57.63,115.26a57.63,57.63,0,1,1,57.63-57.63A57.7,57.7,0,0,1,57.63,115.26ZM57.63,4a53.63,53.63,0,1,0,53.63,53.63A53.69,53.69,0,0,0,57.63,4Z"
      />
      <path
        d="M58.65,98.22c-20.83,0-37.77-14.13-37.77-31.5h4c0,15.16,15.15,27.5,33.77,27.5s33.77-12.34,33.77-27.5h4C96.42,84.09,79.48,98.22,58.65,98.22Z"
      />
      <path
        d="M51.25,42.73C36.47,42.73,36,60.12,36,62.16c0-2-.43-19.43-15.21-19.43C35.61,42.73,36,25.34,36,23.3,36,25.34,36.47,42.73,51.25,42.73Z"
      />
      <path
        d="M94.42,42.73c-14.78,0-15.21,17.39-15.21,19.43,0-2-.42-19.43-15.2-19.43,14.78,0,15.2-17.39,15.2-19.43C79.21,25.34,79.64,42.73,94.42,42.73Z"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: "Template",
  props: {
    msg: String,
    fill: {
      type: String,
      default: "white"
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
