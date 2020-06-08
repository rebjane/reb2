import axios from "axios";
export default class Time {
  constructor() {
    // this.ipAPI = "https://api.ipify.org?format=json";
    this.api = `https://worldtimeapi.org/api/ip`;
    this.callAPI();
    this.time = 0;
    this.start = 0;
    this.timeString = "";
    // setInterval(this.renderTime, 1000);
  }
  async callAPI() {
    this.time = await new Promise((res) => {
      axios.get(this.api).then((time) => {
        var formattedTime = time.data.datetime
          .split("")
          .splice(11, 8)
          .join("")
          .split(":")
          .map((num) => num - 0);

        // formattedTime = [11, 9, 55]; debug
        // console.log(formattedTime);
        res(formattedTime);
      });
    });
    // console.log(this.time);
    setInterval(this.renderTime.bind(this), 1000);
  }
  renderTime() {
    this.time[2] += 1;
    var m = "AM";

    //seconds
    if (this.time[2] > 59) {
      this.time[2] = 0;
      this.time[1] += 1;
    }
    //mins
    if (this.time[1] > 59) {
      this.time[1] = 0;
      this.time[0] += 1;
    }
    //hours
    if (this.time[0] > 23) {
      this.time[0] = 0;
    }
    // var seconds = this.time[2];
    var minutes = this.time[1];
    var hours = this.time[0];

    //seconds
    // if (this.time[2] < 10) {
    //   // seconds = `0${this.time[2]}`;
    // }
    //mins
    if (this.time[1] < 10) {
      minutes = `0${this.time[1]}`;
    }
    //hours
    if (this.time[0] < 10) {
      hours = `0${this.time[0]}`;
    }

    if (this.time[0] >= 12) {
      m = "PM";
    }
    // this.timeString = `${this.time[0]}:${this.time[1]}:${seconds}`;
    this.timeString = `${hours}:${minutes} ${m}`;
  }
}
