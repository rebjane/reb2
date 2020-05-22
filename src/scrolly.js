import store from "./store.js";
// import Vue from "vue";

export default class Scrolly {
  constructor(el, direction) {
    this.deaf = false;
    this.direction = direction; //either v for vertical, or h for horizontal
    this.elParent = el;
    this.el = this.elParent.children[0];
    this.elWidth = this.elParent.children[0].getBoundingClientRect().width;
    this.elHeight = this.elParent.children[0].getBoundingClientRect().height;
    this.preDeafPos = null;
    this.pos = 0;
    this.dir = 0;
    this.isScrolling = false;
    this.scrollTo = 0;
    if (direction === "h") {
      this.max = this.el.offsetWidth - window.innerWidth;
    } else {
      this.max = this.el.offsetHeight - window.innerHeight;
    }
    this.eventListeners = this.eventListeners.bind(this);
    this.scroll = this.scroll.bind(this);
    this.eventListeners();
  }

  eventListeners() {
    window.addEventListener("mousewheel", (e) => {
      if (this.deaf) {
        return;
      }
      if (!this.isScrolling && !this.deaf) {
        this.scroll();
        this.isScrolling = true;
      }

      this.dir = Math.abs(e.deltaY) / e.deltaY;

      this.scrollTo += e.deltaY;

      this.scrollTo = this.limit(this.scrollTo, this.max);
      e.stopPropagation();
    });
  }

  scroll() {
    this.pos += (this.scrollTo - this.pos) / 20;
    this.pos = Number(this.pos.toFixed(2));
    //stop from running animation frame if scroll is deafened and you come to a stop
    if (this.isScrolling && this.preDeafPos === this.pos) {
      this.isScrolling = false;
      cancelAnimationFrame(this.scroll);
      return;
    }

    requestAnimationFrame(this.scroll);

    this.preDeafPos = this.pos;
    switch (this.direction) {
      case "h": {
        store.commit("updateScroll", {
          pos: this.pos,
          dir: this.dir,
          elWidth: this.elWidth,
          elHeight: this.elHeight,
          direction: this.direction,
          el: this.el,
        });
        break;
      }
      case "v": {
        store.commit("updateVertScroll", {
          pos: this.pos,
          dir: this.dir,
          elWidth: this.elWidth,
          elHeight: this.elHeight,
          direction: this.direction,
          el: this.el,
        });
        break;
      }
    }

    if (this.direction === "h") {
      this.el.style.transform = `translate3d(${-1 * this.pos}px, 0,0)`; //horizontal
    } else {
      this.el.style.transform = `translate3d(0, ${-1 * this.pos}px,0)`; //vertical
    }
  }

  deafen() {
    this.deaf = true;
  }

  listen() {
    this.deaf = false;
  }

  limit(min, max) {
    return Math.max(Math.min(min, max), 0);
  }
}
