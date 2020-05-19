import store from "./store.js";

export default class Scrolly {
  constructor(el) {
    this.elParent = el;
    this.el = this.elParent.children[0];
    // this.elHeight = this.elParent.children[0].getBoundingClientRect().height;
    this.elWidth = this.elParent.children[0].getBoundingClientRect().width;
    console.log("this.elWidth", this.elWidth);
    this.pos = 0;
    this.dir = 0;
    this.barHeight = 0;
    this.scrollTo = 0;
    this.barHeight = store.state.scrollBarHeight;
    // this.scrollBarScrollIdx =
    //   this.elHeight / (window.innerHeight - this.barHeight);
    this.scrollBarScrollIdx =
      this.elWidth / (window.innerWidth - this.barHeight);
    // this.max = this.el.offsetHeight - window.innerHeight;
    // this.max = this.el.offsetWidth - window.innerWidth;
    this.max = this.el.offsetWidth;

    this.eventListeners = this.eventListeners.bind(this);
    this.scroll = this.scroll.bind(this);
    this.eventListeners();
    this.scroll();
  }
  scrollFromScrollBar() {
    //scrollPos
    // this.scrollTo = this.limit(scrollPos * this.scrollBarScrollIdx, this.max);
  }

  eventListeners() {
    window.addEventListener("mousewheel", (e) => {
      // this.dir = Math.abs(e.deltaY) / e.deltaY;
      // this.scrollTo += e.deltaY;
      // store.commit("setScrollForce", Math.abs(e.deltaY));
      this.dir = Math.abs(e.deltaY) / e.deltaY;
      this.scrollTo += e.deltaY;

      store.commit("setScrollForce", Math.abs(e.deltaY));
      store.commit("setScrollDir", this.dir);

      this.scrollTo = this.limit(this.scrollTo, this.max);
      e.stopPropagation();
    });
  }

  scroll() {
    requestAnimationFrame(this.scroll);

    this.pos += (this.scrollTo - this.pos) / 20;

    store.commit("setScroll", this.pos.toFixed(2));
    // this.el.style.transform = `translate3d(0,${-1 * this.pos}px,0)`; //vertical
    this.el.style.transform = `translate3d(${-1 * this.pos}px, 0,0)`; //horizontal

    // store.commit(
    //   "setScrollBarPos",
    //   ((window.innerHeight - this.barHeight) /
    //     (this.elHeight - window.innerHeight)) *
    //     this.pos
    // );
    store.commit(
      "setScrollBarPos",
      ((window.innerWidth - this.barHeight) /
        (this.elWidth - window.innerWidth)) *
        this.pos
    );
  }
  limit(min, max) {
    return Math.max(Math.min(min, max), 0);
  }
}
