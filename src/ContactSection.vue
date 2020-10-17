<template>
  <div ref="contact" class="contact">
    <!-- <div class="contact-outer" ref="outer"> -->
    <div class="wrapper" ref="wrap">
      <!-- <p>{{data.primary}}</p> -->
      <div class="info">
        <HeadText
          :title="$cms.textField(data.primary.contact_title)"
          :body="$cms.textField(data.primary.contact_body)"
          :color="'white'"
        />
      </div>
      <div class="form focus">
        <form class="form-inner" ref="form" @submit.prevent="doSubmit">
          <transition v-for="(item, i) in data.items" :key="i">
            <div class="row focus">
              <label :for="$cms.textField(item.input_label)">{{$cms.textField(item.input_label)}}</label>
              <input
                v-if="item.input_type !== 'textarea'"
                :pattern="item.regex.length ? $cms.textField(item.regex) :null"
                required
                :type="item.input_type"
                :name="$cms.textField(item.input_label)"
                class="type"
              />

              <textarea
                v-else
                :pattern="item.regex.length ? $cms.textField(item.regex) :null"
                :required="true"
                :rows="item.textarea_line_count"
                :name="$cms.textField(item.input_label)"
                class="type"
              />
            </div>
          </transition>
          <div class="submit link focus" @click="testClick">
            <input type="submit" class="link" value="submit" />
            <Arrow class="arrow" :fill="'white'" />
          </div>
        </form>
        <h3 class="message" ref="message">{{message}}</h3>
      </div>
    </div>
    <!-- </div> -->
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";

export default {
  name: "Template",
  components: {},
  props: {
    data: {
      type: Object,
      default: null,
    },
    inview: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      newscroll: null,
      start: 0,
      startTouch: 0,
      message: null,
      canSubmit: false,
      api: `https://worldtimeapi.org/api/ip`,
      ip: null,
    };
  },
  beforeDestroy() {},
  computed: {
    ...mapState([
      "signatureLoaded",
      "loadPct",
      "loaded",
      "navOpen",
      "winresize",
      "scroll",
    ]),
  },
  methods: {
    testClick() {
      this.canSubmit = true;
      var sendMessage = "";

      for (let i = 0; i < this.$refs.form.length - 1; i++) {
        // console.log(this.$refs.form[i].attributes);
        var validFormat = this.$refs.form[i].attributes["pattern"]
          ? new RegExp(this.$refs.form[i].attributes["pattern"].value).test(
              this.$refs.form[i].value
            )
          : true;
        // console.log(validFormat);
        if (this.$refs.form[i].value === "") {
          this.canSubmit = false;
          this.message =
            "There was a problem sending your message. Please try again.";
          this.$refs.message.style = "color: red;";
          setTimeout(() => {
            this.message = null;
          }, 3000);
          return;
        } else if (!validFormat) {
          this.message = `Please enter a valid ${this.$refs.form[i].attributes["name"].nodeValue}.`;
          this.$refs.message.style = "color: red;";
          setTimeout(() => {
            this.message = null;
          }, 3000);
          return;
        }
        sendMessage += `${this.$refs.form[i].value}<br/>`;
      }
      sendMessage += `ip: ${this.ip} <br/>
      navigator info: ${window.navigator.userAgent}`;

      if (this.canSubmit) {
        this.doSubmit(sendMessage);
      }
    },
    doSubmit(msg) {
      // console.log(e);
      new Promise((res) => {
        res(msg);
      }).then((msg) =>
        this.$smtp
          .send({
            // Host: "smtp.gmail.com",
            // Username: "rebjanec@gmail.com",
            // Password: "gingstergangste7",
            SecureToken: "0d0deb43-c8e3-4bdc-bb39-edf3d90c9eca",
            To: "rebjanec@gmail.com",
            From: "rebjanec@gmail.com",
            Subject: "From Website",
            Body: msg,
          })
          .then((msg) => {
            console.log(msg);
            switch (msg) {
              case "OK": {
                this.message =
                  "Successfully sent! I will get in touch with you as soon as I can!";
                this.$refs.message.style = "color: green;";

                break;
              }
              default: {
                this.message =
                  "There was a problem sending your message. Please try again.";
                this.$refs.message.style = "color: red;";

                break;
              }
            }
            setTimeout(() => {
              this.message = null;
            }, 3000);
            this.$refs.form.reset();
          })
      );
    },
  },
  mounted() {
    axios.get(this.api).then((res) => {
      this.ip = res.data.client_ip;
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "./styles/stylesheet.scss";

.wrapper {
  @include below($tablet) {
    // height: 100%;
    width: 100vw;
    // position: absolute;
    margin-top: $top;
  }
}
.contact {
  // padding: 0 5em;
  @include below($tablet) {
    overflow: auto;
  }
  height: 100vh;
}
.info {
  position: relative;
  width: 100%;

  @include above($tablet) {
    width: 50%;
    height: 100%;
    float: left;
    /deep/ .head-text {
      width: 40%;
    }
  }
  @include below($tablet) {
    padding-bottom: 2em;
  }
}
.form {
  // width: 100%;
  @include below($tablet) {
    // height: 100%;
    @include padding();
  }
  @include above($tablet) {
    width: 40%;
    height: 100vh;
    float: left;
  }
  position: relative;
  .form-inner {
    width: 100%;
    @include above($tablet) {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  span {
    width: 100%;
  }
  .message {
    position: absolute;
    top: 75%;
    color: green;
    font-family: $acumin;
    text-align: left;
  }
}
p {
  color: $bg;
  padding-top: 5em;
}
textarea,
input,
select {
  font-family: $acumin;
  color: white;
  @include body();
  border-style: hidden;
  background: none;
  resize: none;
  display: inline-block;
  width: 100%;
  &[type="submit"] {
    font-family: $suisse;
    @include title();
    text-align: left;
    display: inline-block;
    width: 100%;

    // float: left;
  }
}
.submit {
  width: 100%;
  position: relative;
  border-radius: 500px;
  border: 1px solid $bg;
  margin-top: 1em;
  .link {
    padding-left: 0.5em;
  }
  .arrow {
    // width: 6em;
    // float: right;
    position: absolute;
    right: 1em;
    top: 50%;
    transform: translateY(-50%);
    z-index: -1;
  }
}
label {
  font-family: $suisse;
  text-align: left;
  display: inline-block;
  padding-right: 1em;
}
*:focus {
  outline: none;
}
.row {
  display: flex;
  position: relative;
  padding: 1em 0;
  border-bottom: 1px solid $bg;
}
</style>
