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

window.addEventListener("resize", onWindowResize, false);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

camera.position.z = 11000 / window.innerWidth;
if (window.innerHeight > window.innerWidth) camera.rotation.z = 90;

const ambientLight = new THREE.AmbientLight(0xffffff, 10);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 10);
directionalLight.position.set(0, 10, 10);
scene.add(directionalLight);

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("app").append(renderer.domElement);

let objects = [];
const loader = new GLTFLoader();

for (let i = 0; i < 3; i++) {
  loader.load(
    "/assets/capsule.gltf",
    function (gltf) {
      let cube = gltf.scene.children[0].geometry;
      let mat = new THREE.MeshPhongMaterial({
        color: 0x0000ff,
        specular: 0xff0000,
        shininess: 1,
      });
      cube = new THREE.Mesh(cube, mat);
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
    "/assets/curl.gltf",
    function (gltf) {
      let cube = gltf.scene.children[0].geometry;
      let mat = new THREE.MeshPhongMaterial({
        color: 0x00ff33,
        specular: 0xfff700,
        shininess: 1,
      });
      cube = new THREE.Mesh(cube, mat);
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
    c.rotation.set(
      0,
      (e.clientX / window.innerWidth) * 2 - 1 + ObjectData[i].rotation.y,
      (e.clientY / window.innerWidth) * 2 + 1 + ObjectData[i].rotation.z
    );
    i++;
  });
};

function animate() {
  requestAnimationFrame(animate);
  objects.map((o, i) => {
    let xPos = ObjectData[i].offset.x;
    let yPos = ObjectData[i].offset.y;

    o.position.set(xPos, yPos, 0);
    let hover = ObjectData[i].hover;
    // o.rotation.set(
    //   0,
    //   hover.rotY * (Math.PI / 180),
    //   hover.rotZ * (Math.PI / 180)
    // );
  });

  // objects.map((o, i) => {
  //   o.rotation.y = ObjectData[i].rotation.y * (Math.PI / 180) ;
  //   o.rotation.z = ObjectData[i].rotation.z * (Math.PI / 180) ;
  // });

  renderer.render(scene, camera);
}
animate();
