<template>
  <div class="template">
    <div class="paypal-wrapper">
      <PayPal
        class="paypal link"
        :button-style="buttonstyle"
        :amount="'5'"
        :currency="'CAD'"
        :client="creds"
      />
      <!-- <span class="label">Pay Securely with Paypal or Debit / Credit Card</span> -->
    </div>
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
      },
      buttonstyle: {
        label: "",
        size: "large", // small | medium | large | responsive
        shape: "rect", // pill | rect
        color: "black",
        tagline: false
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
.paypal {
  //   padding: 5em;
  //   position: absolute;
  height: 100%;
  width: 100%;
  //   transform: scale(2);
}
.paypal-wrapper {
  //   display: inline-block;

  position: relative;
  background: $lbg;
}
.label {
  //   position: absolute;
  //   top: 50%;
  //   left: 50%;
  //   transform: translateY(-50%) translateX(-50%);
  text-align: center;
  font-family: $acumin;
  pointer-events: none;
}
</style>
