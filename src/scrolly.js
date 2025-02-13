import store from "./store.js";
// import Vue from "vue";

export default class Scrolly {
  constructor(el, direction) {
    this.deaf = false;
    this.direction = direction; //either v for vertical, or h for horizontal
    this.elParent = el;
    this.el = this.elParent.children[0];
    this.preDeafPos = 0;
    this.pos = 0;
    this.dir = 0;
    this.isScrolling = false;
    this.scrollDestination = 0;
    this.prev = 0;
    this.size();
    this.force = 20;

    // console.log(this.el, this.el.offsetHeight);
    this.eventListeners = this.eventListeners.bind(this);
    this.scroll = this.scroll.bind(this);
    this.eventListeners();
    this.touchEventListeners();
  }

  size() {
    this.elWidth = this.elParent.children[0].getBoundingClientRect().width;
    this.elHeight = this.elParent.children[0].getBoundingClientRect().height;
    if (this.direction === "h" || this.direction === "main") {
      this.max = this.el.offsetWidth - window.innerWidth;
    } else {
      // this.max =
      //   this.el.offsetHeight -
      //   (this.elParent.offsetHeight -
      //     Math.floor(window.innerHeight - this.elParent.offsetHeight));

      // this.max =
      //   this.el.offsetHeight + this.elParent.offsetTop * 2 - window.innerHeight;

      this.max = this.el.offsetHeight - window.innerHeight;

      // console.log(
      //   this.el.offsetHeight,
      //   ", ",
      //   this.elParent.offsetTop,
      //   ", ",
      //   window.innerHeight
      // );
      // console.log(this.max);
    }
  }

  scrollTo(destination, instantly) {
    this.instantly = instantly || false;
    this.scrollDestination = destination;
    if (!this.isScrolling && !this.instantly) {
      // console.log("d");
      this.scroll();
      this.isScrolling = true;
      this.deaf = false;
    }
  }

  touchEventListeners() {
    window.addEventListener("touchstart", (e) => {
      if (this.deaf) {
        //was originally (this.deaf && this.isScrolling) to make sure no 2 scrolls happen simultaneously ever, but the location of one was affecting the other to jump as soon as i "listened" to it (at least for desktop)
        return;
      }
      if (this.direction === "h" || this.direction === "main") {
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
      this.force = 10;

      var pos;
      if (this.direction === "h" || this.direction === "main") {
        pos = e.changedTouches[0].pageX;
      } else {
        pos = e.changedTouches[0].pageY;
      }
      if (pos > this.start) {
        // this.dir = Math.abs(pos) / pos;
        this.scrollDestination -= Math.abs((pos - this.start) * 1.5);
      } else {
        // this.dir = Math.abs(pos) / pos - this.start;
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
    var mouseEvent = "mousewheel";
    if (navigator.userAgent.includes("Firefox")) {
      //if firefox, because its fucking dumb ass wants to be different
      mouseEvent = "wheel";
    }

    window.addEventListener(mouseEvent, (e) => {
      if (this.deaf) {
        return;
      }
      this.force = 20;

      if (e.deltaX && (this.direction === "h" || this.direction === "main")) {
        this.dir = Math.abs(e.deltaX) / e.deltaX;
        this.scrollDestination += -e.deltaX;
      }
      // this.dir = Math.abs(e.deltaY) / e.deltaY;
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
    this.pos += (this.scrollDestination - this.pos) / this.force;
    this.pos = Number(this.pos.toFixed(2));
    if (this.pos > this.preDeafPos) {
      this.dir = 1;
    } else {
      this.dir = -1;
    }
    //stop from running animation frame if scroll is deafened and you come to a stop
    if (this.isScrolling && this.preDeafPos === this.pos) {
      this.isScrolling = false;
      cancelAnimationFrame(this.scroll);
      return;
    }

    requestAnimationFrame(this.scroll);

    this.preDeafPos = this.pos;
    switch (this.direction) {
      case "main": {
        // console.log("main pos", this.pos);
        store.commit("updateScroll", {
          type: "main",
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
    this.transform();
  }
  transform() {
    if (this.direction === "h" || this.direction === "main") {
      this.el.style.transform = `translate3d(${-1 * this.pos}px, 0,0)`; //horizontal
    } else {
      this.el.style.transform = `translate3d(0, ${-1 * this.pos}px,0)`; //vertical
    }
  }
  deafen() {
    this.deaf = true;
    // console.log("this.deaf", this.deaf);
  }

  listen() {
    this.deaf = false;
  }

  stop() {
    this.deaf = true;
    cancelAnimationFrame(this.scroll);
  }

  destroy() {
    cancelAnimationFrame(this.scroll);
    window.removeEventListener("mousewheel");
  }

  limit(min, max) {
    return Math.max(Math.min(min, max), 0);
  }
}
