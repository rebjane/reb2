<template>
  <div class="work-nav-menu">
    <div class="back link" @click="handlePrevPage">
      <div class="arrow-wrap">
        <Arrow class="arrow up" :fill="'white'" />
      </div>
      <p>BACK</p>
    </div>

    <router-link to="/">
      <div class="home-link-outer">
        <div class="home-link">
          <Reb2Logo class="logo" />
          <!-- <p>HOME</p> -->
        </div>
      </div>
    </router-link>

    <div class="next link" @click="handleNextPage">
      <p>NEXT</p>
      <div class="arrow-wrap">
        <Arrow class="arrow down" :fill="'white'" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "WorkPageNavMenu",
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  computed: {
    ...mapState(["wpindex"])
  },
  watch: {
    wpindex() {
      this.count = this.wpindex.i;
    }
  },
  data() {
    return {
      nextWorkLink: "/",
      count: 0
    };
  },
  methods: {
    handlePrevPage() {
      this.$router.go(-1);
    },
    handleNextPage() {
      if (this.count === this.wpindex.data.length - 1) {
        this.count = -1;
      }
      this.count++;
      this.$router.push({
        path: `/${this.wpindex.data[this.count].type_of_work}/${
          this.wpindex.data[this.count].uid
        }`
      });
    }
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../styles/stylesheet.scss";

.arrow-wrap {
  //   height: 3em;
  width: 20px;
  @include above($tablet) {
    width: 8vw;
    min-width: 100px;
    padding: 0;
  }
  // @include above($tablet) {
  //   width: 30px;
  //   margin: 2em 0 2em -1em;
  // }
  padding-right: 0.5em;

  margin: 2em 0;
}
// .back,
// .next {
//   border-right: 3px solid white;
// }
.back,
.next,
.home-link {
  // margin: 0 2em;
  mix-blend-mode: difference;
  @include above($tablet) {
    // margin-right: 2em;
    padding-right: 1em;
  }
  padding-right: 0.5em;

  // @include below($tablet) {
  //   margin-left: 1em;
  //   margin-right: 1em;
  // }
  // cursor: pointer;
  //   height: 50%;
  padding-left: 1em;

  p {
    writing-mode: vertical-lr;
    transform: rotate(180deg);
    margin: auto;
    font-family: $acuminc;
    color: white;
    @include body();
  }
}
.home-link {
  width: 40px;
  @include below($tablet) {
    width: 30px;
  }
  @include above($tablet) {
    padding-right: 1em;
  }
  padding-right: 0.5em;
}
.back {
  @include above($tablet) {
    width: 8vw;
    min-width: 100px;
    padding: 0;
  }
  position: fixed;

  top: 0;
  .arrow {
    transform: rotate(-90deg);
    @include above($tablet) {
      margin: auto;
    }
  }
}
.home-link {
  top: 50%;
  transform: translateY(-50%);
}
.next {
  position: fixed;

  @include above($tablet) {
    width: 8vw;
    min-width: 100px;
    padding: 0;
  }
  bottom: 0;
  .arrow {
    transform: rotate(90deg);
    @include above($tablet) {
      margin: auto;
    }
  }
}
.home-link-outer {
  @include above($tablet) {
    width: 8vw;
    min-width: 100px;
    padding: 0;
  }
  position: absolute;
  top: 50%;
  .home-link {
    margin: auto;
  }
}
</style>
