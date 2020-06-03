<template>
  <div ref="contact" class="contact">
    <div class="contact-outer" ref="outer">
      <div class="wrapper" ref="wrap">
        <!-- <p>{{data.primary}}</p> -->
        <div class="info">
          <HeadText
            :title="$cms.textField(data.primary.contact_title)"
            :body="$cms.textField(data.primary.contact_body)"
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
                  required
                  :rows="item.textarea_line_count"
                  :name="$cms.textField(item.input_label)"
                  class="type"
                />
              </div>
            </transition>
            <div class="submit link focus">
              <input type="submit" class="link" value="submit" />
              <Arrow class="arrow" />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Scrolly from "./scrolly.js";

export default {
  name: "Template",
  components: {},
  props: {
    data: {
      type: Object,
      default: null
    },
    inview: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      newscroll: null,
      start: 0,
      startTouch: 0
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
      "scroll"
    ])
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
    },
    toggleScroll(mouseOn) {
      //ensure the scroll has already been made
      if (this.newscroll) {
        //if in view an d mouse is  over the element
        if (mouseOn && this.inview) {
          this.newscroll.listen();
          this.$emit("deafenGlobalScroll", true);

          //if themouse moves away,indicates i want to scroll away
        } else if (!mouseOn) {
          this.$refs.contact.removeEventListener("touchmove", this.touchmove);
          this.newscroll.deafen();
          this.$emit("deafenGlobalScroll", false);
        }
      }
    },
    touchstart(e) {
      this.$refs.contact.addEventListener("touchmove", this.touchmove);
      this.$refs.contact.addEventListener("touchend", this.touchend);
      this.start = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
      };
      this.startTouch = performance.now();
    },
    touchmove(e) {
      if (performance.now() < this.startTouch + 300) {
        return;
      }
      this.toggleScroll(true);

      if (
        Math.abs(e.changedTouches[0].clientX - this.start.x) >
        window.innerWidth / 4
      ) {
        e.stopPropagation();
        if (this.scroll.pos) {
          this.$emit(
            "scrollTo",
            this.scroll.pos + (this.start.x - e.changedTouches[0].clientX)
          );
        }
        this.toggleScroll(false);
        return;
      }
    },
    touchend() {
      this.$refs.contact.removeEventListener("touchmove", this.touchmove);
      this.toggleScroll(false);
    },
    initScroll() {
      if (this.winresize.userAgent.tablet) {
        //the possibility of vertical overflow on tablet / mobile. desktop - you can re-size. you can't stretch a tablet
        new Promise(res => {
          setTimeout(() => {
            //initiate scroll, then deafen immediately
            // console.log(
            //   this.$refs.wrap.offsetHeight,
            //   this.$refs.contact.offsetTop,
            //   window.innerHeight
            // );
            if (
              this.$refs.wrap.offsetHeight + this.$refs.contact.offsetTop >
              window.innerHeight
            ) {
              // console.log("do scroll");
              this.newscroll = new Scrolly(this.$refs.outer, "v");
              this.newscroll.deafen();
            }
            res();
          }, 500);
        }).then(() => {
          this.$refs.contact.addEventListener("touchstart", this.touchstart);
        });
      }
    }
  },
  mounted() {
    this.initScroll();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "./styles/stylesheet.scss";
.contact-outer {
  // height: calc(100% - #{$top});
  @include below($tablet) {
    height: 100%;
    position: fixed;
    width: 100vw;
    top: 0;
    margin-top: $top;
  }
}
.wrapper {
  @include below($tablet) {
    // height: 100%;
    width: 100%;
    position: absolute;
  }
}
.contact {
  // padding: 0 5em;

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
}
p {
  color: black;
  padding-top: 5em;
}
textarea,
input,
select {
  font-family: $acumin;
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
</style>
