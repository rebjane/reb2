var PrismicDOM = require("prismic-dom");
import Vue from "vue";
import store from "./store.js";

class Prismic {
  constructor() {
    this.api = "https://reb2.cdn.prismic.io/api/v2";
    this.prismic = require("prismic-javascript");
  }
  async fetchData() {
    return new Promise((res) => {
      this.prismic
        .getApi(this.api)
        .then((api) => {
          return api.query("");
        })
        .then((response) => {
          this.res = response.results[0];
        })
        //after everything is done
        .then(() => {
          // setTimeout(() => {
          console.log(this.res);
          // store.commit(
          //   "setLoadPct",
          //   Vue.prototype.$loadPct((Vue.prototype.$loaded += 1))
          // );

          res("prismic all loaded");
          // }, 2000);
        });
    });
  }
}
export const prismic = new Prismic();

Vue.prototype.$cms = new (class CMSModule {
  text(field) {
    return PrismicDOM.RichText.asText(this.fields[field]);
  }

  textField(field) {
    return PrismicDOM.RichText.asText(field);
  }

  html(field) {
    return PrismicDOM.RichText.asHtml(this.fields[field]);
  }

  htmlField(field) {
    return PrismicDOM.RichText.asHtml(field);
  }
})();
