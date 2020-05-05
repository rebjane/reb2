<template>
  <div ref="image" class="ripple-image"></div>
</template>

<script>
import * as PIXI from "pixi.js";
import { mapState } from "vuex";

export default {
  name: "Template",
  props: {
    img: {
      type: String,
      default: ""
    },
    resize: {
      type: Object
    }
  },
  watch: {
    resize: {
      handler(obj) {
        // console.log(obj.width);
        if (this.renderer) {
          this.renderer.resize(obj.canvasWidth, obj.canvasHeight);
          this.renderer.view.style = `transform: scale(${obj.scale}); transform-origin: top left; position:absolute; top: ${obj.canvasTop}px;left: ${obj.canvasLeft}px;`;
          // obj.canvasLeft
        }
        if (this.image) {
          this.image.height = obj.imgHeight;
          this.image.width = obj.imgWidth;
        }
      },
      immediate: true
    }
  },
  computed: {
    ...mapState(["scroll"])
  },
  data() {
    return {
      // app: new PIXI.Application(),
      // ripple: require("../assets/ripple.jpg"),
      // amt: 0,
      // displacementSprite: null,
      // displacementFilter: null,
      // stage: new PIXI.Container(),
      // renderer: PIXI.autoDetectRenderer({ transparent: true }),
      // posX: 0,
      // posY: 0,
      // amtX: 0,
      // amtY: 0,
      // ripples: [],
      // image: null
      app: null,
      ripple: null,
      amt: null,
      displacementSprite: null,
      displacementFilter: null,
      stage: null,
      renderer: null,
      posX: 0,
      posY: 0,
      amtX: 0,
      amtY: 0,
      ripples: [],
      image: null,
      toggleRipple: true
    };
  },
  beforeMount() {
    this.app = new PIXI.Application();
    this.ripple = require("../assets/ripple.jpg");
    this.amt = 0;
    this.displacementSprite = null;
    this.displacementFilter = null;
    this.stage = new PIXI.Container();
    this.renderer = PIXI.autoDetectRenderer({ transparent: true });
    this.posX = 0;
    this.posY = 0;
    this.amtX = 0;
    this.amtY = 0;
    this.ripples = [];
    this.image = null;
    this.$nextTick(() => {
      this.init();
    });
  },
  mounted() {},

  beforeDestroy() {
    this.destroy();
  },

  methods: {
    async destroy() {
      return new Promise(res => {
        this.$refs.image.removeEventListener("mousemove", this.doRipple);
        cancelAnimationFrame(this.render);
        PIXI.utils.clearTextureCache();
        this.displacementSprite.destroy();
        this.displacementFilter.destroy();
        this.image.destroy();
        this.stage.removeChildren();
        this.stage.destroy();
        this.app.stage.removeChild(this.stage);
        this.app.stage.destroy();
        this.app.destroy();
        this.renderer.destroy();
        res();
      });
    },
    init() {
      this.$refs.image.appendChild(this.renderer.view);
      this.app.interactive = true;
      this.app.stage.addChild(this.stage);

      this.app.loader
        .add(this.ripple)
        .add(this.img)
        .load(this.setup);
    },
    setup() {
      //set Main image
      var imagePrev = PIXI.Texture.from(this.img);
      this.image = new PIXI.Sprite(imagePrev);
      // this.image.anchor.x = 0;
      this.image.height = this.resize.canvasHeight;
      this.image.width = this.resize.imgWidth;

      //Set Displacement (ripple)
      this.displacementSprite = new PIXI.Sprite(
        this.app.loader.resources[this.ripple].texture
      );
      this.displacementSprite.texture.baseTexture.wrapMode =
        PIXI.WRAP_MODES.REPEAT;
      this.displacementFilter = new PIXI.filters.DisplacementFilter(
        this.displacementSprite
      );
      this.displacementSprite.anchor.x = 0.5;
      this.displacementSprite.anchor.y = 0.75;

      this.displacementFilter.autofit = false;
      this.displacementSprite.scale.x = 0.5;
      this.displacementSprite.scale.y = 0.5;
      //   this.displacementSprite.anchor.set(0.5);
      //   this.displacementSprite.x = this.app.renderer.width / 2;
      //   this.displacementSprite.y = this.app.renderer.height / 2;
      //   this.stage.filters = [this.displacementFilter];

      //Add to scene
      this.stage.addChild(this.displacementSprite);
      this.stage.addChild(this.image);

      //Add mouse listener
      if (this.$refs.image.children[0]) {
        this.$refs.image.children[0].addEventListener("mouseover", () => {
          this.toggleRipple = true;
          this.render();
        });
        this.$refs.image.children[0].addEventListener(
          "mousemove",
          this.doRipple
        );
        this.$refs.image.children[0].addEventListener(
          "mouseleave",
          this.stopRipple
        );
      }

      //Render frames
      // this.render();
    },
    stopRipple() {
      cancelAnimationFrame(this.render);
      setTimeout(() => {
        this.toggleRipple = false;
      });
    },
    render() {
      //   console.log(this.amtX);
      if (
        this.stage &&
        this.renderer &&
        this.displacementSprite &&
        this.displacementFilter &&
        this.toggleRipple
      ) {
        this.amtX = this.posX;
        this.amtY = this.posY;
        this.displacementSprite.x = this.amtX;
        this.displacementSprite.y = this.amtY;
        this.displacementSprite.scale.x += 0.01;
        this.displacementSprite.x -= 1;

        this.displacementSprite.scale.y += 0.01;
        this.displacementSprite.y -= 1;

        this.stage.filters = [this.displacementFilter];
        this.renderer.render(this.stage);
        requestAnimationFrame(this.render);
      }
    },

    doRipple(e) {
      this.toggleRipple = true;
      this.posX = e.clientX;
      this.posY = e.clientY;
      // console.log(this.displacementSprite);
      // console.log(this.posX);
      this.ripples.push({
        timeStart: performance.now(),
        x: e.clientX,
        y: e.clientY
      });
      this.displacementSprite.scale.x = 0.5;
      this.displacementSprite.scale.y = 0.5;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../styles/stylesheet.scss";
.ripple-image {
  display: inline-block;
  width: 100%;
  height: 100%;
  position: relative;
}
canvas {
  height: 100% !important;
  width: 100% !important;
}
</style>
