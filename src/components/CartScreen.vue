<template>
  <div class="cartscreen">
    <div class="cartscreen-inner">
      <div class="items-outer">
        <table class="items" v-if="cart && cart.length">
          <tr v-for="(item, i) in cart" :key="i">
            <td class="products">
              <div class="x link" @click="removeCart(item)">x</div>
              <h3>{{item.title}}</h3>
              <p>{{item.item}}</p>
            </td>
            <td>
              <input ref="qty" pattern="[0-9]{1,5}" class="quantity" type="text" :value="item.qty" />
              <p class="link" @click="handleQtyChange(item, i)">Update</p>
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
        />
      </div>
    </div>
  </div>
</template>

<script>
import PayPal from "vue-paypal-checkout";
import { mapState } from "vuex";

export default {
  name: "CartScreen",
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
    ...mapState(["cart", "cartTotal"])
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
  methods: {
    handleQtyChange(item, i) {
      if (this.$refs.qty[i].value && parseInt(this.$refs.qty[i].value)) {
        console.log("target item is ", item);
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
    }
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../styles/stylesheet.scss";
.cartscreen-inner {
  // @include workpadding();
  display: table;
  width: 100%;
}
$cpad: 6em;
.cartscreen {
  position: fixed;
  height: 100%;
  width: calc(100% - calc(#{$cpad} * 2));
  padding: 0 $cpad;
  top: 0;
  left: 0;
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
  display: table-cell;
  vertical-align: middle;
  height: 100vh;
  padding-left: 2em;
  border-left: 1px solid $lbg;
}
.items-outer {
  vertical-align: middle;
  height: 100vh;
  width: 75%;
  display: table-cell;

  .items {
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
</style>
