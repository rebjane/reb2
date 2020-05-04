<template>
  <div ref="image" class="ripple-image"></div>
</template>

<script>
import * as PIXI from "pixi.js";
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
  data() {
    return {
      app: new PIXI.Application(),
      ripple: require("../assets/ripple.jpg"),
      amt: 0,
      displacementSprite: null,
      displacementFilter: null,
      stage: new PIXI.Container(),
      renderer: PIXI.autoDetectRenderer({ transparent: true }),
      posX: 0,
      posY: 0,
      amtX: 0,
      amtY: 0,
      ripples: [],
      image: null
    };
  },
  beforeDestroy() {
    PIXI.utils.clearTextureCache();
    this.$refs.image.removeEventListener("mousemove", this.doRipple);
    cancelAnimationFrame(this.render);
  },
  methods: {
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
      if (this.$refs.image) {
        this.$refs.image.addEventListener("mousemove", this.doRipple);
        this.$refs.image.addEventListener("mouseleave", this.stopRipple);
      }

      //Render frames
      this.render();
    },
    render() {
      this.amtX = this.posX;
      this.amtY = this.posY;
      //   console.log(this.amtX);
      this.displacementSprite.x = this.amtX;
      this.displacementSprite.y = this.amtY;
      this.displacementSprite.scale.x += 0.01;
      this.displacementSprite.x -= 1;

      this.displacementSprite.scale.y += 0.01;
      this.displacementSprite.y -= 1;

      this.stage.filters = [this.displacementFilter];
      this.renderer.render(this.stage);
      if (this.mouseOff) {
        cancelAnimationFrame(this.render);
      } else {
        requestAnimationFrame(this.render);
      }
    },

    doRipple(e) {
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
  },
  mounted() {
    this.$nextTick(() => {
      this.init();
    });
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
