import * as THREE from "three";
import ObjectData from "./3dObjectData.json";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 10;

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 0, 5);
scene.add(directionalLight);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.append(renderer.domElement);

let objects = [];
const loader = new GLTFLoader();

for (let i = 0; i < 3; i++) {
  loader.load(
    "./capsule.gltf",
    function (gltf) {
      let cube = gltf.scene.children[0];
      scene.add(cube);
      objects.push(cube);
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );
}

for (let i = 0; i < 2; i++) {
  loader.load(
    "./curl.gltf",
    function (gltf) {
      let cube = gltf.scene.children[0];
      scene.add(cube);
      objects.push(cube);
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );
}

document.onmousemove = (e) => {
  let i = 0;
  objects.map((c) => {
    c.position.set(
      (e.clientX / window.innerWidth) * 2 - 1 + ObjectData[i].offset.x,
      -((e.clientY / window.innerWidth) * 2 + 1) + ObjectData[i].offset.y,
      0
    );
    i++;
  });
};

function animate() {
  requestAnimationFrame(animate);

  objects.map((o, i) => {
    o.rotation.y = ObjectData[i].rotation.y * (Math.PI / 180);
    o.rotation.z = ObjectData[i].rotation.z * (Math.PI / 180);
    console.log(o.rotation);
  });

  renderer.render(scene, camera);
}
animate();
