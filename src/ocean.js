// Clearwater ocean — a transparent Gerstner-wave sea rendered over the DOM.
// The canvas clears to alpha 0; water color carries its own alpha so the
// sunlit seafloor layer behind it reads through the surface.
import * as THREE from "three";

init();

function init() {
const canvas = document.getElementById("sea-canvas");
const stage = document.querySelector(".sea-stage");
if (!canvas || !stage) return;

const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");

let renderer;
try {
  renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" });
} catch {
  document.documentElement.classList.add("no-webgl");
  return;
}
renderer.setClearColor(0x000000, 0);
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 900);
camera.position.set(0, 7.2, 30);
camera.lookAt(0, 0, -46);

const uniforms = {
  uTime: { value: 0 },
  uDepth: { value: 0 }, // 0 surface → 1 deep, driven by scroll
  uDeep: { value: new THREE.Color("#0879ad") },
  uShal: { value: new THREE.Color("#2fd9de") },
  uSky: { value: new THREE.Color("#cef3f4") },
  uFoam: { value: new THREE.Color("#f2fffb") },
  uSun: { value: new THREE.Vector3(-0.35, 0.82, -0.45).normalize() },
};

const vertexShader = /* glsl */ `
  uniform float uTime;
  varying vec3 vNorm;
  varying vec3 vPos;
  varying float vCrest;

  void gerstner(vec2 dir, float steep, float len, vec3 p0,
                inout vec3 disp, inout vec3 tang, inout vec3 binm, inout float crest){
    vec2 d = normalize(dir);
    float k = 6.28318530 / len;
    float c = sqrt(9.8 / k);
    float f = k * (dot(d, p0.xz) - c * uTime);
    float a = steep / k;
    float S = sin(f), C = cos(f);
    disp += vec3(d.x * a * C, a * S, d.y * a * C);
    tang += vec3(-d.x * d.x * steep * S, d.x * steep * C, -d.x * d.y * steep * S);
    binm += vec3(-d.x * d.y * steep * S, d.y * steep * C, -d.y * d.y * steep * S);
    crest += S * steep;
  }

  void main(){
    vec3 p0 = position;
    vec3 disp = vec3(0.0);
    vec3 tang = vec3(1.0, 0.0, 0.0);
    vec3 binm = vec3(0.0, 0.0, 1.0);
    float crest = 0.0;
    gerstner(vec2( 1.0,  0.35), 0.16, 22.0, p0, disp, tang, binm, crest);
    gerstner(vec2( 0.7, -1.0 ), 0.13, 13.0, p0, disp, tang, binm, crest);
    gerstner(vec2(-0.4,  0.8 ), 0.11,  8.0, p0, disp, tang, binm, crest);
    gerstner(vec2( 1.0, -0.6 ), 0.08,  4.6, p0, disp, tang, binm, crest);
    gerstner(vec2(-0.8, -0.4 ), 0.06,  2.6, p0, disp, tang, binm, crest);
    vec3 p = p0 + disp;
    vNorm = normalize(cross(binm, tang));
    vPos = p;
    vCrest = crest;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform float uDepth;
  uniform vec3 uDeep;
  uniform vec3 uShal;
  uniform vec3 uSky;
  uniform vec3 uFoam;
  uniform vec3 uSun;
  varying vec3 vNorm;
  varying vec3 vPos;
  varying float vCrest;

  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
  float noise(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }

  void main(){
    vec3 N = normalize(vNorm);
    vec3 V = normalize(cameraPosition - vPos);
    float fres = pow(1.0 - max(dot(N, V), 0.0), 3.0);

    float mottle = noise(vPos.xz * 0.16 + uTime * 0.04) - 0.5;
    vec3 col = mix(uDeep, uShal, clamp(vCrest * 0.9 + 0.45 + mottle * 0.22, 0.0, 1.0));
    col = mix(col, uSky, clamp(fres, 0.0, 0.6));

    // sun glitter
    vec3 R = reflect(-uSun, N);
    float glit = pow(max(dot(R, V), 0.0), 140.0);
    col += vec3(1.0, 0.98, 0.9) * glit * 0.9;

    // foam threads along crests
    float f1 = noise(vPos.xz * 0.9 + uTime * 0.22);
    float foam = smoothstep(0.42, 0.62, vCrest + f1 * 0.08) * 0.5;
    col = mix(col, uFoam, foam);

    // descent: water darkens and cools with scroll depth
    col = mix(col, uDeep * 0.42, uDepth * 0.75);

    // transparency: clearest looking straight down into troughs,
    // more opaque at grazing angles, on crests, and with depth
    float alpha = 0.34 + fres * 0.5 + clamp(vCrest, 0.0, 1.0) * 0.18 + foam * 0.5;
    alpha = clamp(alpha + uDepth * 0.28, 0.0, 0.93);

    // fade the far plane edge into nothing so the horizon stays soft
    float distFade = smoothstep(300.0, 150.0, length(vPos.xz));
    gl_FragColor = vec4(col, alpha * distFade);
  }
`;

const sea = new THREE.Mesh(
  new THREE.PlaneGeometry(340, 340, 200, 200).rotateX(-Math.PI / 2),
  new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader, transparent: true, depthWrite: false }),
);
scene.add(sea);

function resize() {
  const w = stage.clientWidth;
  const h = stage.clientHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}
addEventListener("resize", resize);
resize();

// scroll drives the "descent" — deeper page, deeper water
let targetDepth = 0;
function readScroll() {
  const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
  targetDepth = Math.min(1, (scrollY / max) * 1.35);
}
addEventListener("scroll", readScroll, { passive: true });
readScroll();

// gentle pointer parallax
let sway = 0, swayTarget = 0;
addEventListener("pointermove", (e) => { swayTarget = (e.clientX / innerWidth - 0.5) * 1.6; }, { passive: true });

let running = true;
document.addEventListener("visibilitychange", () => { running = !document.hidden; if (running && !reducedMotion.matches) loop(); });

const clock = new THREE.Clock();
function frame() {
  uniforms.uTime.value = clock.getElapsedTime() * 0.8;
  uniforms.uDepth.value += (targetDepth - uniforms.uDepth.value) * 0.06;
  sway += (swayTarget - sway) * 0.04;
  camera.position.x = sway;
  camera.position.y = 7.2 - uniforms.uDepth.value * 3.4;
  camera.lookAt(sway * 0.5, 0, -46);
  renderer.render(scene, camera);
}
function loop() {
  if (!running || reducedMotion.matches) return;
  frame();
  requestAnimationFrame(loop);
}

frame(); // always render at least one frame (reduced-motion gets a still sea)
if (!reducedMotion.matches) loop();
reducedMotion.addEventListener("change", () => { if (!reducedMotion.matches) loop(); else frame(); });

document.documentElement.classList.add("sea-live");
}
