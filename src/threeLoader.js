// import * as THREE from "../node_modules/three/build/three.module.js";
import Vue from "vue";
import { GLTFLoader } from "../node_modules/three/examples/jsm/loaders/GLTFLoader.js";

class ThreeGLTFLoader {
  constructor() {}
  async loadGLTF(gltf) {
    this.gltf = gltf;
    return new Promise((res) => {
      var loader = new GLTFLoader();

      loader.load(this.gltf, (gltf) => {
        console.log(gltf);
        Vue.prototype.$gltf = gltf;
        res(gltf);
      });
    });
  }
}
export const threeLoader = new ThreeGLTFLoader();
