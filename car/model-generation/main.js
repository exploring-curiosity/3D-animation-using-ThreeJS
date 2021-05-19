import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import oc from 'three-orbit-controls';
const OrbitControls = oc(THREE)
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, innerWidth / innerHeight);
camera.position.set(-5, 10, 40);
var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0x0000aa, 0.3);
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener('resize', function() {
    renderer.setSize(innerWidth, innerHeight);
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
})
//new OrbitControls(camera, renderer.domElement);
var abint = new THREE.AmbientLight(0xf0f0f0);
//scene.add(abint);

var loader = new GLTFLoader();
loader.load('./models/mymodel/scenery.gltf', function(gltf) {
    scene.add(gltf.scene);

}, undefined, function(error) {

    console.log(error);
})

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();