<template>
  <div class="cartscreen">
    <div class="cartscreen-inner">
      <div class="items-outer">
        <table class="items" v-if="cart && cart.length">
          <div class="delete">
            <p>Remove</p>
          </div>
          <tr ref="row" class="row" v-for="(item, i) in cart" :key="i">
            <div class="rowbg" />

            <td class="products">
              <div class="x link" @click="removeCart(item)">x</div>
              <h3>{{item.title}}</h3>
              <p>{{item.item}}</p>
            </td>
            <td>
              <input
                required
                ref="qty"
                pattern="[0-9]{1,5}"
                class="quantity"
                type="text"
                :value="item.qty"
                @input="handleQtyChange(item, i)"
              />
              <!-- <p class="link">Update</p> -->
              <!-- @click="handleQtyChange(item, i)" -->
            </td>
            <td>
              <p class="price">${{item.price}}</p>
            </td>
          </tr>
        </table>
        <div v-else>
          <p>Cart is empty.</p>
        </div>
      </div>
      <div class="total">
        <h3>Total</h3>
        <h3>${{cartTotal}}</h3>
        <PayPal
          class="paypal link"
          :button-style="buttonstyle"
          :amount="cartTotal.toString()"
          :currency="'CAD'"
          :client="creds"
          :items="items"
          @payment-completed="paymentCompleted"
        />
        <!-- :env="'sandbox'" -->

        <!-- REMOVE SANDBOX BEFORE YOU DEPLOY -->
      </div>
    </div>
  </div>
</template>

<script>
import PayPal from "vue-paypal-checkout";
import Invoice from "../invoice.js";
import { mapState } from "vuex";

