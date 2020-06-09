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
    <!-- <div class="text-rows"> -->
    <!-- <transition v-for="(item, i) in data.items" :key="i"> -->
    <div class="text-row">
      <table class="image" :style="`background-image: url(${data.primary.image_default.url})`"></table>
      <table class="body">
        <h2 class="price" v-if="selected">${{selected.price}}</h2>
        <div class="quantity">
          <h3 class="label">Quantity</h3>
          <div class="qty-counter">
            <div class="qty link" @click="handlequantity(-1)">
              <span>–</span>
            </div>
            <p>{{quantity}}</p>
            <div class="qty link" @click="handlequantity(1)">
              <span>+</span>
            </div>
          </div>
        </div>
        <div class="variation">
          <div class="qty-row link" @click="handleDD">
            <h3 class="label" v-if="selected">{{$cms.textField(selected.variation_label)}}</h3>
            <div class="qtydd-wrap link">
              <div :class="`qty dd link ${ddOpen ? 'open' : 'close'}`">
                <span>›</span>
              </div>
            </div>
          </div>

          <div class="dropdown link" v-if="ddOpen">
            <p
              @click="handleselected(i)"
              v-for="(item, i) in data.items"
              :key="i"
            >{{$cms.textField(item.variation_label)}}</p>
          </div>
        </div>
        <div class="addtocart link" @click="addToCart">
          <h3>add to cart</h3>
          <Arrow class="arrow" />
        </div>
      </table>
    </div>
    <!-- </transition> -->
    <!-- </div> -->
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
      ddOpen: false,
      quantity: 1,
      opts: [
        {
          variation_label: "17 x 11",
          price: 6
        },
        {
          variation_label: "1fdssdfs",
          price: 4
        }
      ],
      selected: null
    };
  },
  methods: {
    handleDD() {
      this.ddOpen = !this.ddOpen;
    },
    addToCart() {
      this.$store.commit("updateCart", {
        item: this.$cms.textField(this.selected.variation_label),
        qty: this.quantity,
        total: this.selected.price * this.quantity,
        price: this.selected.price
      });
      console.log(this.$store.state.cart);
    },
    handlequantity(amt) {
      this.quantity += amt;
      this.quantity = Math.max(this.quantity, 1);
    },
    handleselected(i) {
      this.ddOpen = false;
      this.quantity = 1;
      this.selected = this.data.items[i];
    }
  },
  mounted() {
    // console.log(PayPal);
    this.selected = this.data.items[0];
    console.log(this.data);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../styles/stylesheet.scss";
.addtocart {
  position: relative;

  h3 {
    @include title();
    font-family: $suisse;
    width: 100%;
  }
  .arrow {
    width: 6em;
    // float: right;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    z-index: -1;
  }
}
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
// .label {
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translateY(-50%) translateX(-50%);
//   text-align: center;
//   font-family: $acumin;
//   pointer-events: none;
// }

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
  padding-right: 20px;
}
.text-row {
  min-height: 75vh;
  margin: 2em 0;
  padding-top: 1em;
  position: relative;
  border-top: 1px solid $bg;
  @include above($tablet) {
    display: table;
  }
  //   border-spacing: 20px;
  //   border-collapse: separate;
  width: 100%;
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
.image,
.body {
  @include above($tablet) {
    display: table-cell;
  }
  //   display: inline-block;

  vertical-align: top;
  height: 100%;
  width: 100%;
}
.body {
  @include above($tablet) {
    width: 50%;
    padding-left: 10%;
  }
}
.image {
  @include above($tablet) {
    width: 40%;
  }
  @include below($tablet) {
    height: 40vh;
  }
  //   .image-inner {
  padding-right: 10%;
  background-size: contain;
  height: 100%;
  background-repeat: no-repeat;
  background-position: top left;
  //   }
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
.variation {
  position: relative;
  .qtydd-wrap {
    display: inline-block;
    width: 50%;
    text-align: right;
  }
  h3 {
    display: inline-block;
    width: 50%;
  }
  .qty {
    border-radius: 5000px;
    border: 1px solid black;
    width: 2em;
    height: 2em;
    display: inline-block;
    position: relative;
    vertical-align: bottom;
  }
  .open {
    transform: rotate(180deg);
  }
  .dd {
    span {
      font-size: 40px;
      margin: 0;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-25%) translateY(-45%) rotate(90deg);
      display: inline-block;
    }
  }
  .dropdown {
    background: $lbg;
    position: absolute;
    // bottom: 0;
    z-index: 2;
    width: 100%;
    p {
      margin: 0 10px;
      padding: 10px 0;
      &:not(:last-child) {
        border-bottom: 1px solid $bg;
      }
    }
  }
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
