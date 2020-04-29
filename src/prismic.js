import axios from "axios";

class Prismic {
  constructor() {
    this.api = "https://rebecca.cdn.prismic.io/api/v2";
  }
  async fetchData() {
    return new Promise((res) => {
      axios
        .get(this.api)
        .then((r) => {
          console.log("loading prismic", r);
          this.res = r;
        })
        .then(() => {
          res("prismic", this.res);
        });
    });
  }
}
export const prismic = new Prismic();
