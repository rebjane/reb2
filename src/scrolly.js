import store from "./store.js";

export default class Scrolly {
  constructor(el) {
    this.elParent = el;
    this.el = this.elParent.children[0];
    this.pos = 0;
    this.dir = 0;
    this.scrollTo = 0;
    this.max = this.el.offsetHeight - window.innerHeight;
    this.eventListeners = this.eventListeners.bind(this);
    this.scroll = this.scroll.bind(this);
    this.eventListeners();
    this.scroll();
  }

  eventListeners() {
    window.addEventListener("mousewheel", (e) => {
      // e.preventDefault();
      this.dir = Math.abs(e.deltaY) / e.deltaY;
      // this.scrollTo = Math.floor(this.pos + e.deltaY) + 10;
      this.scrollTo += e.deltaY;
      this.scrollTo = this.limit(this.scrollTo, this.max);
      e.stopPropagation();
    });
  }

  scroll() {
    requestAnimationFrame(this.scroll);

    this.pos += (this.scrollTo - this.pos) / 20;
    store.commit("setScroll", this.pos.toFixed(2));

    this.el.style.transform = `translate3d(0,${-1 * this.pos}px,0)`;
  }
  limit(min, max) {
    return Math.max(Math.min(min, max), 0);
  }
}
