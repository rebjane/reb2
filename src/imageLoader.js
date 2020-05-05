class LoadedImage {
  constructor() {}

  async getObj(src) {
    return new Promise((res) => {
      this.src = src;
      this.assign().then((i) => {
        res({
          img: this.img,
          src: this.src,
          width: i.width,
          height: i.height,
        });
      });
    });
  }

  async assign() {
    return new Promise((res) => {
      this.img = new Image();
      this.img.src = this.src;
      this.img.onload = () => {
        var height = this.img.height;
        var width = this.img.width;
        res({ height: height, width: width });
      };
    });
  }
}
export const imageLoader = new LoadedImage();
