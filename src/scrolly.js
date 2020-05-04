import store from "./store.js";

export default class Scrolly {
  constructor(el) {
    this.elParent = el;
    this.el = this.elParent.children[0];
    this.elHeight = this.elParent.children[0].getBoundingClientRect().height;
    this.pos = 0;
    this.dir = 0;
    this.barHeight = 0;
    this.scrollTo = 0;
    this.barHeight = store.state.scrollBarHeight;
    this.scrollBarScrollIdx =
      this.elHeight / (window.innerHeight - this.barHeight);
    this.max = this.el.offsetHeight - window.innerHeight;
    this.eventListeners = this.eventListeners.bind(this);
    this.scroll = this.scroll.bind(this);
    this.eventListeners();
    this.scroll();

  }
  scrollFromScrollBar(scrollPos) {
    this.scrollTo = this.limit(scrollPos * this.scrollBarScrollIdx, this.max);
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

    store.commit("setScroll", this.pos.toFixed(2));
    this.el.style.transform = `translate3d(0,${-1 * this.pos}px,0)`;
    store.commit(
      "setScrollBarPos",
      ((window.innerHeight - this.barHeight) /
        (this.elHeight - window.innerHeight)) *
        this.pos
    );
  }
  limit(min, max) {
    return Math.max(Math.min(min, max), 0);
  }
}
