var PrismicDOM = require("prismic-dom");
import Vue from "vue";
// import store from "./store.js";

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
          this.data = response.results[0].data.body;
        })
        //after everything is done
        .then(() => {
          //IntroSection
          const introsection = new Promise((res) => {
            Vue.prototype.$introsection = {
              ...this.data.map((e) =>
                e.slice_type === "HomeOverlay" ? e : null
              )[0],
            };
            res(Vue.prototype.$introsection);
          });

          Promise.all([introsection]).then(() => res("prismic all loaded"));
        });
    });
  }
}
export const prismic = new Prismic();

Vue.prototype.$tag = (tag) => {
  switch (tag) {
    case "heading1":
      return "h1";
    case "heading2":
      return "h2";
    case "paragraph":
      return "p";
  }
};

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
