import Axios from "axios";

export default class Paypal {
  constructor() {
    this.api();
  }
  api() {
    Axios.post("https://api.paypal.com").then((res) => {
      console.log(res);
    });
  }
}
