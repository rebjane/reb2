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
          return api.query("", { pageSize: 100 });
        })
        .then((response) => {
          this.data = response.results;
          // console.log("data", this.data);

          this.homepage = this.data.filter(
            (e) => e.type === "home_page"
          )[0].data.body;
        })
        //after everything is done
        .then(() => {
          //WorkSection Section
          const WorkSectionSection = new Promise((res) => {
            Vue.prototype.$work = this.data
              .filter((i) => i.type === "work")
              .map((i) => {
                // console.log(i.uid);
                return { ...new Object(i.data), ...{ uid: i.uid } };
              });
            // console.log("work rendered in prismic", Vue.prototype.$work);
            res(Vue.prototype.$work);
          });

          //Scrollbar Nav
          const HomeNav = new Promise((res) => {
            Vue.prototype.$nav = this.data
              .filter((e) => e.type === "home_page")[0]
              .data.body.map((i) => {
                return {
                  title: Vue.prototype.$cms.textField(i.primary.nav_title),
                };
              });
            res(Vue.prototype.$nav);
          });

          //Socials Nav
          const NavSocials = new Promise((res) => {
            Vue.prototype.$navsocials = this.data.filter(
              (e) => e.type === "navsocials"
            )[0].data.links;
            // console.log(Vue.prototype.$navsocials);
            res(Vue.prototype.$navsocials);
          });

          //HomeOverlay
          const HomeSlices = new Promise((res) => {
            Vue.prototype.$home = this.data.filter(
              (e) => e.type === "home_page"
            )[0].data.body;
            res(Vue.prototype.$home);
          });

          Promise.all([
            WorkSectionSection,
            HomeNav,
            NavSocials,
            HomeSlices,
          ]).then(() => res("prismic all loaded"));
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
