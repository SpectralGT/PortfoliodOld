import * as THREE from "three";

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

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshPhongMaterial({ color: 0x242e49 });

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

document.onmousemove = (e) =>
  cube.position.set(
    (e.clientX / window.innerWidth) * 2 - 1,
    -(e.clientY / window.innerWidth) * 2 + 1,
    0
  );

const rotationX = Math.random() / 0.5 - 1;
const rotationY = Math.random() / 0.5 - 1;

function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += rotationX * 0.01;
  cube.rotation.y += rotationY * 0.01;

  renderer.render(scene, camera);
}
animate();
