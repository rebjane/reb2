var PrismicDOM = require("prismic-dom");
import Vue from "vue";

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
          console.log(this.res);
          res();
        })
        //after everything is done
        .then(() => {
          res("prismic all loaded");
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
