export default class WaveText {
  constructor(arr) {
    this.strings = arr;

    this.strings.forEach(async (item) => {
      await this.doString(item);
    });
  }

  async doString(item) {
    this.isLink = item.link || false;
    console.log("islink", this.isLink);
    this.el = item.el;
    this.string = item.string;
    this.lerpTime = 0;
    this.breakApart()
      .then(this.inject(item.el, item.string))
      .then(this.transition(item.el, item.string, 0, item.delay));
  }

  async breakApart() {
    return new Promise((res) => {
      this.string.split("");
      res();
    });
  }

  async inject(el, string) {
    return new Promise((res) => {
      // if (this.isLink) {
      //   el.innerHTML += '<a class="wave-link" />';
      // }
      el.innerHTML = null;
      for (let i in string) {
        if (string[i] !== " ") {
          //if it's a letter
          el.innerHTML += `<span style="opacity: 0; transform: translateY(100%); display: inline-block;">${string[i]}</span>`;
        } else {
          //if it's a space
          el.innerHTML += `<span style="opacity: 0; transform: translateY(100%); ">${string[i]}</span>`;
        }
      }
      res();
    });
  }

  async transition(el, string, lerpTime, delay) {
    return new Promise((res) => {
      setTimeout(() => {
        for (let i in el.children) {
          if (
            el.children[i].style &&
            el.children[i].innerHTML !== " " &&
            el.children[i].nodeName !== "A"
          ) {
            lerpTime += Math.abs((lerpTime - 1) / 50);

            setTimeout(() => {
              el.children[i].style = `
            display: inline-block;
            transition: opacity 1s ease, transform .5s ease;
            opacity: 1;
            `;
            }, lerpTime * 1000);
          }
          // if (el.children[i].nodeName === "A") {
          //   el.children[i].style = this.linkStyle;
          //   console.log(el.children[i].style);
          // }
        }
        res();
      }, delay);
    });
  }
}
