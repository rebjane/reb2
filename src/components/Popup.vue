<template>
  <div class="popup" v-if="data">
    <h3>Your transaction has been approved!</h3>
    <p>
      An official invoice has been sent to
      <strong>{{payerEmail}}</strong>.
      <br />If you did not receive an invoice, please email
      <br />
      <span>
        <a href="mailto:hi@itsrebec.ca">hi@itsrebec.ca</a>
      </span>
      with the your invoice number,
      <br />
    </p>
    <p class="no">{{invoiceNo}}</p>
    <p>in the subject header. Thank you!</p>
    <div class="close">
      <p class="x link" @click.prevent="close">
        x
        <br />CLOSE
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Popup",
  watch: {
    data: {
      handler() {
        this.payerEmail = this.data.payer.payer_info.email;
        this.invoiceNo = this.data.id;
        this.time = this.data.create_time;
        this.name = `${this.data.payer.payer_info.first_name} ${this.data.payer.payer_info.last_name} `;

        // this.$smtp.send({
        //   SecureToken: "d0125a86-9991-42dd-8bc1-3e6a30fff61b",
        //   To: "rebjanec@gmail.com",
        //   From: "rebjanec@gmail.com",
        //   Subject: "PAYPAL PURCHASE From Website",
        //   Body: `Invoice Number: ${this.invoiceNo} <br/>
        //     Cart ID: ${this.data.cart}
        //     Name: ${this.name} <br/>
        //     Time: ${this.time} <br/> <br/>
        //     Ship to: ${this.data.payer.payer_info.shipping_address.line1} <br/>
        //     ${this.data.payer.payer_info.shipping_address.city} <br/>
        //      ${this.data.payer.payer_info.shipping_address.state},
        //       ${this.data.payer.payer_info.shipping_address.country_code} <br/>
        //        ${this.data.payer.payer_info.shipping_address.postal_code} <br/> <br/>`
        // });

        console.log(this.data);
      },
      deep: true,
      immediate: true
    }
  },
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      payerEmail: null,
      invoiceNo: null,
      time: null,
      name: null,
      items: null
    };
  },
  methods: {
    close() {
      this.$store.commit("popupInfo", null);
    }
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../styles/stylesheet.scss";
.popup {
  background: $bg;
  text-align: center;
  p,
  h3 {
    color: white;
  }
  h3 {
    font-family: $suisse;
    @include title();
  }
  p {
    font-family: $acumin;
    @include body();
  }
  a {
    text-decoration: underline;
  }
  .no {
    padding: 1em 0;
  }
  .close {
    .x {
      padding-top: 2em;
    }
    p {
      display: inline-block;
    }
  }
}
</style>
