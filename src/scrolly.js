import store from "./store.js";
// import Vue from "vue";

export default class Scrolly {
  constructor(el, direction) {
    this.deaf = false;
    this.direction = direction; //either v for vertical, or h for horizontal
    this.elParent = el;
    this.el = this.elParent.children[0];
    // this.elHeight = this.elParent.children[0].getBoundingClientRect().height;
    this.elWidth = this.elParent.children[0].getBoundingClientRect().width;
    this.elHeight = this.elParent.children[0].getBoundingClientRect().height;

    this.pos = 0;
    this.dir = 0;
    this.scrollTo = 0;
    if (direction === "h") {
      this.max = this.el.offsetWidth - window.innerWidth;
    } else {
      this.max = this.el.offsetHeight - window.innerHeight;
    }
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
    if (!this.deaf) {
      requestAnimationFrame(this.scroll);
    } else {
      cancelAnimationFrame(this.scroll);
      return;
    }
    this.pos += (this.scrollTo - this.pos) / 20;

    store.commit("updateScroll", {
      pos: Number(this.pos.toFixed(2)),
      dir: this.dir,
      elWidth: this.elWidth,
      elHeight: this.elHeight,
      direction: this.direction,
      el: this.el,
    });

    // Vue.set("scroll", {
    //   pos: Number(this.pos.toFixed(2)),
    //   dir: this.dir,
    //   elWidth: this.elWidth,
    //   elHeight: this.elHeight,
    //   direction: this.direction,
    //   el: this.el,
    // });

    // this.el.style.transform = `translate3d(0,${-1 * this.pos}px,0)`; //vertical
    // console.log(store.state.scroll.direction);
    if (this.direction === "h") {
      this.el.style.transform = `translate3d(${-1 *
        Number(this.pos.toFixed(2))}px, 0,0)`; //horizontal
    } else {
      this.el.style.transform = `translate3d(0, ${-1 *
        Number(this.pos.toFixed(2))}px,0)`; //vertical
    }
  }

  deafen() {
    console.log("deafen");
    this.deaf = true;
  }

  listen() {
    this.deaf = false;
  }

  limit(min, max) {
    return Math.max(Math.min(min, max), 0);
  }
}
