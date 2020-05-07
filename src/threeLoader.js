// import * as THREE from "../node_modules/three/build/three.module.js";
import Vue from "vue";
import { GLTFLoader } from "../node_modules/three/examples/jsm/loaders/GLTFLoader.js";

class ThreeGLTFLoader {
  constructor() {}
  async loadGLTF(gltf) {
    return new Promise((res) => {
      this.gltf = gltf;
      var loader = new GLTFLoader();

      loader.load(this.gltf, (gltf) => {
        Vue.prototype.$gltf = gltf;
        res(`gltf took ${performance.now()}`);
      });
    });
  }
}
export const threeLoader = new ThreeGLTFLoader();
