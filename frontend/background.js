import * as THREE from "three";
import ObjectData from "./3dObjectData.json";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const loader = new GLTFLoader();

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 0, 5);
scene.add(directionalLight);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.append(renderer.domElement);

let objects = [];

for (let i = 0; i < 10; i++) {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshNormalMaterial();
  let cube = new THREE.Mesh(geometry, material);
  loader.load(
    "./capsule.gltf",
    function (gltf) {
      cube = gltf.scene.children[0];
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

camera.position.z = 20;

const rotationX = Math.random() / 0.5 - 1;
const rotationY = Math.random() / 0.5 - 1;

function animate() {
  requestAnimationFrame(animate);

  objects.map((c, i) => {
    c.rotation.x += (ObjectData[i].offset.x + 1) * 0.001;
    c.rotation.y += (ObjectData[i].offset.y + 1) * 0.001;
  });

  renderer.render(scene, camera);
}
animate();
