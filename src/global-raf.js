const DEBUG = false;

class GlobalRAF {
  debug() {
    if (DEBUG) {
      console.log(...arguments);
    }
  }

  constructor() {
    this.init();
  }

  init() {
    if (this.inited) {
      return;
    }

    this.inited = true;
    this.stopped = true;
    this.callbacks = [];
    this.tick = this.tick.bind(this);
  }

  start() {
    if (!this.stopped) {
      return;
    }

    this.stopped = false;
    this.now = performance.now();
    this.tick();
  }

  stop() {
    this.stopped = true;
  }

  tick() {
    if (this.stopped) {
      return;
    }

    let now = performance.now();

    let d = now - this.now;
    this.callbacks.forEach((x) => {
      try {
        x.f(d);
      } catch (e) {
        this.debug("Error in global RAF", x.name, e);
      }
    });
    this.now = now;

    requestAnimationFrame(this.tick);
  }

  add(f, name) {
    // if (!name) {
    // 	console.trace();
    // }

    if (!this.has(f)) {
      this.callbacks.push({ f, name });
    }

    if (this.stopped) {
      this.start();
    }
    this.callbacks.map((x) => x.name);
    // console.log(`add ${name}`, this.callbacks.map((x) => x.name));
  }

  remove(f) {
    this.callbacks = this.callbacks.filter((x) => x.f !== f);

    this.debug(
      "remove",
      this.callbacks.map((x) => x.name)
    );
  }

  has(f) {
    return this.callbacks.includes(f);
  }
}

let ret = new GlobalRAF();

export default ret;
