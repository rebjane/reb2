<template>
  <div ref="page" class="contact">
    <!-- <p>{{data.primary}}</p> -->
    <div class="info">
      <HeadText
        :title="$cms.textField(data.primary.contact_title)"
        :body="$cms.textField(data.primary.contact_body)"
      />
    </div>
    <div class="form">
      <form class="form-inner" ref="form" @submit.prevent="doSubmit">
        <transition v-for="(item, i) in data.items" :key="i">
          <div class="row">
            <label :for="$cms.textField(item.input_label)">{{$cms.textField(item.input_label)}}</label>
            <input
              v-if="item.input_type !== 'textarea'"
              :pattern="item.regex.length ? $cms.textField(item.regex) :null"
              required
              :type="item.input_type"
              :name="$cms.textField(item.input_label)"
            />

            <textarea
              v-else
              :pattern="item.regex.length ? $cms.textField(item.regex) :null"
              required
              :rows="item.textarea_line_count"
              :name="$cms.textField(item.input_label)"
            />
          </div>
        </transition>
        <div class="submit link">
          <input type="submit" class="link" value="submit" />
          <Arrow class="arrow" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Template",
  components: {},
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      scroll: null
    };
  },
  beforeDestroy() {},
  computed: {
    ...mapState(["signatureLoaded", "loadPct", "loaded", "navOpen"])
  },
  methods: {
    doSubmit(e) {
      new Promise(res => {
        var message = "";
        e.target.forEach(field => {
          if (field.value !== "Submit") {
            message += `${field.name} : ${field.value}<br/>`;
          }
        });
        res(message);
      }).then(msg =>
        this.$smtp
          .send({
            // Host: "smtp.gmail.com",
            // Username: "rebjanec@gmail.com",
            // Password: "gingstergangsteryoyoha",
            SecureToken: "d0125a86-9991-42dd-8bc1-3e6a30fff61b",
            To: "rebjanec@gmail.com",
            From: "rebjanec@gmail.com",
            Subject: "From Website",
            Body: msg
          })
          .then(() => {
            this.$refs.form.reset();
          })
      );
    }
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "./styles/stylesheet.scss";
.contact {
  padding: 0 5em;
  height: 100%;
}
.info {
  position: relative;
  //   display: inline-block;
  width: 50%;
  height: 100%;
  float: left;
}
p {
  color: black;
  padding-top: 5em;
}
textarea,
input,
select {
  font-family: $acumin;
  font-size: 14px;
  border-style: hidden;
  background: none;
  resize: none;
  display: inline-block;
  width: 100%;
  &[type="submit"] {
    font-family: $suisse;
    font-size: 50px;
    text-align: left;
    display: inline-block;
    width: 100%;

    // float: left;
  }
}
.submit {
  width: 100%;
  position: relative;
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
.form {
  //   display: inline-block;
  width: 40%;
  height: 100%;
  position: relative;
  float: left;
  .form-inner {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
  span {
    width: 100%;
  }
}
</style>
