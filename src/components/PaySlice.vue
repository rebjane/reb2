<template>
  <div class="pay-slice">
    <!-- <div class="paypal-wrapper"> -->
    <!-- <PayPal
        class="paypal link"
        :button-style="buttonstyle"
        :amount="'5'"
        :currency="'CAD'"
        :client="creds"
      />
    <span class="label">Pay Securely with Paypal or Debit / Credit Card</span>-->
    <div class="text-rows">
      <transition v-for="(item, i) in data.items" :key="i">
        <div class="text-row">
          <div class="title">
            <h2>texy</h2>
          </div>
          <div class="body">
            <h2 class="price">$10</h2>
            <div class="quantity">
              <h3>Quantity</h3>
              <div class="qty-counter">
                <div class="qty link" @click="handlequantity(-1)">
                  <span>-</span>
                </div>
                <p>{{quantity}}</p>
                <div class="qty link" @click="handlequantity(1)">
                  <span>+</span>
                </div>
              </div>
            </div>
            <div class="variation">
              <p>17" x 11"</p>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <!-- </div> -->
  </div>
</template>

<script>
// import Paypal from "../paypal.js";
// import PayPal from "vue-paypal-checkout";
export default {
  name: "Template",
  components: {
    // PayPal
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
      },
      quantity: 1
    };
  },
  methods: {
    handlequantity(amt) {
      this.quantity += amt;
      this.quantity = Math.max(this.quantity, 1);
    }
  },
  mounted() {
    // console.log(PayPal);
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
  opacity: 0;
  //   transform: scale(2);
}
.pay-slice {
  height: 100vh;
  @include workpadding();
}
.paypal-wrapper {
  //   display: inline-block;

  position: relative;
  background: $lbg;
}
.label {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  text-align: center;
  font-family: $acumin;
  pointer-events: none;
}

.body {
  /deep/ a {
    color: black;
    // text-decoration: underline;
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
.price {
  padding: 1em 0;
}
.quantity,
.variation {
  border-top: 1px solid black;
  padding-top: 20px;
  padding-bottom: 20px;
}
.quantity {
  p {
    margin: 0;
    display: inline-block;
    width: 50%;
    text-align: center;
  }
  h3 {
    display: inline-block;
    margin: 0;
    width: 50%;
  }
  .qty-counter {
    display: inline-block;
    width: 50%;
    text-align: right;
  }
  .qty {
    border-radius: 5000px;
    border: 1px solid black;
    width: 2em;
    height: 2em;
    display: inline-block;
    position: relative;
    vertical-align: bottom;

    span {
      margin: 0;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      font-size: 20px;
    }
  }
}
</style>
