<template>
  <div class="signature" ref="signature">
    <div class="canvas-wrap" ref="wrap">
      <canvas ref="canvas" class="canvas" />
    </div>
  </div>
</template>

<script>
import * as THREE from "../../node_modules/three/build/three.module.js";
// import { GLTFLoader } from "../../node_modules/three/examples/jsm/loaders/GLTFLoader.js";
import { AnimationMixer } from "../../node_modules/three/src/animation/AnimationMixer.js";

// import signature from "../assets/reb2.o-animated-BAKED.gltf";
import texMap from "../assets/reb-gradient.jpg";
import bumpmap from "../assets/frosted-glass-texture.jpg";
import envmap from "../assets/studio-envMap.jpg";
import { mapState } from "vuex";

export default {
  name: "Signature",
  props: {},
  computed: {
    ...mapState(["winresize"])
  },
  watch: {
    winresize() {
      this.resize();
    }
  },
  data() {
    var camera;
    var scene;
    var renderer;
    var geometry;
    var material;
    var mesh;
    var texture;
    return {
      camera,
      scene,
      renderer,
      geometry,
      material,
      mesh,
      clock: new THREE.Clock(),
      objs: [],
      texture,
      raycaster: new THREE.Raycaster(),
      mouse: new THREE.Vector2(1, 1),
      intersects: [],
      allChildren: [],
      animFinished: false,
      mousePos: { x: null, y: null },
      animX: 0,
      animY: 0,
      when: performance.now(),
      sig: this.$gltf,
      startnewscale: Math.min(0.85, window.innerWidth / 1000),
      newscale: Math.min(1, window.innerWidth / 1000)
    };
  },

  methods: {
    mouseListener() {
      window.addEventListener("mousemove", e => {
        this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        // this.when = performance.now();
        // console.log("x: ", this.mouse.x, " y: ", this.mouse.y);
      });
    },
    resize() {
      this.startnewscale = Math.min(0.85, window.innerWidth / 1000);
      // console.log(this.startnewscale);
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.sig.scene.scale.set(this.startnewscale, this.startnewscale, 0.5);
      this.renderer.render(this.scene, this.camera);
    },
    init() {
      //CAMERA
      this.camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        0.01,
        1000
      );
      this.camera.position.set(0, 0, 7);

      //SCENE
      this.scene = new THREE.Scene();

      this.lights();

      //RENDERER
      this.renderer = new THREE.WebGLRenderer({
        canvas: this.$refs.canvas,
        antialias: true,
        wireframe: true,
        alpha: true
      });
      this.renderer.shadowMap.enabled = true;

      this.renderer.setSize(window.innerWidth, window.innerHeight);

      // this.$refs.signature.appendChild(this.renderer.domElement);

      this.gltf();
    },
    bg() {
      var geometry = new THREE.PlaneGeometry(100, 100, 0);
      var material = new THREE.MeshBasicMaterial({
        color: 0xd1d1d1,
        side: THREE.DoubleSide
      });
      var plane = new THREE.Mesh(geometry, material);
      plane.rotation.x = -45;
      plane.position.y = -30;
      this.scene.add(plane);
    },
    lights() {
      var spotight = new THREE.SpotLight(0xffffff, 2, 100);
      spotight.castShadow = true;
      spotight.shadow.mapSize.x = 4096;
      spotight.shadow.mapSize.y = 4096;
      spotight.position.set(0, 10, 4);

      var pointlight = new THREE.PointLight(0xffffff, 4, 100);
      pointlight.castShadow = true;
      pointlight.shadow.mapSize.x = 4096;
      pointlight.shadow.mapSize.y = 4096;
      pointlight.position.set(-0.5, 3, 6);

      this.scene.add(pointlight, spotight);
    },
    loadTextures() {
      //init textureloader

      this.texture = new THREE.TextureLoader().load(texMap);
      this.texture.envMap = envmap;
      this.texture.flipY = false;

      this.envMap = new THREE.TextureLoader().load(envmap);
      this.envMap.mapping = THREE.SphericalReflectionMapping;
      this.bumpMap = new THREE.TextureLoader().load(bumpmap);

      this.material = new THREE.MeshStandardMaterial({
        wireframe: false,
        map: this.texture,
        side: THREE.DoubleSide,
        opacity: 1
        // specular: 0x050505,
        // shininess: 20
      });
      this.material.skinning = true;
      this.material.morphTargets = true;
    },
    gltf() {
      // this.sig = this.$gltf;
      // var loader = new GLTFLoader();

      // loader.load(
      //   signature,
      //   gltf => {
      //set material properties
      this.sig.scene.traverse(e => {
        if (e.isMesh) {
          e.material = this.material;
          e.material.map.repeat.set(2, 4);
          e.material.map.wrapS = THREE.RepeatWrapping;
          e.material.map.wrapT = THREE.RepeatWrapping;
          e.material.bumpMap = this.bumpMap;
          e.material.roughnessMap = this.bumpMap;
          e.material.bumpScale = 0.1;
          e.material.metalness = 0.7;
          e.material.roughness = 0.2;
          e.receiveShadow = true;
        }
      });

      //initialize animation
      var mixer = new AnimationMixer(this.sig.scene);
      this.sig.scene.castShadow = true;
      this.sig.scene.children[0].castShadow = true;
      this.sig.scene.children[0].receiveShadow = true;

      this.sig.scene.receiveShadow = true;
      this.sig.animations.forEach(clip => {
        var action = mixer.clipAction(clip);
        action.setLoop(THREE.LoopOnce);
        action.play();
      });
      // console.log(gltf.scene.children[0].children[0]);

      this.scene.add(this.sig.scene);
      //gltf positioning to center of screen
      this.sig.scene.position.z = 1;
      this.sig.scene.position.y = -0.25;
      // this.sig.scene.scale.set(0.85, 0.85, 0.5);
      // this.resize();

      this.objs.push({ ...this.sig, mixer });
      this.signature = this.sig.scene.children[0].children;
      // this.allChildren.push(gltf.scene.children[0].children[0]);

      //when signature finishes animating
      mixer.addEventListener("finished", () => {
        this.animFinished = true;
        this.mouseListener();
        cancelAnimationFrame(this.animate);
        this.$store.commit("setSignatureLoaded", true);
      });
      // },
      // () => {}, //callback for the loading
      // error => {
      //   // called when loading has errors
      //   console.error("An error happened", error);
      // }
      // );
    },

    animate() {
      this.objs.forEach(({ mixer }) => {
        mixer.update(this.clock.getDelta());
      });
      this.renderer.render(this.scene, this.camera);
      // if (this.animFinished) {
      //   this.intersecting();
      // }
      // this.lerpMove();
      if (!this.animFinished) {
        requestAnimationFrame(this.animate);
      }
    },
    lerpMove() {
      var limit = 0.4; //how far out the signature can move
      if (this.animFinished) {
        this.animX += this.mouse.x * 0.01;
        this.animY += this.mouse.y * 0.01;
        this.animX = Math.max(Math.min(this.animX, limit), -limit);
        this.animY = Math.max(Math.min(this.animY, limit), -limit);

        this.signature[0].position.x = this.animX;
        this.signature[0].position.y = this.animY;

        this.signature[0].rotation.x = -this.animY / 8;
        this.signature[0].rotation.y = this.animX / 8;
      }
    },
    intersecting() {
      this.raycaster.setFromCamera(this.mouse, this.camera);
      this.intersects = this.raycaster.intersectObjects(this.signature);
      // if (this.intersects.length > 0) {
      //   // console.log(this.signature[0].position.x);

      //   this.$refs.signature.style = "cursor: pointer;";
      // } else {
      //   this.$refs.signature.style = "cursor: default;";
      // }
    }
  },
  mounted() {
    if (this.$refs.signature) {
      this.loadTextures();
      this.init();
      this.animate();
      this.resize();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../styles/stylesheet.scss";

.signature {
  filter: grayscale(100%);
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0%;
  .canvas {
  }
}
</style>
