import store from "./store.js";
export default class Scrolly {
  constructor(el) {
    this.elParent = el;
    this.el = this.elParent.children[0];
    // this.elHeight = this.elParent.children[0].getBoundingClientRect().height;
    this.elWidth = this.elParent.children[0].getBoundingClientRect().width;

    this.pos = 0;
    this.dir = 0;
    this.scrollTo = 0;
    this.max = this.el.offsetWidth;

    this.eventListeners = this.eventListeners.bind(this);
    this.scroll = this.scroll.bind(this);
    this.eventListeners();
    this.scroll();
  }

  eventListeners() {
    window.addEventListener("mousewheel", (e) => {
      this.dir = Math.abs(e.deltaY) / e.deltaY;

      this.scrollTo += e.deltaY;

      this.scrollTo = this.limit(this.scrollTo, this.max);
      e.stopPropagation();
    });
  }

  scroll() {
    requestAnimationFrame(this.scroll);

    this.pos += (this.scrollTo - this.pos) / 20;

    store.commit("setScroll", {
      pos: Number(this.pos.toFixed(2)),
      dir: this.dir,
      elWidth: this.elWidth,
    });
    // this.el.style.transform = `translate3d(0,${-1 * this.pos}px,0)`; //vertical
    this.el.style.transform = `translate3d(${-1 * this.pos}px, 0,0)`; //horizontal
  }
  limit(min, max) {
    return Math.max(Math.min(min, max), 0);
  }
}
