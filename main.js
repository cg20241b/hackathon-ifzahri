import * as THREE from "three";

// Init
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Webgl render
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add box and camera
const cubeMaterial = new THREE.ShaderMaterial({
  uniforms: {
    glowColor: { value: new THREE.Vector3(1.0, 1.0, 1.0) },
  },
  vertexShader: `
      varying vec3 vPosition;
      
      void main() {
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
  fragmentShader: `
      uniform vec3 glowColor;
      varying vec3 vPosition;
      
      void main() {
        float intensity = 1.0 - length(vPosition) * 0.5;
        gl_FragColor = vec4(glowColor * intensity, 1.0);
      }
    `,
});

var geometry = new THREE.BoxGeometry(1, 1, 1);
// var material = new THREE.MeshBasicMaterial({ color: 0xffffff });
var cube = new THREE.Mesh(geometry, cubeMaterial);
scene.add(cube);
camera.position.z = 5;

// Record keyboard
const keyState = {};
document.addEventListener("keydown", (e) => (keyState[e.key] = true));
document.addEventListener("keyup", (e) => (keyState[e.key] = false));

// Animation loop
var animate = function () {
  requestAnimationFrame(animate);

  // Update cube position
  if (keyState["w"]) cube.position.y += 0.05;
  if (keyState["s"]) cube.position.y -= 0.05;

  renderer.render(scene, camera);
};

// Animation
animate();
