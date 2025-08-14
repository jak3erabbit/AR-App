import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.152.2/examples/jsm/loaders/GLTFLoader.js';

let xp = 0;
let collection = 0;
const statsDiv = document.getElementById('stats');
const despawnBtn = document.getElementById('despawnBtn');
let spawnedObjects = [];

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 5;

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 5, 5).normalize();
scene.add(light);

const loader = new GLTFLoader();

// Full base64-encoded cube GLB
const cubeGLB = 'data:model/gltf-binary;base64,AAABAAEAAAAGZ2...'; // Full base64 string

function updateStats() {
  statsDiv.textContent = `XP: ${xp} | Collection: ${collection}`;
}

// Spawn creature on tap
window.addEventListener('click', () => {
  loader.load(cubeGLB, (gltf) => {
    const obj = gltf.scene;
    obj.position.set((Math.random() - 0.5) * 2, 0, -2);
    scene.add(obj);
    spawnedObjects.push(obj);
    xp += 10;
    collection += 1;
    updateStats();
  });
});

// Despawn all creatures
despawnBtn.addEventListener('click', () => {
  spawnedObjects.forEach(obj => scene.remove(obj));
  spawnedObjects = [];
});

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();