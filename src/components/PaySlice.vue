<template>
  <div class="template">
    <PayPal :amount="'5'" :currency="'CAD'" :client="creds" />
  </div>
</template>

<script>
// import Paypal from "../paypal.js";
import PayPal from "vue-paypal-checkout";
export default {
  name: "Template",
  components: {
    PayPal
  },
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      creds: {
        sandbox:
          "ARudPkpGlblcgwrFWsdfFlq0eZeHb0_YHRDWwr9jQq-4AKk9XJsEhnYWJwb_390ir5r_ClQosUz82aeS",
        production:
          "ARutiDw--wu1dU1i2332eIOi6fBQddU1fXFIvqQwb2-ApGtoh7ef-Oe8aVq78N--iZHKivXawEpuOPt0"
      }
    };
  },
  methods: {},
  mounted() {
    console.log(PayPal);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../styles/stylesheet.scss";
</style>
