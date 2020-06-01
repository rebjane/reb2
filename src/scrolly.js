import store from "./store.js";
// import Vue from "vue";

export default class Scrolly {
  constructor(el, direction) {
    this.deaf = false;
    this.direction = direction; //either v for vertical, or h for horizontal
    this.elParent = el;
    this.el = this.elParent.children[0];
    this.winresize();
    this.preDeafPos = null;
    this.pos = 0;
    this.dir = 0;
    this.isScrolling = false;
    this.scrollDestination = 0;
    // console.log(this.elParent, this.el);
    if (direction === "h") {
      this.max = this.el.offsetWidth - window.innerWidth;
    } else {
      this.max = this.el.offsetHeight - window.innerHeight;
    }
    this.prev = 0;
    console.log(this.el, this.el.offsetHeight);
    this.eventListeners = this.eventListeners.bind(this);
    this.scroll = this.scroll.bind(this);
    this.eventListeners();
    this.touchEventListeners();
  }

  scrollTo(destination) {
    this.scrollDestination = destination;
    if (!this.isScrolling) {
      this.scroll();
      this.isScrolling = true;
      this.deaf = false;
    }
  }

  touchEventListeners() {
    window.addEventListener("touchstart", (e) => {
      if (this.direction === "h") {
        this.start = e.changedTouches[0].pageX;
      } else {
        this.start = e.changedTouches[0].pageY;
      }
      e.stopPropagation();
    });
    window.addEventListener("touchmove", (e) => {
      if (this.deaf) {
        return;
      }
      var pos;
      if (this.direction === "h") {
        pos = e.changedTouches[0].pageX;
      } else {
        pos = e.changedTouches[0].pageY;
      }
      console.log(pos);
      if (pos > this.start) {
        this.dir = Math.abs(pos) / pos;
        this.scrollDestination -= Math.abs((pos - this.start) * 1.5);
      } else {
        this.dir = Math.abs(pos) / pos - this.start;
        this.scrollDestination += Math.abs((pos - this.start) * 1.5);
      }

      this.start = pos;

      this.scrollDestination = this.limit(this.scrollDestination, this.max);
      if (!this.isScrolling && !this.deaf) {
        this.scroll();
        this.isScrolling = true;
      }
      e.stopPropagation();
    });
  }

  eventListeners() {
    window.addEventListener("mousewheel", (e) => {
      if (this.deaf) {
        return;
      }
      if (e.deltaX && this.direction === "h") {
        this.dir = Math.abs(e.deltaX) / e.deltaX;
        this.scrollDestination += e.deltaX;
      }
      this.dir = Math.abs(e.deltaY) / e.deltaY;
      this.scrollDestination += e.deltaY;

      this.scrollDestination = this.limit(this.scrollDestination, this.max);
      if (!this.isScrolling && !this.deaf) {
        this.scroll();
        this.isScrolling = true;
      }
      e.stopPropagation();
    });
  }

  scroll() {
    this.pos += (this.scrollDestination - this.pos) / 20;
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
    // console.log(this.pos);
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

  winresize() {
    this.elWidth = this.elParent.children[0].getBoundingClientRect().width;
    this.elHeight = this.elParent.children[0].getBoundingClientRect().height;
    if (this.direction === "h") {
      this.max = this.el.offsetWidth - window.innerWidth;
    } else {
      this.max = this.el.offsetHeight - window.innerHeight;
    }
    // this.scrollTo(this.pos);
  }

  destroy() {
    cancelAnimationFrame(this.scroll);
    window.removeEventListener("mousewheel");
  }

  limit(min, max) {
    return Math.max(Math.min(min, max), 0);
  }
}