export default {
  name: "CartScreen",
  watch: {
    cart: {
      handler() {
        // console.log(e);
        this.items = this.cart.map(item => {
          return {
            name: `Item: ${item.title} <br/> Desc: ${item.item}`,
            description: item.item,
            quantity: item.qty.toString(),
            price: item.price.toString(),
            currency: "CAD"
          };
        });
        // console.log(this.items);
      },
      deep: true,
      immediate: true
    }
  },
  components: {
    PayPal
  },
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  computed: {
    ...mapState(["cart", "cartTotal", "winresize"])
  },
  data() {
    return {
      creds: {
        //that's for the legit rebjanec@gmail.com account
        sandbox:
          "ARudPkpGlblcgwrFWsdfFlq0eZeHb0_YHRDWwr9jQq-4AKk9XJsEhnYWJwb_390ir5r_ClQosUz82aeS",
        production:
          "ARutiDw--wu1dU1i2332eIOi6fBQddU1fXFIvqQwb2-ApGtoh7ef-Oe8aVq78N--iZHKivXawEpuOPt0"
        //this pair is for SANDBOX
        // sandbox:
        //   "ARudPkpGlblcgwrFWsdfFlq0eZeHb0_YHRDWwr9jQq-4AKk9XJsEhnYWJwb_390ir5r_ClQosUz82aeS",
        // production:
        //   "Afu7lU2kZHTbWosbO1q463icvztC4_VqfMx_Q_daaKQmhSmtDDOQrcxC4bod8JN3L0-MJmjV6TMazB_I"
      },
      buttonstyle: {
        label: "",
        size: "large", // small | medium | large | responsive
        shape: "rect", // pill | rect
        color: "black",
        tagline: false
      },
      numRegex: new RegExp("^[0-9]+$"),
      acceptedKeys: [8, 37, 38, 39, 40], //backspace, the arrow keys
      items: null,
      startSwipePos: 0,
      swipeRowPos: 0,
      lastSwipePos: 0,
      swipee: null,
      startSwipee: null,
      stopSwipee: null
    };
  },
  methods: {
    paymentCompleted(e) {
      // console.log("payment done", e);
      this.$store.commit("updateShowCart", false);
      this.$store.commit("emptyCart");
      this.$store.commit("popupInfo", e);
      // console.log(e);
      var msg = new Invoice(e).html();
      this.$smtp.send({
        SecureToken: "d0125a86-9991-42dd-8bc1-3e6a30fff61b",
        To: e.payer.payer_info.email,
        From: "rebjanec@gmail.com",
        Subject: "Order Confirmation from Rebecca / www.itsrebec.ca",
        Body: msg
      });
      this.$smtp.send({
        SecureToken: "d0125a86-9991-42dd-8bc1-3e6a30fff61b",
        To: "rebjanec@gmail.com",
        From: "rebjanec@gmail.com",
        Subject: "COPY OF: Order Confirmation from Rebecca / www.itsrebec.ca",
        Body: msg
      });
    },
    handleQtyChange(item, i) {
      if (this.$refs.qty[i].value && parseInt(this.$refs.qty[i].value)) {
        var updatedItem = item;
        updatedItem.qty = parseInt(this.$refs.qty[i].value);
        updatedItem.total = updatedItem.qty * item.price;

        this.$store.commit("updateCartQuantity", updatedItem);

        // console.log(
        //   item,
        //   this.cart,
        //   this.$refs.qty,
        //   typeof this.$refs.qty[0].value,
        //   this.$refs.qty[0].value,
        //   parseInt(this.$refs.qty[0].value)
        // );
      }
    },
    removeCart(item) {
      this.$store.commit("removeCart", item);
    },
    noLetterKeys(e) {
      // console.log(e.which);
      if (
        !this.numRegex.test(e.key) &&
        this.acceptedKeys.indexOf(e.which) < 0
      ) {
        e.preventDefault();
      }
    },
    startSwipe(e) {
      // console.log(e);
      this.startSwipePos = e.touches[0].screenX;
      this.lastSwipePos = this.startSwipePos;
      // console.log("start");
    },
    removeEventListeners(item) {
      this.$refs.row[item.i].removeEventListener(
        "touchstart",
        this.startSwipe,
        true
      );
      this.$refs.row[item.i].removeEventListener(
        "touchmove",
        this.swipee,
        true
      );
      this.$refs.row[item.i].removeEventListener(
        "touchend",
        this.stopSwipee,
        true
      );
    },
    swipe(item) {
      return e => {
        // console.log(item.i);
        // console.log(e);
        this.swipeRowPos += -(this.lastSwipePos - e.touches[0].screenX);
        this.swipeRowPos = Math.min(this.swipeRowPos, 0);
        this.lastSwipePos = e.touches[0].screenX;
        item.row.style = `transform: translateX(${this.swipeRowPos}px)`;

        if (this.startSwipePos - e.touches[0].screenX > window.innerWidth / 3) {
          // console.log("delete");

          this.removeEventListeners(item);
          this.$store.commit("removeCart", item.cart);
        }
      };
    },
    stopSwipe(row) {
      // console.log("end");
      return () => {
        this.swipeRowPos = 0;
        row.style = `transform: translateX(${this.swipeRowPos}px)`;
      };
    }
  },
  mounted() {
    if (this.winresize.userAgent.tablet) {
      for (let i = 0; i < this.cart.length; i++) {
        this.$refs.row[i].addEventListener("touchstart", this.startSwipe, true);
        this.$refs.row[i].addEventListener(
          "touchmove",
          (this.swipee = this.swipe({
            cart: this.cart[i],
            row: this.$refs.row[i],
            i: i
          })),
          true
        );
        this.$refs.row[i].addEventListener(
          "touchend",
          (this.stopSwipee = this.stopSwipe(this.$refs.row[i])),
          true
        );
      }
    }
    if (this.cart) {
      for (let i = 0; i < this.cart.length; i++) {
        this.$refs.qty[i].addEventListener("keydown", this.noLetterKeys);
      }
    }
  },
  beforeDestroy() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../styles/stylesheet.scss";
$cpad: 6em;

.cartscreen-inner {
  // @include workpadding();
  @include below($tablet) {
    padding: 2em 0;
    width: calc(100% - 4em);
    margin: 0 2em;
    margin-top: 50vh;
    transform: translateY(-50%);
  }
  @include above($tablet) {
    display: table;

    width: calc(100% - calc(#{$cpad} * 2));
    margin: 0 $cpad;
  }
}
.cartscreen {
  position: fixed;
  height: 100%;
  width: 100%;
  @include below($tablet) {
    overflow: auto;
  }
  top: 0;
  right: 0;
  background-color: white;
  // margin-left: 20%;
}
.products {
  position: relative;
  .x {
    position: absolute;
    padding: 2em;
    left: -5em;
    top: 50%;
    transform: translateY(calc(-50% - 1em));
    font-family: $acumin;
  }
  h3 {
    @include sub();
    margin: 0;
  }
  p {
    margin: 0;
    font-family: $acumin;
    @include body();
    // margin-bottom: 2em;
  }
}
.total {
  @include above($tablet) {
    display: table-cell;
    height: 100vh;
    padding-left: 2em;
    border-left: 1px solid $lbg;
  }
  @include below($tablet) {
    border-top: 1px solid $lbg;
  }
  vertical-align: middle;
}
.items-outer {
  vertical-align: middle;
  @include above($tablet) {
    display: table-cell;
    width: 75%;
    height: 100vh;
  }
  @include below($tablet) {
    width: 100%;
    padding-bottom: 2em;
  }

  .items {
    .row {
      position: relative;
      overflow: hidden;
    }
    .rowbg {
      background: white;
      position: absolute;
      top: -5px;
      left: -1px;
      width: calc(100% + 2px);
      height: calc(100% + 10px);
      z-index: -1;
    }
    .delete {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: red;
      text-align: right;
      z-index: -1;
      p {
        color: black;
        font-family: $acuminc;
        margin-right: 1em;
        // @include mini();
      }
    }
    position: relative;
    width: 100%;
    tr:not(:last-child) {
      td {
        padding-bottom: 2em;
      }
    }
  }
}
.quantity {
  outline: none;
  width: 3em;
  height: 3em;
}
.price {
  font-family: $suisse;
  margin: 0;
  @include body();
}
p,
h1,
h2,
h3,
h4,
h5,
h6,
input,
select,
a {
  color: black;
}
</style>
