export default class WaveText {
  constructor(arr, mode) {
    this.mode = mode || null;
    this.strings = arr;
    this.removePrev = arr.removePrev || false;

    // for each string
    this.strings.forEach(async (item) => {
      await this.doString(item);
    });
  }

  async doString(item) {
    this.removePrev = item.removePrev || false;
    this.isLink = item.link || false;
    this.el = item.el;
    this.string = item.string;
    this.lerpTime = 0;
    console.log("el", this.el);
    if (this.mode !== "exit") {
      this.breakApart()
        .then(this.inject(item.el, item.string))
        .then(this.transition(item.el, 0, item.delay));
    } else {
      this.transitionOut(this.el, 0, item.delay);
    }
  }

  // return each string as an array of characters
  async breakApart() {
    return new Promise((res) => {
      this.string.split("");
      res();
    });
  }

  // inject each character invisibly in the element
  async inject(el, string) {
    return new Promise((res) => {
      //remove previous / reset
      if (this.removePrev) {
        el.innerHTML = null;
      }

      //for each character
      for (let i in string) {
        if (string[i] !== " ") {
          //if it's a letter, it's inline block.
          el.innerHTML += `<span style="opacity: 0; transform: translateY(100%); display: inline-block;">${string[i]}</span>`;
        } else {
          //if it's a space, no inline-block (because the width by default sets to 0, therefore leaving no spaces visible in the word)
          el.innerHTML += `<span style="opacity: 0; transform: translateY(100%); ">${string[i]}</span>`;
        }
      }
      res();
    });
  }

  async transition(el, lerpTime, delay) {
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
          if (el.children[i].nodeName === "A") {
            var a = el.children[i];
          }
        }
        if (a) {
          a.style = "width: 100%; transition-delay: 100ms;";
        }
        res();
      }, delay);
    });
  }
  async transitionOut(el, lerpTime, delay) {
    return new Promise((res) => {
      setTimeout(() => {
        for (let i = el.children.length - 1; i >= 0; i--) {
          if (
            el.children[i].style &&
            el.children[i].innerHTML !== " " &&
            el.children[i].nodeName !== "A"
          ) {
            lerpTime += Math.abs((lerpTime - 1) / 50);

            setTimeout(() => {
              el.children[i].style = `
            display: inline-block;
            transition: opacity .5s ease, transform .5s ease;
            opacity: 0;
            transform: translateY(100%);
            `;
            }, lerpTime * 1000);
          }
          if (el.children[i].nodeName === "A") {
            var a = el.children[i];
          }
        }
        if (a) {
          a.style = "width: 0%; transition-delay: 100ms;";
        }
        res();
      }, delay);
    });
  }
}
