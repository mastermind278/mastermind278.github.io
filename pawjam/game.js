import * as THREE from './three.module.min.js';

// ======================================================================
// Data
// ======================================================================
const PUPS = [
  { id: 'chase', name: 'Chase', color: '#1f6fd6', dark: '#123f8a', design: 'police', line: 'Chase is on the case!',
    look: { fur: '#c98a4b', top: '#6b3f1f', muzzle: '#f4dcb4', ear: 'pointy', earFur: '#7a4a26', eye: '#6b3a1a', hat: 'police' },
    ab: { key: 'nitro', icon: '🚨', name: 'Nitro Boost', desc: 'Super speed! Smashes through EVERYTHING!' } },
  { id: 'marshall', name: 'Marshall', color: '#e0322b', dark: '#931b16', design: 'fire', line: "I'm all fired up!",
    look: { fur: '#ffffff', top: null, muzzle: '#ffffff', ear: 'floppy', earFur: '#ffffff', spots: true, eye: '#2f7fd6', hat: 'fire' },
    ab: { key: 'water', icon: '💦', name: 'Water Cannon', desc: 'Blasts rocks, fires, mud and cars right off the track!' } },
  { id: 'skye', name: 'Skye', color: '#ff6fae', dark: '#b8346f', design: 'heli', line: "This pup's gotta fly!",
    look: { fur: '#e8c18e', top: '#d4a46a', muzzle: '#fbeedb', ear: 'floppy', earFur: '#c9955a', eye: '#c2185b', hat: 'pilot' },
    ab: { key: 'glide', icon: '🚁', name: 'Heli Flight', desc: 'Takes off and FLIES over everything!' } },
  { id: 'rubble', name: 'Rubble', color: '#ffc21a', dark: '#b88600', design: 'dozer', line: 'Rubble on the double!',
    look: { fur: '#d9a066', top: '#c2834a', muzzle: '#ffffff', ear: 'small', earFur: '#b8763c', eye: '#6b3a1a', hat: 'hardhat', chubby: true },
    ab: { key: 'blade', icon: '🚧', name: 'Bulldozer', desc: 'Always smashes stone. Special plows through EVERYTHING!' } },
  { id: 'rocky', name: 'Rocky', color: '#2fae4a', dark: '#1a7230', design: 'recycle', line: "Don't lose it, reuse it!",
    look: { fur: '#a3acb7', top: '#7d8692', muzzle: '#f1f3f5', ear: 'pointy', earFur: '#7d8692', eye: '#6b3a1a', hat: 'cap' },
    ab: { key: 'magnet', icon: '♻️', name: 'Recycle Magnet', desc: 'Turns junk into gears and pulls in every bone! 3 gears = +1 ❤' } },
  { id: 'zuma', name: 'Zuma', color: '#ff8a1f', dark: '#b45600', design: 'hover', line: "Let's dive in!",
    look: { fur: '#7a4a24', top: '#653a1a', muzzle: '#a8703f', ear: 'floppy', earFur: '#5c3416', eye: '#8a5a2b', hat: 'cap' },
    ab: { key: 'hover', icon: '🌊', name: 'Hovercraft', desc: 'Mud never slows Zuma! Hovers high over rocks, fire and water!' } },
  { id: 'everest', name: 'Everest', color: '#1fb5a8', dark: '#0f7a71', design: 'plow', line: 'Off the trail, Everest never fails!',
    look: { fur: '#ffffff', top: '#8d97a8', muzzle: '#ffffff', ear: 'pointy', earFur: '#8d97a8', eye: '#3fa7d6', hat: 'goggles', hatColor2: '#7b3fe4' },
    ab: { key: 'plow', icon: '❄️', name: 'Snow Plow', desc: 'Never slips on ice. Special plows through ANYTHING!' } },
  { id: 'tracker', name: 'Tracker', color: '#7fa23a', dark: '#4f6b1c', design: 'jungle', line: "I'm all ears!",
    look: { fur: '#d9a464', top: '#b8803f', muzzle: '#f6dcb5', ear: 'big', earFur: '#d9a464', eye: '#6b3a1a', hat: 'explorer' },
    ab: { key: 'ears', icon: '👂', name: 'Super Ears', desc: 'Hears danger and jumps for you! Pulls in bones and friends!' } },
  { id: 'liberty', name: 'Liberty', color: '#9b59d0', dark: '#62309a', design: 'city', line: "Let's roll, Liberty style!",
    look: { fur: '#9a5a2e', top: '#7a4220', muzzle: '#c88a5a', ear: 'long', earFur: '#6e3a1a', eye: '#6b3a1a', hat: 'goggles', hatColor2: '#ffd23f' },
    ab: { key: 'dash', icon: '🏙️', name: 'City Dash', desc: 'Triple jump! Special zooms ahead in a flash, smashing everything!' } },
  { id: 'rex', name: 'Rex', color: '#8bc34a', dark: '#567d22', design: 'dino', line: 'Dino rescue, roar!',
    look: { fur: '#ffffff', top: '#2a2522', muzzle: '#ffffff', cheeks: '#b5651d', ear: 'floppy', earFur: '#2a2522', eye: '#6b3a1a', hat: 'dino' },
    ab: { key: 'stomp', icon: '🦖', name: 'Dino Stomp', desc: 'Giant stomp that smashes everything on screen!' } },
];
const ABILITY_TIME = { nitro: 3.5, water: 3, glide: 4.5, blade: 4.5, magnet: 5, hover: 4.5, plow: 4.5, ears: 6, dash: 1.4, stomp: 1.6 };
const SMASHERS = ['nitro', 'blade', 'plow', 'dash'];

const TRUCKS = [
  { id: 'pup',     name: 'Pup Truck',    need: 0 },
  { id: 'digger',  name: 'Bone Digger',  need: 3,  body: '#1c1c1c', dark: '#000000', accent: '#3ddc4a' },
  { id: 'bull',    name: 'Loco Bull',    need: 8,  body: '#ff7a00', dark: '#a84800', accent: '#ffd23f' },
  { id: 'shark',   name: 'Mega Shark',   need: 14, body: '#3f7cc0', dark: '#1f4a7a', accent: '#ffffff' },
  { id: 'dinosk',  name: 'Dino Stomper', need: 20, body: '#55b84a', dark: '#2f7a27', accent: '#ff9f1c' },
  { id: 'unicorn', name: 'Sparkle Horn', need: 28, body: '#c77dff', dark: '#8a3fd1', accent: '#ffe066' },
];

const WORLDS = [
  { name: 'Adventure Bay', ico: '🏝️', color: '#1f6fd6' },
  { name: "Jake's Mountain", ico: '🏔️', color: '#4aa3df' },
  { name: 'Barkingburg Castle', ico: '🏰', color: '#7b3fe4' },
  { name: 'Adventure Bay Stadium', ico: '🏟️', color: '#ff6a00' },
];
const LEVELS = [
  { world: 0, name: 'Pup Training', ico: '🐶', goal: { type: 'rescue', n: 3 }, speed: 280, sky: 0, theme: 'bay', gap: [400, 580], hints: true, friendEvery: [2, 3],
    tip: 'Tap JUMP to hop over rocks. Bump one and you lose a heart!', w: { cars: 2, mud: 1, bonesLow: 2, bonesHigh: 1, boulder: 2, ramp: 1 } },
  { world: 0, name: 'Crush Party', ico: '🚗', goal: { type: 'crush', n: 12 }, speed: 300, sky: 0, theme: 'bay', gap: [360, 540], hints: true,
    tip: 'Drive over cars to SMASH them! Land on a rock to STOMP it.', w: { cars: 5, ramp: 1, mud: 1, bonesLow: 1, bonesHigh: 1, boulder: 2, scrap: 0.5 } },
  { world: 0, name: 'Bone Hunt', ico: '🦴', goal: { type: 'bones', n: 25 }, speed: 310, sky: 1, theme: 'bay', gap: [340, 520], hints: true,
    tip: 'Bones are up high. Jump to grab them! Watch out for holes.', w: { bonesHigh: 4, bonesLow: 1, ramp: 2, boulder: 2, pit: 1.5, cars: 1, goodie: 0.6, scrap: 0.5 } },
  { world: 0, name: 'Mud Mountain', ico: '💦', goal: { type: 'rescue', n: 4 }, speed: 320, sky: 1, theme: 'mud', gap: [320, 500], friendEvery: [2, 3], balloon: 0.5,
    tip: "Fires on the track! Jump them, or use Marshall's WATER CANNON. Zuma zooms through mud!", w: { mud: 3, pit: 1.5, fire: 2, boulder: 1.5, cars: 1, bonesHigh: 1, ramp: 1, goodie: 0.4, scrap: 0.5 } },
  { world: 0, name: 'Save Chickaletta', ico: '🐔', goal: { type: 'reach', n: 7500, who: 'chickaletta' }, speed: 320, sky: 0, theme: 'bay', gap: [320, 480], maxWalls: 2,
    tip: 'Giant stone walls are too tall to jump! Tap the PUP PAD 📱 to call Rubble and SMASH them!', w: { wall: 1.2, boulder: 2, fire: 1.5, pit: 1, cars: 2, bonesHigh: 1, goodie: 0.4, scrap: 0.6 } },
  { world: 1, name: 'Snow Rally', ico: '⛷️', goal: { type: 'race', n: 9000 }, rival: 1.12, speed: 330, sky: 0, theme: 'snow', gap: [300, 470],
    tip: 'Race on ice! Ice makes you slide fast. Everest never slips!', w: { ice: 2, snowman: 2.5, pit: 1.5, cars: 1.5, ramp: 1, bonesHigh: 1, goodie: 0.5, scrap: 0.5 } },
  { world: 1, name: 'Avalanche Rescue', ico: '🏔️', goal: { type: 'rescue', n: 5 }, speed: 340, sky: 1, theme: 'snow', gap: [300, 460], friendEvery: [2, 3], balloon: 0.5,
    tip: 'Big canyons! Hit the ramp and double jump, or let Skye glide across.', w: { canyon: 1.5, snowman: 2, ice: 1.5, pit: 1, cars: 1, bonesHigh: 1, goodie: 0.5, scrap: 0.5 } },
  { world: 2, forceEvery: 1, name: 'Drawbridge Dash', ico: '👑', goal: { type: 'reach', n: 8500, who: 'mayor' }, speed: 340, sky: 2, theme: 'castle', gap: [300, 460], maxWalls: 2,
    tip: 'Cross the drawbridges when they are DOWN, or jump the moat! Save Mayor Goodway!', w: { bridge: 2.5, wall: 1, boulder: 1.5, fire: 1, cars: 1.5, bonesHigh: 1, goodie: 0.5, scrap: 0.5 } },
  { world: 2, forceEvery: 1, name: 'Castle Crush', ico: '🏰', goal: { type: 'crush', n: 18 }, speed: 350, sky: 0, theme: 'castle', gap: [290, 450], maxWalls: 3,
    tip: 'Crush 18 cars in the royal courtyard!', w: { cars: 4, wall: 1, bridge: 1.5, fire: 1.5, boulder: 1.5, ramp: 1, goodie: 0.5, scrap: 0.5 } },
  { world: 3, forceEvery: 1, name: 'Backflip Bash', ico: '🔄', goal: { type: 'flips', n: 6 }, speed: 340, sky: 0, theme: 'stadium', gap: [300, 470],
    tip: 'Ramps = backflips! Loop-the-loops count too! Tire stacks need a DOUBLE jump.', w: { ramp: 3, loop: 1.5, tires: 1.5, boulder: 1.5, cars: 2, bonesHigh: 1, goodie: 0.4 } },
  { world: 3, forceEvery: 1, name: 'The Big Race', ico: '🏁', goal: { type: 'race', n: 9500 }, rival: 1.14, speed: 350, sky: 1, theme: 'stadium', gap: [300, 460],
    tip: 'Beat the rival truck to the finish! Hold TURBO to go fast.', w: { boulder: 2.5, pit: 1.5, tires: 1, fire: 1, cars: 2, ramp: 1, loop: 0.7, bonesHigh: 1, goodie: 0.6, scrap: 0.4 } },
  { world: 3, forceEvery: 1, name: 'Stadium Finale', ico: '🏆', goal: { type: 'crush', n: 22 }, speed: 370, sky: 3, theme: 'stadium', gap: [270, 430], maxWalls: 2,
    tip: 'The big show! Crush 22 cars to become the PawJam Champion!', w: { cars: 5, tires: 1.5, boulder: 1.5, fire: 1.5, wall: 0.6, pit: 1.5, ramp: 2, loop: 0.8, goodie: 0.6, scrap: 0.5 } },
];
const ARENAS = [
  { name: 'Adventure Bay Stadium', ico: '🏟️', theme: 'stadium', sky: 0 },
  { name: "Jake's Mountain", ico: '❄️', theme: 'snow', sky: 0 },
  { name: 'Barkingburg Castle', ico: '🏰', theme: 'castle', sky: 1 },
];
const FS_TIME = 60, FS_STARS = [15000, 28000, 40000];
const GOAL_ICON = { rescue: '🐱', crush: '🚗', bones: '🦴', flips: '🔄', race: '🏁', reach: '🏁', freestyle: '🤘' };
const CITIZENS = { chickaletta: 'Chickaletta', mayor: 'Mayor Goodway' };
function goalText(g) {
  return { rescue: `Rescue ${g.n} friends!`, crush: `Crush ${g.n} cars!`, bones: `Collect ${g.n} bones!`, flips: `Do ${g.n} flips off ramps and loops!`,
           race: 'Beat the rival truck to the finish line!', reach: `Race to the end and rescue ${CITIZENS[g.who]}!`,
           freestyle: `Score points in ${FS_TIME} seconds! Flips, donuts, wheelies, loops and crushes!` }[g.type];
}
const FRIENDS = ['kitten', 'chicken', 'duck', 'turtle'];
const FRIEND_NAMES = { kitten: 'kitty', chicken: 'chicken', duck: 'duckling', turtle: 'turtle' };
const CAR_COLORS = ['#ff4d6d', '#ffd23f', '#3bceac', '#7b5cff', '#ff8c42', '#4cc9f0', '#f72585'];
const MAX_HEARTS = 3;
const GRAV = 2200, JUMP_V = 900, AIR_JUMP_V = 820;
const H = 600, GROUND = 500, S = 0.01;   // logic units are px; 3D units = px * S

// ======================================================================
// Save
// ======================================================================
const SAVE_KEY = 'pawjam-v2';
let save = { stars: {}, fs: {}, team: [0, 3], truck: 0, seenGarage: false };
try { Object.assign(save, JSON.parse(localStorage.getItem(SAVE_KEY) || '{}')); } catch (e) {}
function persist() { try { localStorage.setItem(SAVE_KEY, JSON.stringify(save)); } catch (e) {} }
function totalStars() {
  return Object.values(save.stars).reduce((a, b) => a + b, 0) + Object.values(save.fs).reduce((a, b) => a + (b.stars || 0), 0);
}
const MAX_STARS = LEVELS.length * 3 + ARENAS.length * 3;
function truckUnlocked(t) { return totalStars() >= t.need; }
function levelUnlocked(i) { return i === 0 || (save.stars[i - 1] || 0) > 0; }

// ======================================================================
// Audio
// ======================================================================
let actx = null, muted = false, engineOsc = null, engineGain = null;
function ensureAudio() {
  if (actx) { if (actx.state === 'suspended') actx.resume(); return; }
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return;
  actx = new AC();
  engineOsc = actx.createOscillator(); engineOsc.type = 'sawtooth';
  const lp = actx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 400;
  engineGain = actx.createGain(); engineGain.gain.value = 0;
  engineOsc.connect(lp).connect(engineGain).connect(actx.destination);
  engineOsc.start();
}
function tone(freq, dur, type = 'square', vol = 0.15, slideTo = null, delay = 0) {
  if (!actx || muted) return;
  const t = actx.currentTime + delay;
  const o = actx.createOscillator(), g = actx.createGain();
  o.type = type; o.frequency.setValueAtTime(freq, t);
  if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t + dur);
  g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.001, t + dur);
  o.connect(g).connect(actx.destination); o.start(t); o.stop(t + dur + 0.02);
}
function noise(dur, vol = 0.3, freq = 800, delay = 0) {
  if (!actx || muted) return;
  const t = actx.currentTime + delay;
  const buf = actx.createBuffer(1, Math.ceil(actx.sampleRate * dur), actx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length);
  const src = actx.createBufferSource(); src.buffer = buf;
  const f = actx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = freq;
  const g = actx.createGain(); g.gain.value = vol;
  src.connect(f).connect(g).connect(actx.destination); src.start(t);
}
const sfx = {
  jump:   () => tone(300, 0.25, 'square', 0.12, 700),
  crunch: () => { noise(0.25, 0.45, 1400); tone(120, 0.2, 'sawtooth', 0.12, 50); },
  bone:   () => { tone(880, 0.08, 'square', 0.08); tone(1320, 0.12, 'square', 0.08, null, 0.07); },
  scrap:  () => { tone(1500, 0.06, 'triangle', 0.12); tone(1100, 0.1, 'triangle', 0.1, null, 0.05); },
  splash: () => noise(0.5, 0.35, 600),
  land:   () => { noise(0.15, 0.3, 300); tone(90, 0.15, 'sine', 0.25, 40); },
  bonk:   () => { tone(220, 0.3, 'square', 0.18, 80); noise(0.2, 0.4, 500); },
  stomp:  () => { noise(0.3, 0.5, 900); tone(160, 0.25, 'square', 0.15, 60); },
  quake:  () => { noise(0.7, 0.6, 250); tone(70, 0.6, 'sawtooth', 0.2, 35); },
  fall:   () => tone(700, 0.7, 'triangle', 0.15, 120),
  hiss:   () => noise(0.6, 0.3, 3000),
  rescue: () => [523, 659, 784, 1047].forEach((f, i) => tone(f, 0.15, 'triangle', 0.18, null, i * 0.09)),
  flip:   () => tone(400, 0.6, 'triangle', 0.12, 1200),
  power:  () => [523, 659, 784, 1047, 1319, 1568].forEach((f, i) => tone(f, 0.12, 'square', 0.1, null, i * 0.06)),
  swap:   () => [784, 988, 1175, 1568].forEach((f, i) => tone(f, 0.1, 'square', 0.1, null, i * 0.05)),
  heart:  () => [660, 880, 1100].forEach((f, i) => tone(f, 0.15, 'sine', 0.2, null, i * 0.08)),
  win:    () => [523, 523, 523, 659, 784, 659, 784, 1047].forEach((f, i) => tone(f, 0.22, 'square', 0.1, null, [0, .15, .3, .45, .7, .9, 1.05, 1.25][i])),
  lose:   () => [392, 349, 311, 262].forEach((f, i) => tone(f, 0.3, 'triangle', 0.15, null, i * 0.22)),
  bark:   () => { tone(700, 0.08, 'sawtooth', 0.12, 350); tone(650, 0.1, 'sawtooth', 0.12, 300, 0.16); },
  crash:  () => { noise(0.5, 0.5, 700); tone(300, 0.4, 'sawtooth', 0.12, 60); },
  trick:  () => tone(500, 0.3, 'triangle', 0.12, 1000),
};
const HORNS = {
  pup:     () => { tone(700, 0.25, 'square', 0.1, 1000); tone(1000, 0.25, 'square', 0.1, 700, 0.25); tone(700, 0.25, 'square', 0.1, 1000, 0.5); },
  digger:  () => { tone(300, 0.9, 'sine', 0.18, 650); tone(306, 0.9, 'triangle', 0.08, 640); },
  bull:    () => tone(190, 0.8, 'sawtooth', 0.14, 120),
  shark:   () => { noise(0.08, 0.5, 2500); noise(0.08, 0.5, 2500, 0.16); noise(0.08, 0.5, 2500, 0.32); },
  dinosk:  () => { noise(0.8, 0.45, 450); tone(95, 0.8, 'sawtooth', 0.16, 55); },
  unicorn: () => [1047, 1319, 1568, 2093, 2637].forEach((f, i) => tone(f, 0.18, 'triangle', 0.12, null, i * 0.07)),
};
function speak(text) {
  if (muted || !window.speechSynthesis) return;
  try {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 1.0; u.pitch = 1.35;
    speechSynthesis.speak(u);
  } catch (e) {}
}

// ======================================================================
// 3D toolkit
// ======================================================================
const glCanvas = document.getElementById('gl');
const renderer = new THREE.WebGLRenderer({ canvas: glCanvas, antialias: true });
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 400);

// cartoon (toon) shading with 3 tones
const toonRamp = new THREE.DataTexture(new Uint8Array([110, 190, 255]), 3, 1, THREE.RedFormat);
toonRamp.minFilter = toonRamp.magFilter = THREE.NearestFilter; toonRamp.needsUpdate = true;
const matCache = new Map();
function mat(color, o = {}) {
  const key = color + JSON.stringify(o);
  if (matCache.has(key)) return matCache.get(key);
  let m;
  if (o.basic) m = new THREE.MeshBasicMaterial({ color, transparent: !!o.opacity, opacity: o.opacity ?? 1 });
  else if (o.shiny) m = new THREE.MeshStandardMaterial({ color, roughness: o.rough ?? 0.25, metalness: o.metal ?? 0.6, transparent: !!o.opacity, opacity: o.opacity ?? 1, emissive: o.emissive || '#000' });
  else m = new THREE.MeshToonMaterial({ color, gradientMap: toonRamp, transparent: !!o.opacity, opacity: o.opacity ?? 1, emissive: o.emissive || '#000', side: o.double ? THREE.DoubleSide : THREE.FrontSide });
  if (o.map) { m.map = o.map; m.needsUpdate = true; }
  matCache.set(key, m);
  return m;
}
function texMat(tex, o = {}) { return new THREE.MeshToonMaterial({ map: tex, gradientMap: toonRamp, transparent: !!o.transparent, side: o.double ? THREE.DoubleSide : THREE.FrontSide }); }
const geoCache = new Map();
function geo(key, make) { if (!geoCache.has(key)) geoCache.set(key, make()); return geoCache.get(key); }
const sphereG = (seg = 20) => geo('sph' + seg, () => new THREE.SphereGeometry(1, seg, Math.max(8, seg * 0.7 | 0)));
const boxG = () => geo('box', () => new THREE.BoxGeometry(1, 1, 1));
const cylG = (seg = 20) => geo('cyl' + seg, () => new THREE.CylinderGeometry(1, 1, 1, seg));
const coneG = (seg = 16) => geo('cone' + seg, () => new THREE.ConeGeometry(1, 1, seg));

function put(parent, child) { parent.add(child); return child; }
function mesh(g, m, x = 0, y = 0, z = 0, sx = 1, sy = sx, sz = sx, shadow = true) {
  const o = new THREE.Mesh(g, m);
  o.position.set(x, y, z); o.scale.set(sx, sy, sz);
  o.castShadow = shadow; o.receiveShadow = shadow;
  return o;
}
const ball = (color, x, y, z, rx, ry = rx, rz = rx, o) => mesh(sphereG(), mat(color, o), x, y, z, rx, ry, rz);
const block = (color, x, y, z, w, h, d, o) => mesh(boxG(), mat(color, o), x, y, z, w, h, d);
const rod = (color, x, y, z, r, len, o) => mesh(cylG(12), mat(color, o), x, y, z, r, len, r);
function roundBoxGeo(w, h, d, r) {
  return geo(`rb${w}_${h}_${d}_${r}`, () => {
    const s = new THREE.Shape(), x = -w / 2 + r, y = -h / 2 + r, ww = w - 2 * r, hh = h - 2 * r;
    s.moveTo(x, y); s.lineTo(x + ww, y); s.lineTo(x + ww, y + hh); s.lineTo(x, y + hh); s.lineTo(x, y);
    const g = new THREE.ExtrudeGeometry(s, { depth: d - 2 * r, bevelEnabled: true, bevelSize: r, bevelThickness: r, bevelSegments: 3, curveSegments: 4 });
    g.translate(0, 0, -(d - 2 * r) / 2);
    return g;
  });
}
const rbox = (color, x, y, z, w, h, d, r = 0.05, o) => mesh(roundBoxGeo(w, h, d, r), mat(color, o), x, y, z);
function canvasTex(w, h, draw, repeat) {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
  if (repeat) { t.wrapS = t.wrapT = THREE.RepeatWrapping; }
  t.anisotropy = 4;
  return t;
}
function shapeGeo(key, pts, depth, bevel = 0.02) {
  return geo(key, () => {
    const s = new THREE.Shape(); s.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) s.lineTo(pts[i][0], pts[i][1]); s.closePath();
    const g = new THREE.ExtrudeGeometry(s, { depth, bevelEnabled: bevel > 0, bevelSize: bevel, bevelThickness: bevel, bevelSegments: 2 });
    g.translate(0, 0, -depth / 2); return g;
  });
}
function starGeo(r, depth) {
  const pts = []; for (let i = 0; i < 10; i++) { const a = Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.45 : r; pts.push([Math.cos(a) * rr, Math.sin(a) * rr]); }
  return shapeGeo('star' + r + depth, pts, depth);
}
function heartGeo(r, depth) {
  return geo('heart' + r, () => {
    const s = new THREE.Shape(); s.moveTo(0, -r);
    s.bezierCurveTo(-r * 1.6, r * 0.2, -r * 0.6, r * 1.3, 0, r * 0.45);
    s.bezierCurveTo(r * 0.6, r * 1.3, r * 1.6, r * 0.2, 0, -r);
    const g = new THREE.ExtrudeGeometry(s, { depth, bevelEnabled: true, bevelSize: 0.03, bevelThickness: 0.03, bevelSegments: 3 });
    g.translate(0, 0, -depth / 2); return g;
  });
}
// a wheel-friendly cylinder lying along Z
function wheelCyl(color, r, w, o) { const m = mesh(cylG(28), mat(color, o), 0, 0, 0, r, w, r); m.rotation.x = Math.PI / 2; return m; }

// ======================================================================
// 3D models: pups
// ======================================================================
function buildPupHead(p, s = 0.24) {
  const L = p.look, g = new THREE.Group();
  const hs = L.chubby ? 1.08 : 1;
  // collar + vest
  g.add(ball(p.color, -s * 0.1, -s * 1.25, 0, s * 0.85, s * 0.75, s * 0.9));
  const collar = mesh(geo('collar', () => new THREE.TorusGeometry(1, 0.22, 10, 24)), mat(p.dark), 0, -s * 0.72, 0, s * 0.62);
  collar.rotation.x = Math.PI / 2; g.add(collar);
  const tag = mesh(cylG(16), mat('#ffd23f', { shiny: true, metal: 0.8 }), s * 0.62, -s * 0.85, 0, s * 0.18, s * 0.06, s * 0.18);
  tag.rotation.z = Math.PI / 2; g.add(tag);
  // ears
  const ef = L.earFur || L.fur;
  if (L.ear === 'pointy') {
    for (const k of [-1, 1]) {
      const e = mesh(coneG(4), mat(ef), -s * 0.08, s * 0.98, k * s * 0.62, s * 0.34, s * 0.8, s * 0.2);
      e.rotation.x = k * 0.5; e.rotation.y = Math.PI / 4; g.add(e);
      const inner = mesh(coneG(4), mat('#f4a9a9'), -s * 0.0, s * 0.93, k * s * 0.64, s * 0.2, s * 0.55, s * 0.1);
      inner.rotation.x = k * 0.5; inner.rotation.y = Math.PI / 4; g.add(inner);
    }
  } else if (L.ear === 'big') {
    for (const k of [-1, 1]) {
      const e = mesh(coneG(4), mat(ef), -s * 0.05, s * 0.6, k * s * 1.3, s * 0.5, s * 1.4, s * 0.18);
      e.rotation.x = k * 1.15; e.rotation.y = Math.PI / 4; g.add(e);
      const inner = mesh(coneG(4), mat('#f4a9a9'), s * 0.03, s * 0.6, k * s * 1.28, s * 0.32, s * 1.05, s * 0.08);
      inner.rotation.x = k * 1.15; inner.rotation.y = Math.PI / 4; g.add(inner);
    }
  } else if (L.ear === 'small') {
    for (const k of [-1, 1]) { const e = ball(ef, -s * 0.05, s * 0.7, k * s * 0.78, s * 0.3, s * 0.2, s * 0.26); e.rotation.x = k * 0.6; g.add(e); }
  } else {
    const long = L.ear === 'long';
    for (const k of [-1, 1]) {
      const e = ball(ef, -s * 0.08, long ? -s * 0.2 : -s * 0.02, k * s * 0.98, s * 0.34, long ? s * 0.95 : s * 0.72, s * 0.15);
      e.rotation.x = k * 0.18; g.add(e);
    }
  }
  // head: a puppy skull (a little long front-to-back) with a real snout
  g.add(ball(L.fur, 0, 0, 0, s * 1.0 * hs, s * 0.92 * hs, s * 0.95 * hs));
  if (L.top) {
    const cap = mesh(geo('headTop', () => new THREE.SphereGeometry(1, 24, 16, Math.PI * 0.6, Math.PI * 1.8, 0, 1.2)), mat(L.top), 0, 0, 0, s * 1.02 * hs, s * 0.95 * hs, s * 0.97 * hs);
    g.add(cap);
  }
  if (L.cheeks) for (const k of [-1, 1]) g.add(ball(L.cheeks, s * 0.55, -s * 0.15, k * s * 0.58, s * 0.24, s * 0.2, s * 0.18));
  if (L.spots) [[0.2, 0.55, 0.6], [-0.4, 0.3, -0.8], [-0.2, 0.1, 0.9], [-0.6, -0.3, 0.7], [0.1, 0.8, -0.3]].forEach(([x, y, z]) => {
    const v = new THREE.Vector3(x, y, z).normalize().multiplyScalar(s * 0.96);
    g.add(ball('#222', v.x, v.y, v.z, s * 0.13, s * 0.13, s * 0.13));
  });
  const snout = L.muzzle;
  g.add(ball(snout, s * 0.78 * hs, -s * 0.3, 0, s * 0.58, s * 0.4, s * 0.5));
  g.add(ball(snout, s * 0.62 * hs, -s * 0.12, 0, s * 0.42, s * 0.38, s * 0.52));
  g.add(ball('#1b1b1b', s * 1.32 * hs, -s * 0.16, 0, s * 0.18, s * 0.14, s * 0.24, { shiny: true, metal: 0.1, rough: 0.2 }));
  g.add(ball('#ffffff', s * 1.44 * hs, -s * 0.1, s * 0.07, s * 0.03, s * 0.03, s * 0.05, { basic: true }));
  const smile = mesh(geo('smile', () => new THREE.TorusGeometry(1, 0.13, 8, 16, Math.PI)), mat('#3a1a0a'), s * 1.12 * hs, -s * 0.46, 0, s * 0.2);
  smile.rotation.set(0, Math.PI / 2, Math.PI); g.add(smile);
  g.add(ball('#ff7f96', s * 1.1 * hs, -s * 0.6, s * 0.04, s * 0.1, s * 0.07, s * 0.11));
  // big cartoon eyes with colored irises and shine
  for (const k of [-1, 1]) {
    const eg = new THREE.Group(); eg.position.set(s * 0.68 * hs, s * 0.16, k * s * 0.36);
    eg.rotation.y = -k * 0.35;
    eg.add(ball('#ffffff', 0, 0, 0, s * 0.2, s * 0.36, s * 0.27));
    eg.add(ball(L.eye, s * 0.11, -s * 0.03, 0, s * 0.13, s * 0.27, s * 0.21));
    eg.add(ball('#111', s * 0.18, -s * 0.03, 0, s * 0.08, s * 0.16, s * 0.13));
    eg.add(ball('#ffffff', s * 0.24, s * 0.1, -k * s * 0.05, s * 0.04, s * 0.08, s * 0.06, { basic: true }));
    eg.add(ball('#ffffff', s * 0.24, -s * 0.12, k * s * 0.06, s * 0.02, s * 0.035, s * 0.03, { basic: true }));
    g.add(eg);
  }
  // hats
  const hc = p.color, hd = p.dark;
  const hat = new THREE.Group(); hat.position.set(-s * 0.1, s * 0.66, 0); hat.rotation.z = 0.1; g.add(hat);
  const dome = (c, r = 0.82, y = 0) => { const d = mesh(geo('dome', () => new THREE.SphereGeometry(1, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2)), mat(c), 0, y, 0, s * r, s * r * 0.75, s * r); return d; };
  const brim = (c, len = 0.55, w = 0.9) => { const b = mesh(cylG(24), mat(c), s * 0.55, s * 0.02, 0, s * len, s * 0.06, s * w); b.scale.set(s * len, s * 0.06, s * w); return b; };
  const badge = (c, x, y, r = 0.18) => { const b = mesh(cylG(16), mat(c, { shiny: true, metal: 0.7 }), x, y, 0, s * r, s * 0.05, s * r); b.rotation.z = Math.PI / 2 + 0.3; return b; };
  switch (L.hat) {
    case 'police': {
      hat.add(dome(hc, 0.8)); hat.add(mesh(cylG(24), mat(hc), 0, s * 0.42, 0, s * 0.82, s * 0.12, s * 0.82));
      hat.add(mesh(cylG(24), mat(hd), 0, s * 0.06, 0, s * 0.84, s * 0.12, s * 0.84));
      hat.add(brim('#111', 0.5, 0.7)); hat.add(badge('#ffd23f', s * 0.78, s * 0.3, 0.2));
      break;
    }
    case 'fire': {
      hat.add(dome(hc, 0.86)); const b = mesh(cylG(28), mat(hc), 0, s * 0.02, 0, s * 1.2, s * 0.07, s * 1.15); hat.add(b);
      hat.add(block('#ffd23f', s * 0.0, s * 0.62, 0, s * 1.1, s * 0.1, s * 0.12));
      const shield = mesh(starGeo(1, 0.4), mat('#ffd23f', { shiny: true, metal: 0.6 }), s * 0.8, s * 0.35, 0, s * 0.22);
      shield.rotation.y = Math.PI / 2; hat.add(shield);
      break;
    }
    case 'pilot': {
      hat.add(dome(hc, 0.9));
      for (const k of [-1, 1]) {
        const ring = mesh(geo('gogR', () => new THREE.TorusGeometry(1, 0.28, 10, 20)), mat('#c2185b'), s * 0.6, s * 0.28, k * s * 0.3, s * 0.2);
        ring.rotation.y = Math.PI / 2; hat.add(ring);
        hat.add(ball('#ffe3f1', s * 0.62, s * 0.28, k * s * 0.3, s * 0.05, s * 0.17, s * 0.17, { shiny: true, metal: 0.1 }));
      }
      for (const k of [-1, 1]) hat.add(ball(hc, -s * 0.05, -s * 0.1, k * s * 0.8, s * 0.3, s * 0.35, s * 0.12));
      break;
    }
    case 'hardhat': {
      hat.add(dome(hc, 0.9)); hat.add(mesh(cylG(28), mat(hc), s * 0.15, s * 0.02, 0, s * 1.15, s * 0.07, s * 1.0));
      hat.add(block(hd, 0, s * 0.62, 0, s * 1.0, s * 0.1, s * 0.16));
      break;
    }
    case 'cap': {
      hat.add(dome(hc, 0.82)); hat.add(brim(hc, 0.6, 0.75));
      hat.add(ball(hd, 0, s * 0.62, 0, s * 0.1, s * 0.06, s * 0.1));
      hat.add(badge('#ffffff', s * 0.72, s * 0.3, 0.16));
      break;
    }
    case 'goggles': {
      hat.add(dome(hc, 0.84)); hat.add(brim(hc, 0.45, 0.7));
      for (const k of [-1, 1]) {
        const ring = mesh(geo('gogR', () => new THREE.TorusGeometry(1, 0.28, 10, 20)), mat(L.hatColor2 || hd), s * 0.55, s * 0.42, k * s * 0.28, s * 0.17);
        ring.rotation.y = Math.PI / 2; hat.add(ring);
        hat.add(ball('#d9f4ff', s * 0.56, s * 0.42, k * s * 0.28, s * 0.04, s * 0.14, s * 0.14, { shiny: true, metal: 0.1 }));
      }
      break;
    }
    case 'explorer': {
      hat.add(dome('#9c8a4a', 0.8, s * 0.05)); hat.add(mesh(cylG(28), mat('#8a7a3e'), 0, s * 0.05, 0, s * 1.35, s * 0.06, s * 1.35));
      hat.add(mesh(cylG(24), mat(hd), 0, s * 0.12, 0, s * 0.82, s * 0.1, s * 0.82));
      break;
    }
    case 'dino': {
      hat.add(dome(hc, 0.82)); hat.add(brim(hc, 0.55, 0.75));
      for (let i = 0; i < 4; i++) { const sp = mesh(coneG(8), mat('#ff9f1c'), s * (0.3 - i * 0.3), s * (0.62 - Math.abs(i - 1) * 0.06), 0, s * 0.1, s * 0.25, s * 0.06); hat.add(sp); }
      break;
    }
  }
  return g;
}

// ======================================================================
// 3D models: trucks
// ======================================================================
const decalCache = new Map();
function sideDecal(kind, body, acc) {
  const key = kind + body + acc;
  if (decalCache.has(key)) return decalCache.get(key);
  const t = canvasTex(512, 128, (c, w, h) => {
    c.fillStyle = body; c.fillRect(0, 0, w, h);
    if (kind === 'police') { c.fillStyle = '#fff'; c.fillRect(0, 34, w, 26); c.fillStyle = '#ffd23f'; c.font = '900 56px Arial'; c.fillText('★', 300, 108); }
    if (kind === 'fire') { c.fillStyle = '#ffd23f'; c.fillRect(0, 70, w, 14); c.fillStyle = '#fff'; c.fillRect(0, 88, w, 6); }
    if (kind === 'heli') { c.fillStyle = '#c9ced6'; c.fillRect(0, 40, w, 30); c.fillStyle = '#fff'; c.beginPath(); c.arc(330, 60, 24, 0, 7); c.fill(); }
    if (kind === 'dozer') { for (let x = -20; x < w; x += 56) { c.fillStyle = '#222'; c.beginPath(); c.moveTo(x, 128); c.lineTo(x + 28, 128); c.lineTo(x + 60, 80); c.lineTo(x + 32, 80); c.fill(); } }
    if (kind === 'hover') { c.fillStyle = '#1f5fd6'; c.fillRect(0, 30, w, 24); c.fillStyle = '#fff'; for (let x = 0; x < w; x += 80) { c.beginPath(); c.arc(x + 40, 90, 14, Math.PI, 0); c.lineWidth = 6; c.strokeStyle = '#fff'; c.stroke(); } }
    if (kind === 'recycle') { c.fillStyle = 'rgba(255,255,255,.85)'; c.fillRect(0, 36, w * 0.55, 16); c.font = '900 70px Arial'; c.fillStyle = '#fff'; c.fillText('♻', 330, 104); }
    if (kind === 'plow') { c.font = '900 64px Arial'; c.fillStyle = '#fff'; c.fillText('❄', 80, 96); c.fillText('❄', 360, 96); c.fillStyle = '#7b3fe4'; c.fillRect(0, 100, w, 12); }
    if (kind === 'jungle') { c.strokeStyle = '#2f8a2f'; c.lineWidth = 10; c.beginPath(); for (let x = 0; x < w; x += 10) c.lineTo(x, 60 + Math.sin(x / 30) * 20); c.stroke(); c.fillStyle = '#3fbf4f'; for (let x = 20; x < w; x += 70) { c.beginPath(); c.ellipse(x, 60 + Math.sin(x / 30) * 20 + 14, 18, 9, 0.6, 0, 7); c.fill(); } }
    if (kind === 'city') { for (let i = 0; i < 16; i++) { c.fillStyle = i % 2 ? '#111' : '#ffd23f'; c.fillRect(i * 32, 40, 32, 16); c.fillStyle = i % 2 ? '#ffd23f' : '#111'; c.fillRect(i * 32, 56, 32, 16); } c.fillStyle = '#ffd23f'; c.font = '900 56px Arial'; c.fillText('★', 400, 118); }
    if (kind === 'dino') { c.fillStyle = 'rgba(0,0,0,.25)'; [[80, 50], [200, 80], [330, 45], [430, 85]].forEach(([x, y]) => { c.beginPath(); c.ellipse(x, y, 30, 20, 0, 0, 7); c.fill(); }); }
    if (kind === 'digger') { c.fillStyle = acc; c.beginPath(); c.moveTo(0, 128); for (let x = 0; x <= w; x += 40) { c.lineTo(x + 20, 20 + (x % 80 ? 30 : 0)); c.lineTo(x + 40, 100); } c.lineTo(w, 128); c.fill(); }
    if (kind === 'bull') { c.fillStyle = acc; c.beginPath(); c.moveTo(0, 90); for (let x = 0; x < w; x += 64) { c.lineTo(x + 32, 40); c.lineTo(x + 64, 90); } c.lineTo(w, 128); c.lineTo(0, 128); c.fill(); }
    if (kind === 'shark') { c.fillStyle = '#e8f1fb'; c.beginPath(); c.ellipse(w / 2, 128, w / 2, 50, 0, 0, 7); c.fill(); c.strokeStyle = '#1f4a7a'; c.lineWidth = 6; for (let i = 0; i < 3; i++) { c.beginPath(); c.moveTo(380 + i * 22, 20); c.quadraticCurveTo(370 + i * 22, 60, 380 + i * 22, 100); c.stroke(); } }
    if (kind === 'dinosk') { c.fillStyle = 'rgba(0,0,0,.25)'; [[80, 50], [200, 80], [330, 45], [430, 85]].forEach(([x, y]) => { c.beginPath(); c.ellipse(x, y, 30, 20, 0, 0, 7); c.fill(); }); }
    if (kind === 'unicorn') { ['#ff595e', '#ffca3a', '#8ac926', '#1982c4', '#6a4c93'].forEach((col, i) => { c.fillStyle = col; c.fillRect(0, 24 + i * 16, w, 16); }); }
  });
  decalCache.set(key, t);
  return t;
}

function buildTruck(p, tk, opts = {}) {
  const pupStyle = tk.id === 'pup';
  const body = pupStyle ? p.color : tk.body, dark = pupStyle ? p.dark : tk.dark, acc = tk.accent || '#ffd23f';
  const kind = pupStyle ? p.design : tk.id;
  const root = new THREE.Group();
  const lift = new THREE.Group(); root.add(lift);         // hover offset
  const chassis = new THREE.Group(); lift.add(chassis);
  const ud = root.userData = { wheels: [], spinners: [], blink: [], wings: [], chassis, lift };
  const R = 0.4;
  // wheels: chunky monster tires with treads
  for (const wx of [-0.55, 0.55]) for (const wz of [-0.58, 0.58]) {
    const w = new THREE.Group(); w.position.set(wx, R, wz);
    w.add(wheelCyl('#1d1d1d', R, 0.34));
    const tread = mat('#2e2e2e');
    for (let i = 0; i < 14; i++) {
      const a = i / 14 * Math.PI * 2, b = mesh(boxG(), tread, Math.cos(a) * R, Math.sin(a) * R, 0, 0.09, 0.07, 0.34);
      b.rotation.z = a; w.add(b);
    }
    const rim = wheelCyl('#c9ced6', R * 0.55, 0.34, { shiny: true, metal: 0.8 }); w.add(rim);
    const hub = wheelCyl(body, R * 0.22, 0.36); w.add(hub);
    for (let i = 0; i < 5; i++) { const sp = mesh(boxG(), mat('#8b939e', { shiny: true }), 0, 0, 0, 0.04, R * 0.9, 0.35); sp.rotation.z = i / 5 * Math.PI * 2; w.add(sp); }
    root.add(w); ud.wheels.push(w);
  }
  // suspension + axles
  for (const wx of [-0.55, 0.55]) {
    put(chassis, rod('#6b7380', wx, R, 0, 0.05, 1.1, { shiny: true })).rotation.x = Math.PI / 2;
    for (const wz of [-0.38, 0.38]) {
      const sh = rod('#9aa1ab', wx * 0.8, 0.55, wz, 0.035, 0.42, { shiny: true }); sh.rotation.z = wx > 0 ? -0.35 : 0.35; chassis.add(sh);
      const sp = rod('#ffcc00', wx * 0.8, 0.55, wz, 0.055, 0.22); sp.rotation.z = sh.rotation.z; chassis.add(sp);
    }
  }
  // body tub + wheel fenders
  chassis.add(rbox(body, 0, 0.84, 0, 1.56, 0.4, 0.98, 0.09));
  chassis.add(rbox(dark, 0, 0.66, 0, 1.6, 0.12, 1.0, 0.05));
  for (const wx of [-0.55, 0.55]) for (const wz of [-0.6, 0.6]) {
    const f = mesh(geo('fender', () => new THREE.CylinderGeometry(0.5, 0.5, 0.36, 20, 1, true, -Math.PI / 2, Math.PI)), mat(body, { double: true }), wx, R, wz);
    f.rotation.x = -Math.PI / 2; chassis.add(f);
    const lip = mesh(geo('fenderLip', () => new THREE.TorusGeometry(0.5, 0.03, 6, 20, Math.PI)), mat(dark), wx, R, wz + Math.sign(wz) * 0.18); chassis.add(lip);
  }
  const dec = sideDecal(kind, body, acc);
  for (const z of [-0.5, 0.5]) {
    const pl = mesh(geo('decalPlane', () => new THREE.PlaneGeometry(1, 1)), texMat(dec), 0, 0.84, z * 1.002, 1.36, 0.32, 1, false);
    if (z < 0) pl.rotation.y = Math.PI;
    chassis.add(pl);
  }
  // hood scoop + bumpers + lights
  chassis.add(rbox(dark, 0.45, 1.02, 0, 0.36, 0.1, 0.4, 0.04));
  chassis.add(rbox('#9aa1ab', 0.84, 0.64, 0, 0.1, 0.12, 0.9, 0.04, { shiny: true }));
  chassis.add(rbox('#9aa1ab', -0.84, 0.64, 0, 0.1, 0.12, 0.9, 0.04, { shiny: true }));
  for (const z of [-0.32, 0.32]) chassis.add(ball('#fff6a8', 0.79, 0.86, z, 0.04, 0.07, 0.09, { basic: true }));
  for (const z of [-0.36, 0.36]) chassis.add(ball('#ff3b3b', -0.79, 0.86, z, 0.03, 0.05, 0.07, { basic: true }));
  // open cockpit: low doors, short windshield and a roll bar so the pup is easy to see
  const cab = new THREE.Group(); cab.position.set(-0.08, 0, 0); chassis.add(cab);
  cab.add(rbox(body, 0, 1.14, 0, 0.76, 0.2, 0.9, 0.07));
  const ws = block('#bfe9ff', 0.36, 1.32, 0, 0.03, 0.2, 0.78, { opacity: 0.35, shiny: true, metal: 0, rough: 0.05 }); ws.rotation.z = -0.4; ws.castShadow = false; cab.add(ws);
  cab.add(rbox(dark, 0.37, 1.24, 0, 0.06, 0.05, 0.82, 0.02));
  const bar = mesh(geo('rbar', () => new THREE.TorusGeometry(0.44, 0.045, 8, 20, Math.PI)), mat(dark), -0.32, 1.2, 0); bar.rotation.y = Math.PI / 2; cab.add(bar);
  cab.add(rbox('#333', -0.16, 1.26, 0, 0.18, 0.42, 0.56, 0.07));  // seat back
  // the pup, looking out at the viewer
  const head = buildPupHead(p, 0.31);
  head.position.set(0.02, 1.58, 0.06); head.rotation.y = -0.85;
  cab.add(head); ud.head = head;
  // per-design gear
  const lightBar = (c1, c2) => {
    cab.add(rbox('#333', -0.32, 1.66, 0, 0.14, 0.06, 0.7, 0.03));
    const l1 = ball(c1, -0.32, 1.71, -0.2, 0.07, 0.06, 0.14, { basic: true }); const l2 = ball(c2, -0.32, 1.71, 0.2, 0.07, 0.06, 0.14, { basic: true });
    cab.add(l1); cab.add(l2); ud.blink.push(l1, l2);
  };
  switch (kind) {
    case 'police': {
      lightBar('#ff3b3b', '#3b8bff');
      for (const z of [-0.51, 0.51]) { const st = mesh(starGeo(0.1, 0.02), mat('#ffd23f', { shiny: true, metal: 0.6 }), 0.1, 0.8, z); chassis.add(st); }
      chassis.add(rbox('#222', 0.88, 0.75, 0, 0.08, 0.26, 0.7, 0.03));  // push bar
      break;
    }
    case 'fire': {
      lightBar('#ff3b3b', '#ff3b3b');
      const lad = new THREE.Group(); lad.position.set(-0.35, 1.08, 0); chassis.add(lad);
      for (const z of [-0.18, 0.18]) put(lad, rod('#d5dbe3', 0, 0, z, 0.025, 1.0, { shiny: true })).rotation.z = Math.PI / 2;
      for (let i = 0; i < 7; i++) put(lad, rod('#d5dbe3', -0.45 + i * 0.15, 0, 0, 0.018, 0.36, { shiny: true })).rotation.x = Math.PI / 2;
      const cannon = new THREE.Group(); cannon.position.set(0.42, 1.12, 0.25); chassis.add(cannon); ud.cannon = cannon;
      put(cannon, rod('#9aa1ab', 0.15, 0.04, 0, 0.05, 0.36, { shiny: true })).rotation.z = -Math.PI / 2 + 0.25;
      put(cannon, rod('#ffd23f', 0.33, 0.09, 0, 0.065, 0.08, { shiny: true })).rotation.z = -Math.PI / 2 + 0.25;
      break;
    }
    case 'heli': {
      cab.add(rod('#555', -0.32, 1.85, 0, 0.03, 0.3));
      const rotor = new THREE.Group(); rotor.position.set(-0.32, 2.02, 0); cab.add(rotor); ud.rotor = rotor;
      rotor.add(block('#4a4a4a', 0, 0, 0, 1.9, 0.02, 0.1)); rotor.add(block('#4a4a4a', 0, 0, 0, 0.1, 0.02, 1.9));
      rotor.add(ball(dark, 0, 0.02, 0, 0.07));
      for (const k of [-1, 1]) { const wg = block('#c9ced6', -0.45, 0.85, k * 0.62, 0.42, 0.04, 0.3); ud.wings.push(wg); chassis.add(wg); }
      const tail = rbox('#c9ced6', -0.95, 0.95, 0, 0.32, 0.12, 0.12, 0.04); chassis.add(tail);
      break;
    }
    case 'dozer': {
      const blade = new THREE.Group(); blade.position.set(1.0, 0.55, 0); chassis.add(blade); ud.blade = blade;
      const bl = mesh(geo('blade', () => new THREE.CylinderGeometry(0.42, 0.42, 1.3, 20, 1, true, -0.9, 1.8)), mat('#8b939e', { shiny: true, metal: 0.7, double: true }), 0.05, 0, 0);
      bl.rotation.x = Math.PI / 2; bl.rotation.z = Math.PI; blade.add(bl);
      blade.add(block('#ffd23f', -0.18, 0.12, -0.35, 0.36, 0.06, 0.06)); blade.add(block('#ffd23f', -0.18, 0.12, 0.35, 0.36, 0.06, 0.06));
      chassis.add(rod('#666', 0.15, 1.3, -0.3, 0.05, 0.5, { shiny: true }));
      ud.exhaust = new THREE.Vector3(0.15, 1.6, -0.3);
      break;
    }
    case 'hover': {
      chassis.add(rbox('#173f8f', 0, 0.56, 0, 1.75, 0.14, 1.14, 0.07));
      const fan = new THREE.Group(); fan.position.set(-0.95, 1.25, 0); chassis.add(fan); ud.fan = fan;
      const ring = mesh(geo('fanRing', () => new THREE.TorusGeometry(0.3, 0.05, 10, 28)), mat(dark), 0, 0, 0); ring.rotation.y = Math.PI / 2; fan.add(ring);
      const blades = new THREE.Group(); fan.add(blades); ud.fanBlades = blades;
      for (let i = 0; i < 3; i++) { const b = block('#555', 0, 0, 0, 0.03, 0.26, 0.08); b.rotation.x = i * Math.PI * 2 / 3; b.position.set(0, Math.cos(i * 2.09) * 0.13, Math.sin(i * 2.09) * 0.13); blades.add(b); }
      chassis.add(rod('#555', -0.85, 1.0, 0, 0.03, 0.4));
      break;
    }
    case 'recycle': {
      chassis.add(rbox('#1f6fd6', -0.62, 1.22, 0, 0.36, 0.38, 0.7, 0.05));
      const sym = mesh(geo('decalPlane', () => new THREE.PlaneGeometry(1, 1)), texMat(canvasTex(64, 64, (c) => { c.fillStyle = '#1f6fd6'; c.fillRect(0, 0, 64, 64); c.fillStyle = '#fff'; c.font = '900 50px Arial'; c.fillText('♻', 6, 50); })), -0.62, 1.22, 0.356, 0.28, 0.28, 1, false);
      chassis.add(sym);
      const arm = new THREE.Group(); arm.position.set(0.5, 1.05, -0.3); chassis.add(arm);
      put(arm, rod('#9aa1ab', 0.12, 0.2, 0, 0.035, 0.45, { shiny: true })).rotation.z = -0.6;
      put(arm, rod('#9aa1ab', 0.35, 0.32, 0, 0.03, 0.3, { shiny: true })).rotation.z = 1.2;
      break;
    }
    case 'plow': {
      const p2 = shapeGeo('plow', [[0, 0], [0.18, 0.05], [0.18, 0.6], [0, 0.55]], 1.3, 0.02);
      const pl = mesh(p2, mat('#e9eef5', { shiny: true, metal: 0.4 }), 0.9, 0.3, 0); pl.rotation.y = -0.15; chassis.add(pl); ud.blade = pl;
      cab.add(rbox('#ffb000', -0.32, 1.66, 0, 0.14, 0.06, 0.5, 0.03));
      break;
    }
    case 'jungle': {
      const bar2 = mesh(geo('rollbar', () => new THREE.TorusGeometry(0.42, 0.04, 8, 20, Math.PI)), mat('#3a3a3a'), -0.65, 1.0, 0); bar2.rotation.y = Math.PI / 2; chassis.add(bar2);
      const spare = new THREE.Group(); spare.position.set(-0.9, 0.95, 0); spare.add(wheelCyl('#1d1d1d', 0.2, 0.12)); spare.add(wheelCyl('#9aa1ab', 0.1, 0.14)); spare.rotation.y = Math.PI / 2; chassis.add(spare);
      for (let i = 0; i < 5; i++) chassis.add(ball('#3fbf4f', -0.6 + i * 0.3, 1.02, (i % 2 ? 1 : -1) * 0.42, 0.09, 0.05, 0.12));
      break;
    }
    case 'city': {
      cab.add(rbox('#ffd23f', -0.32, 1.66, 0, 0.16, 0.06, 0.5, 0.03));
      break;
    }
    case 'dino': case 'dinosk': {
      for (let i = 0; i < 4; i++) chassis.add(mesh(coneG(8), mat(acc), -0.72 + i * 0.12, 1.12, 0, 0.07, 0.2, 0.05));
      for (let i = 0; i < 3; i++) chassis.add(mesh(coneG(8), mat(acc), 0.36 + i * 0.16, 1.12, 0, 0.06, 0.16, 0.05));
      const tail = mesh(coneG(12), mat(body), -1.15, 0.85, 0, 0.16, 0.7, 0.16); tail.rotation.z = Math.PI / 2 + 0.25; chassis.add(tail); ud.tail = tail;
      for (let i = 0; i < 5; i++) put(chassis, mesh(coneG(6), mat('#ffffff'), 0.82, 0.6, -0.3 + i * 0.15, 0.03, 0.08, 0.03)).rotation.z = Math.PI;
      for (const z of [-0.3, 0.3]) put(chassis, ball('#fffbe0', 0.72, 0.98, z, 0.06)).add(ball('#111', 0.5, 0, 0, 0.5));
      break;
    }
    case 'digger': {
      chassis.add(rbox('#9aa3ad', -0.55, 1.18, 0, 0.12, 0.34, 0.26, 0.08));
      for (const z of [-0.32, 0.32]) chassis.add(ball(acc, 0.8, 0.86, z, 0.05, 0.08, 0.1, { basic: true }));
      break;
    }
    case 'bull': {
      for (const k of [-1, 1]) {
        const horn = mesh(geo('horn', () => new THREE.TorusGeometry(0.22, 0.05, 8, 14, Math.PI * 0.7)), mat('#fff6e0'), -0.32, 1.62, k * 0.3);
        horn.rotation.set(0, k > 0 ? 0 : Math.PI, Math.PI * 0.15); cab.add(horn);
      }
      for (const z of [-0.18, 0.18]) put(chassis, ball('#fff', 0.7, 1.02, z, 0.08)).add(ball('#111', 0.5, 0, 0, 0.5));
      const ring = mesh(geo('nring', () => new THREE.TorusGeometry(0.08, 0.02, 8, 16)), mat(acc, { shiny: true }), 0.92, 0.62, 0); ring.rotation.y = Math.PI / 2; chassis.add(ring);
      break;
    }
    case 'shark': {
      const fin = mesh(shapeGeo('fin', [[0, 0], [0.3, 0.55], [0.5, 0]], 0.08, 0.02), mat(body), -0.75, 1.02, 0); cab.add(fin);
      for (let i = 0; i < 7; i++) put(chassis, mesh(coneG(6), mat('#ffffff'), 0.82, 0.68, -0.36 + i * 0.12, 0.035, 0.1, 0.035)).rotation.z = Math.PI;
      for (const z of [-0.36, 0.36]) put(chassis, ball('#fff', 0.68, 0.92, z, 0.07)).add(ball('#111', 0.5, 0, 0, 0.5));
      break;
    }
    case 'unicorn': {
      const horn = mesh(coneG(12), mat(acc, { shiny: true, metal: 0.6 }), 0.95, 1.12, 0, 0.07, 0.5, 0.07); horn.rotation.z = -0.9; chassis.add(horn);
      for (let i = 0; i < 4; i++) { const st = mesh(starGeo(0.07, 0.02), mat('#fff36b', { basic: true }), -0.6 + i * 0.35, 1.08, (i % 2 ? 1 : -1) * 0.52); chassis.add(st); }
      break;
    }
  }
  // magnet ring / glow (hidden until used)
  const ringM = mesh(geo('magRing', () => new THREE.TorusGeometry(1.25, 0.03, 8, 48)), mat('#4cc9f0', { basic: true, opacity: 0.7 }), 0, 0.9, 0, 1, 1, 1, false);
  ringM.visible = false; root.add(ringM); ud.magRing = ringM;
  const glow = mesh(sphereG(), mat(p.color, { basic: true, opacity: 0.28 }), 0, 0.95, 0, 1.25, 1.0, 0.9, false);
  glow.visible = false; root.add(glow); ud.glow = glow;
  const bed = new THREE.Group(); bed.position.set(-0.62, 1.04, 0); chassis.add(bed); ud.bed = bed; ud.bedCount = 0;
  root.traverse(o => { if (o.isMesh && !o.material.transparent && !o.material.isMeshBasicMaterial) o.castShadow = true; });
  return root;
}

// ======================================================================
// 3D models: friends, obstacles, collectibles
// ======================================================================
function buildFriend(kind, s = 1) {
  const g = new THREE.Group(); g.scale.setScalar(s);
  const eyes = (x, y, z, r = 0.025) => { for (const k of [-1, 1]) g.add(ball('#111', x, y, z + k * 0.05, r)); };
  if (kind === 'kitten') {
    g.add(ball('#ff9f43', 0, 0.14, 0, 0.16, 0.14, 0.13)); g.add(ball('#ff9f43', 0.06, 0.33, 0, 0.13));
    for (const k of [-1, 1]) g.add(mesh(coneG(8), mat('#ff9f43'), 0.05, 0.46, k * 0.07, 0.05, 0.1, 0.04));
    g.add(ball('#ffd9b0', 0.16, 0.3, 0, 0.05, 0.04, 0.06)); eyes(0.16, 0.36, 0, 0.02);
    const tail = rod('#ff9f43', -0.18, 0.25, 0, 0.025, 0.25); tail.rotation.z = 0.5; g.add(tail);
  } else if (kind === 'chicken' || kind === 'chickaletta') {
    g.add(ball('#ffffff', 0, 0.16, 0, 0.16)); g.add(ball('#ffffff', 0.08, 0.36, 0, 0.11));
    g.add(ball('#ff3b3b', 0.08, 0.49, 0, 0.05, 0.05, 0.02)); put(g, mesh(coneG(8), mat('#ffb000'), 0.2, 0.36, 0, 0.03, 0.08, 0.03)).rotation.z = -Math.PI / 2;
    eyes(0.15, 0.4, 0, 0.018);
    for (const z of [-0.05, 0.05]) g.add(rod('#ffb000', 0, 0.02, z, 0.012, 0.08));
    if (kind === 'chickaletta') { g.add(ball('#ff6fae', 0.06, 0.5, 0.06, 0.04)); g.add(rbox('#c77dff', -0.1, 0.08, 0.17, 0.12, 0.1, 0.04, 0.02)); }
  } else if (kind === 'duck') {
    g.add(ball('#ffe04d', 0, 0.13, 0, 0.15, 0.12, 0.12)); g.add(ball('#ffe04d', 0.08, 0.3, 0, 0.1));
    g.add(ball('#ff8c1a', 0.2, 0.29, 0, 0.06, 0.025, 0.05)); eyes(0.15, 0.34, 0, 0.018);
  } else if (kind === 'mayor') {
    g.add(mesh(coneG(16), mat('#9b59d0'), 0, 0.25, 0, 0.18, 0.5, 0.18));
    g.add(block('#ffd23f', 0, 0.42, 0, 0.2, 0.03, 0.2));
    g.add(ball('#f3c9a0', 0, 0.62, 0, 0.12)); g.add(ball('#6b3e1f', -0.03, 0.66, 0, 0.13, 0.1, 0.13));
    g.add(mesh(cylG(20), mat('#62309a'), 0, 0.75, 0, 0.17, 0.03, 0.17)); g.add(mesh(cylG(20), mat('#62309a'), 0, 0.82, 0, 0.09, 0.12, 0.09));
    g.add(ball('#ff6fae', 0.05, 0.8, 0.09, 0.03)); eyes(0.11, 0.64, 0, 0.015);
  } else {
    g.add(ball('#2fa14a', 0, 0.1, 0, 0.18, 0.1, 0.15)); g.add(ball('#8fd16b', 0.2, 0.1, 0, 0.07)); eyes(0.25, 0.13, 0, 0.012);
    for (const [x, z] of [[0.1, 0.1], [0.1, -0.1], [-0.1, 0.1], [-0.1, -0.1]]) g.add(ball('#8fd16b', x, 0.02, z, 0.04));
  }
  return g;
}
const helpTex = canvasTex(256, 112, (c, w, h) => {
  c.fillStyle = '#fff'; c.beginPath(); c.roundRect(4, 4, w - 8, h - 30, 30); c.fill();
  c.beginPath(); c.moveTo(w / 2 - 14, h - 28); c.lineTo(w / 2, h - 4); c.lineTo(w / 2 + 14, h - 28); c.fill();
  c.fillStyle = '#e0322b'; c.font = '900 56px Trebuchet MS, Arial'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('HELP!', w / 2, (h - 26) / 2 + 4);
});
function helpSprite() { const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: helpTex, depthTest: true })); sp.scale.set(0.8, 0.35, 1); return sp; }
function buildCar(color) {
  const g = new THREE.Group(), inner = new THREE.Group(); g.add(inner);
  inner.add(rbox(color, 0, 0.27, 0, 0.94, 0.24, 0.62, 0.08));
  inner.add(rbox(color, -0.04, 0.47, 0, 0.56, 0.2, 0.56, 0.08));
  inner.add(block('#cdeeff', -0.04, 0.48, 0, 0.5, 0.15, 0.58, { shiny: true, metal: 0.1 }));
  for (const x of [-0.3, 0.3]) for (const z of [-0.3, 0.3]) { const w = wheelCyl('#222', 0.12, 0.1); w.position.set(x, 0.12, z); inner.add(w); }
  inner.add(ball('#fff6a8', 0.47, 0.3, 0.2, 0.02, 0.04, 0.05, { basic: true })); inner.add(ball('#fff6a8', 0.47, 0.3, -0.2, 0.02, 0.04, 0.05, { basic: true }));
  g.userData.inner = inner;
  return g;
}
function buildBoulder() {
  const g = new THREE.Group();
  const r = mesh(geo('rock', () => { const ge = new THREE.IcosahedronGeometry(1, 1); const p = ge.attributes.position; for (let i = 0; i < p.count; i++) { const f = 0.88 + ((i * 73) % 17) / 70; p.setXYZ(i, p.getX(i) * f, p.getY(i) * f, p.getZ(i) * f); } ge.computeVertexNormals(); return ge; }), mat('#7d8894', { }), 0, 0.3, 0, 0.4, 0.33, 0.38);
  g.add(r);
  for (const k of [-1, 1]) { g.add(ball('#fff', 0.1, 0.36, 0.3 + k * 0.0, 0.06)); }
  g.children[1].position.set(0.08, 0.38, 0.33); g.children[2].position.set(-0.1, 0.38, 0.33);
  g.add(ball('#111', 0.09, 0.37, 0.38, 0.03)); g.add(ball('#111', -0.09, 0.37, 0.38, 0.03));
  const b1 = block('#333', 0.1, 0.46, 0.35, 0.12, 0.025, 0.02); b1.rotation.z = -0.4; g.add(b1);
  const b2 = block('#333', -0.1, 0.46, 0.35, 0.12, 0.025, 0.02); b2.rotation.z = 0.4; g.add(b2);
  return g;
}
function buildSnowman() {
  const g = new THREE.Group();
  g.add(ball('#ffffff', 0, 0.26, 0, 0.27)); g.add(ball('#ffffff', 0, 0.64, 0, 0.2)); g.add(ball('#ffffff', 0, 0.93, 0, 0.15));
  put(g, mesh(coneG(10), mat('#ff8c1a'), 0.0, 0.93, 0.2, 0.03, 0.16, 0.03)).rotation.x = Math.PI / 2;
  g.add(ball('#111', -0.05, 0.98, 0.13, 0.02)); g.add(ball('#111', 0.05, 0.98, 0.13, 0.02));
  const scarf = mesh(geo('scarf', () => new THREE.TorusGeometry(0.16, 0.04, 8, 20)), mat('#e0322b'), 0, 0.8, 0); scarf.rotation.x = Math.PI / 2; g.add(scarf);
  g.add(mesh(cylG(16), mat('#222'), 0, 1.07, 0, 0.17, 0.03, 0.17)); g.add(mesh(cylG(16), mat('#222'), 0, 1.16, 0, 0.11, 0.16, 0.11));
  for (const k of [-1, 1]) { const arm = rod('#6b4423', 0, 0.68, k * 0.28, 0.015, 0.3); arm.rotation.x = k * 1.1; g.add(arm); }
  return g;
}
function buildTires() {
  const g = new THREE.Group();
  for (let i = 0; i < 3; i++) {
    const t = mesh(geo('tireT', () => new THREE.TorusGeometry(0.26, 0.15, 12, 24)), mat('#1d1d1d'), 0, 0.2 + i * 0.44, 0); t.rotation.x = Math.PI / 2; t.scale.set(1, 1, 1.4); g.add(t);
    const y = mesh(geo('tireY', () => new THREE.TorusGeometry(0.26, 0.152, 4, 24, 0.9)), mat('#ffcc00'), 0, 0.2 + i * 0.44, 0); y.rotation.set(Math.PI / 2, 0, i); y.scale.set(1, 1, 0.5); g.add(y);
  }
  return g;
}
function buildFire() {
  const g = new THREE.Group();
  g.add(mesh(cylG(16), mat('#2b2b2b'), 0, 0.03, 0, 0.42, 0.06, 0.5));
  const flames = [];
  for (let i = 0; i < 5; i++) {
    const outer = mesh(coneG(10), mat('#ff6a00', { basic: true }), (i - 2) * 0.13, 0.35, ((i * 37) % 5 - 2) * 0.1, 0.13, 0.6, 0.13, false);
    const inner = mesh(coneG(10), mat('#ffe066', { basic: true }), 0, -0.12, 0.02, 0.55, 0.6, 0.55, false);
    outer.add(inner); g.add(outer); flames.push(outer);
  }
  g.userData.flames = flames;
  return g;
}
let brickTex = null;
function buildWall(h) {
  brickTex = brickTex || canvasTex(128, 128, (c, w, hh) => {
    c.fillStyle = '#8a8476'; c.fillRect(0, 0, w, hh);
    for (let r = 0; r < 4; r++) for (let k = -1; k < 3; k++) { c.fillStyle = (r + k) % 3 ? '#a59f90' : '#b8b2a3'; c.fillRect(k * 64 + (r % 2) * 32 + 3, r * 32 + 3, 58, 26); }
  }, true);
  const g = new THREE.Group();
  const t = brickTex.clone(); t.needsUpdate = true; t.repeat.set(1.4, h / 0.6);
  const m = new THREE.Mesh(boxG(), texMat(t)); m.scale.set(0.56, h, 1.6); m.position.y = h / 2; m.castShadow = m.receiveShadow = true; g.add(m);
  for (let i = 0; i < 3; i++) g.add(block('#9a9486', 0, h + 0.1, -0.55 + i * 0.55, 0.56, 0.2, 0.3));
  return g;
}
function buildBone() {
  const g = new THREE.Group();
  put(g, rod('#ffffff', 0, 0, 0, 0.045, 0.26)).rotation.z = Math.PI / 2;
  for (const x of [-0.14, 0.14]) for (const y of [-0.04, 0.04]) g.add(ball('#ffffff', x, y, 0, 0.055));
  g.traverse(o => { if (o.isMesh) o.material = mat('#fff8e7', { emissive: '#3a2a10' }); });
  return g;
}
function buildGear() {
  const g = new THREE.Group();
  const c = mesh(cylG(16), mat('#a3acb7', { shiny: true, metal: 0.8 }), 0, 0, 0, 0.12, 0.05, 0.12); c.rotation.x = Math.PI / 2; g.add(c);
  for (let i = 0; i < 8; i++) { const t = block('#a3acb7', Math.cos(i * 0.785) * 0.14, Math.sin(i * 0.785) * 0.14, 0, 0.06, 0.06, 0.05, { shiny: true, metal: 0.8 }); t.rotation.z = i * 0.785; g.add(t); }
  return g;
}
function buildRamp(e) {
  const w = e.w * S, h = e.h * S, theme = curLevel.theme;
  const g = new THREE.Group();
  const col = theme === 'castle' ? '#8d8676' : theme === 'snow' ? '#dbe8f7' : '#8a5a2b';
  const m = mesh(shapeGeo(`ramp${w}${h}`, [[0, 0], [w, h], [w, 0]], 1.8, 0.01), mat(col), 0, 0, 0); g.add(m);
  const len = Math.hypot(w, h);
  const strip = block('#ffcc00', w / 2, h / 2 + 0.02, 0, len, 0.03, 1.82); strip.rotation.z = Math.atan2(h, w); g.add(strip);
  for (const z of [-0.6, 0, 0.6]) { const st = block('#ffffff', w / 2, h / 2 + 0.035, z, len * 0.9, 0.012, 0.06); st.rotation.z = Math.atan2(h, w); g.add(st); }
  return g;
}
function buildLoop(e) {
  const g = new THREE.Group(), r = e.r * S + 0.12;
  for (const z of [-0.75, 0.75]) {
    const t = mesh(geo('loopT' + r, () => new THREE.TorusGeometry(r, 0.07, 10, 64)), mat('#d64545'), 0, r - 0.12 + 0.12, z); g.add(t);
    const y = mesh(geo('loopY' + r, () => new THREE.TorusGeometry(r + 0.06, 0.03, 6, 64)), mat('#ffcc00'), 0, r, z); g.add(y);
  }
  for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2, c = rod('#d64545', Math.sin(a) * r, r - Math.cos(a) * r, 0, 0.03, 1.5); c.rotation.x = Math.PI / 2; g.add(c); }
  for (const x of [-r - 0.2, r + 0.2]) g.add(block('#555', x, r / 2, -0.9, 0.12, r, 0.12));
  return g;
}
const waterMat = () => mat('#3f8fd6', { shiny: true, metal: 0.1, rough: 0.15 });
function buildPit(e) {
  const w = e.w * S, g = new THREE.Group(), snowy = curLevel.theme === 'snow';
  g.add(block(snowy ? '#8fc4f0' : '#3f8fd6', w / 2, 0.012, 0, w, 0.02, 3.2, { shiny: true, metal: 0.1, rough: 0.15 }));
  g.add(block(snowy ? '#5c7a99' : '#3a2a1a', w / 2, -0.4, -1.55, w, 0.8, 0.1));
  for (const x of [0, w]) g.add(block(GROUNDS[curLevel.theme].top, x, 0.0, 0, 0.08, 0.06, 3.2));
  if (!e.canyon) {
    g.add(rod('#555', -0.46, 0.3, -1.2, 0.025, 0.6));
    const sign = mesh(shapeGeo('warn', [[-0.2, 0], [0.2, 0], [0, 0.35]], 0.03, 0.01), mat('#ffcc00'), -0.46, 0.55, -1.18); g.add(sign);
    g.add(block('#111', -0.46, 0.65, -1.15, 0.03, 0.1, 0.01));
  }
  return g;
}
function buildBridge(e) {
  const w = e.w * S, g = new THREE.Group();
  g.add(block('#3f8fd6', w / 2, -0.05, 0, w, 0.02, 3.2, { shiny: true, metal: 0.1, rough: 0.15 }));
  for (const x of [-0.18, w + 0.18]) {
    g.add(block('#8d8676', x, 0.8, -1.0, 0.36, 1.6, 0.4));
    for (let i = 0; i < 3; i++) g.add(block('#8d8676', x - 0.12 + i * 0.12, 1.68, -1.0, 0.08, 0.16, 0.4));
  }
  const plank = new THREE.Group(); g.add(plank); g.userData.plank = plank;
  const t = canvasTex(128, 32, (c, ww, hh) => { c.fillStyle = '#8a5a2b'; c.fillRect(0, 0, ww, hh); c.fillStyle = '#5e3c1b'; for (let x = 0; x < ww; x += 16) c.fillRect(x, 0, 3, hh); }, true);
  t.repeat.set(w / 0.5, 1);
  const pm = new THREE.Mesh(boxG(), texMat(t)); pm.scale.set(w, 0.1, 1.6); pm.position.set(w / 2, -0.04, 0); pm.castShadow = pm.receiveShadow = true; plank.add(pm);
  const chainM = mat('#555'); const chain = new THREE.Mesh(cylG(6), chainM); chain.castShadow = true; g.add(chain); g.userData.chain = chain;
  return g;
}
function buildFinish(e) {
  const g = new THREE.Group();
  const chk = canvasTex(256, 64, (c, w, h) => { for (let i = 0; i < 16; i++) for (let j = 0; j < 4; j++) { c.fillStyle = (i + j) % 2 ? '#111' : '#fff'; c.fillRect(i * 16, j * 16, 16, 16); } });
  for (const z of [-1.4, 1.4]) g.add(rod('#eeeeee', 1.0, 1.25, z, 0.06, 2.5));
  const banner = new THREE.Mesh(boxG(), texMat(chk)); banner.scale.set(0.1, 0.45, 2.9); banner.position.set(1.0, 2.35, 0); g.add(banner);
  const floor = new THREE.Mesh(geo('decalPlane', () => new THREE.PlaneGeometry(1, 1)), texMat(chk)); floor.rotation.x = -Math.PI / 2; floor.scale.set(0.8, 3.2, 1); floor.position.set(1.0, 0.015, 0); g.add(floor);
  if (e.who) {
    const cz = buildFriend(e.who, 1.4); cz.position.set(1.5, 0.12, -0.3); cz.rotation.y = -0.6; g.add(cz); g.userData.citizen = cz;
    g.add(ball('#8d99a6', 1.5, 0.05, -0.3, 0.4, 0.1, 0.4));
    const h = helpSprite(); h.position.set(1.5, 1.6, -0.3); g.add(h); g.userData.help = h;
  }
  return g;
}

// ======================================================================
// Environment
// ======================================================================
const SKIES = [['#5ec8ff', '#d9f4ff'], ['#ff9a6b', '#ffe0a8'], ['#7b6bff', '#ffc3e8'], ['#0f1a45', '#34508f']];
const GROUNDS = {
  bay:     { track: '#b07a43', top: '#7a4f24', outer: '#6cc46f' },
  mud:     { track: '#8a5a2b', top: '#5e3c1b', outer: '#8f7148' },
  stadium: { track: '#a06c3a', top: '#6e4622', outer: '#9a6a3a' },
  snow:    { track: '#eef5ff', top: '#c9dcf2', outer: '#f6faff' },
  castle:  { track: '#a39882', top: '#7d7461', outer: '#9fc99a' },
};
const hemi = new THREE.HemisphereLight('#ffffff', '#806040', 1.0); scene.add(hemi);
const sun = new THREE.DirectionalLight('#ffffff', 1.8);
sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048);
Object.assign(sun.shadow.camera, { left: -9, right: 9, top: 6, bottom: -4, near: 1, far: 40 });
sun.shadow.bias = -0.0005; sun.shadow.normalBias = 0.02;
scene.add(sun); scene.add(sun.target);
const world = new THREE.Group(); scene.add(world);           // entities live here
const decor = new THREE.Group(); scene.add(decor);           // scenery
let trackPlane, outerPlane, railMesh, snowPts = null, starPts = null, sea = null;
let decorX = 0, lastThemeKey = '', decorItems = [];

function groundTex(theme, outer) {
  return canvasTex(256, 256, (c, w, h) => {
    const gc = GROUNDS[theme];
    c.fillStyle = outer ? gc.outer : gc.track; c.fillRect(0, 0, w, h);
    if (theme === 'castle' && !outer) { for (let r = 0; r < 6; r++) for (let k = -1; k < 5; k++) { c.fillStyle = (r + k) % 2 ? '#aea38d' : '#988e79'; c.beginPath(); c.roundRect(k * 64 + (r % 2) * 32 + 3, r * 43 + 3, 58, 37, 8); c.fill(); } return; }
    for (let i = 0; i < 260; i++) { c.fillStyle = `rgba(${theme === 'snow' ? '120,160,210' : '0,0,0'},${0.04 + Math.random() * 0.08})`; c.beginPath(); c.arc(Math.random() * w, Math.random() * h, 2 + Math.random() * 6, 0, 7); c.fill(); }
    if (!outer) { c.fillStyle = theme === 'snow' ? 'rgba(80,120,180,.12)' : 'rgba(0,0,0,.12)'; for (let x = 0; x < w; x += 64) { c.fillRect(x, 70, 36, 10); c.fillRect(x + 24, 170, 36, 10); } }
    if (outer && (theme === 'bay' || theme === 'castle')) for (let i = 0; i < 120; i++) { c.fillStyle = 'rgba(30,110,40,.35)'; c.fillRect(Math.random() * w, Math.random() * h, 3, 9); }
  }, true);
}
function setTheme(lv) {
  const key = lv.theme + lv.sky;
  if (key === lastThemeKey) return;
  lastThemeKey = key;
  const sky = SKIES[lv.sky], night = lv.sky === 3;
  scene.background = canvasTex(4, 256, (c, w, h) => { const g = c.createLinearGradient(0, 0, 0, h); g.addColorStop(0, sky[0]); g.addColorStop(1, sky[1]); c.fillStyle = g; c.fillRect(0, 0, w, h); });
  scene.fog = new THREE.Fog(sky[1], 30, 95);
  hemi.color.set(night ? '#8fa6ff' : lv.sky === 1 ? '#ffe2c4' : '#ffffff'); hemi.intensity = night ? 0.55 : 1.0;
  sun.color.set(night ? '#b8c8ff' : lv.sky === 1 ? '#ffd2a0' : lv.sky === 2 ? '#ffd6f0' : '#ffffff'); sun.intensity = night ? 0.7 : 1.8;
  if (trackPlane) { scene.remove(trackPlane, outerPlane, railMesh); }
  const tt = groundTex(lv.theme, false); tt.repeat.set(30, 1);
  trackPlane = new THREE.Mesh(new THREE.PlaneGeometry(120, 3.4), new THREE.MeshToonMaterial({ map: tt, gradientMap: toonRamp }));
  trackPlane.rotation.x = -Math.PI / 2; trackPlane.position.set(0, 0, -0.1); trackPlane.receiveShadow = true; scene.add(trackPlane);
  const ot = groundTex(lv.theme, true); ot.repeat.set(40, 20);
  outerPlane = new THREE.Mesh(new THREE.PlaneGeometry(160, 80), new THREE.MeshToonMaterial({ map: ot, gradientMap: toonRamp }));
  outerPlane.rotation.x = -Math.PI / 2; outerPlane.position.set(0, -0.02, -20); outerPlane.receiveShadow = true; scene.add(outerPlane);
  railMesh = new THREE.Group();
  if (lv.theme !== 'castle') { railMesh.add(block('#2f3542', 0, 0.5, -1.9, 120, 0.08, 0.06)); railMesh.add(block('#2f3542', 0, 0.28, -1.9, 120, 0.06, 0.06)); }
  scene.add(railMesh);
  if (snowPts) { scene.remove(snowPts); snowPts = null; }
  if (starPts) { scene.remove(starPts); starPts = null; }
  if (sea) { scene.remove(sea); sea = null; }
  if (lv.theme === 'snow') {
    const pos = new Float32Array(600 * 3); for (let i = 0; i < 600; i++) { pos[i * 3] = Math.random() * 30 - 15; pos[i * 3 + 1] = Math.random() * 10; pos[i * 3 + 2] = Math.random() * 14 - 10; }
    const gg = new THREE.BufferGeometry(); gg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    snowPts = new THREE.Points(gg, new THREE.PointsMaterial({ color: '#ffffff', size: 0.07 })); scene.add(snowPts);
  }
  if (night) {
    const pos = new Float32Array(300 * 3); for (let i = 0; i < 300; i++) { pos[i * 3] = Math.random() * 200 - 100; pos[i * 3 + 1] = 12 + Math.random() * 40; pos[i * 3 + 2] = -80; }
    const gg = new THREE.BufferGeometry(); gg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    starPts = new THREE.Points(gg, new THREE.PointsMaterial({ color: '#ffffff', size: 0.35 })); scene.add(starPts);
  }
  if (lv.theme === 'stadium') {
    sea = new THREE.Group();
    sea.add(block('#2f9bdc', 0, -0.01, -34, 200, 0.02, 20, { shiny: true, metal: 0.1, rough: 0.2 }));
    sea.add(block('#f3d9a4', 0, 0.0, -23.5, 200, 0.03, 3));
    scene.add(sea);
  }
  resetDecor();
}
function resetDecor() { for (const d of decorItems) decor.remove(d.obj); decorItems = []; decorX = camX * S - 20; }

// scenery pieces
function tree(x, z, s = 1, snowy = false) {
  const g = new THREE.Group(); g.position.set(x, 0, z); g.scale.setScalar(s);
  g.add(rod('#6b4423', 0, 0.3, 0, 0.08, 0.6));
  for (let i = 0; i < 3; i++) { g.add(mesh(coneG(10), mat(snowy ? '#2d6a4f' : '#3fa34d'), 0, 0.75 + i * 0.4, 0, 0.6 - i * 0.14, 0.75, 0.6 - i * 0.14)); if (snowy) g.add(mesh(coneG(10), mat('#ffffff'), 0, 0.98 + i * 0.4, 0, 0.32 - i * 0.07, 0.3, 0.32 - i * 0.07)); }
  return g;
}
function roundTree(x, z, s = 1) {
  const g = new THREE.Group(); g.position.set(x, 0, z); g.scale.setScalar(s);
  g.add(rod('#7a4f24', 0, 0.45, 0, 0.1, 0.9));
  g.add(ball('#4cb85a', 0, 1.25, 0, 0.6)); g.add(ball('#5fd06c', 0.25, 1.45, 0.2, 0.4));
  return g;
}
function lookout(x, z, s = 1) {
  const g = new THREE.Group(); g.position.set(x, 0, z); g.scale.setScalar(s);
  g.add(mesh(cylG(24), mat('#e8e2d0'), 0, 3, 0, 0.6, 6, 0.6));
  g.add(mesh(cylG(24), mat('#d64545'), 0, 2.2, 0, 0.75, 0.3, 0.75));
  g.add(ball('#e8e2d0', 0, 6.6, 0, 1.4, 1.1, 1.4));
  g.add(mesh(geo('lookGlass', () => new THREE.SphereGeometry(1, 24, 12, 0, Math.PI * 2, 0.6, 0.9)), mat('#5ec8ff', { shiny: true, metal: 0.2 }), 0, 6.6, 0, 1.45, 1.15, 1.45));
  g.add(mesh(coneG(20), mat('#ffcc00'), 0, 8.0, 0, 1.2, 1.2, 1.2));
  g.add(ball('#d64545', 0, 8.7, 0, 0.18));
  const pawTex = canvasTex(128, 128, (c) => { c.fillStyle = '#1f6fd6'; c.beginPath(); c.arc(64, 64, 60, 0, 7); c.fill(); c.fillStyle = '#fff'; c.font = '900 80px Arial'; c.textAlign = 'center'; c.fillText('🐾', 64, 92); });
  const badge = new THREE.Mesh(geo('decalPlane', () => new THREE.PlaneGeometry(1, 1)), new THREE.MeshBasicMaterial({ map: pawTex, transparent: true }));
  badge.position.set(0, 5.3, 0.66); badge.scale.setScalar(0.8); g.add(badge);
  return g;
}
function mountain(x, z, s) {
  const g = new THREE.Group(); g.position.set(x, 0, z);
  g.add(mesh(coneG(7), mat('#8fa6c8'), 0, 4 * s, 0, 4 * s, 8 * s, 4 * s));
  g.add(mesh(coneG(7), mat('#ffffff'), 0, 6.6 * s, 0, 1.45 * s, 2.9 * s, 1.45 * s));
  return g;
}
function castleTower(x, z) {
  const g = new THREE.Group(); g.position.set(x, 0, z);
  g.add(mesh(cylG(16), mat('#a69f90'), 0, 2.4, 0, 0.9, 4.8, 0.9));
  g.add(mesh(coneG(16), mat('#7b3fe4'), 0, 5.6, 0, 1.1, 1.8, 1.1));
  g.add(rod('#555', 0, 6.9, 0, 0.03, 1.0));
  const flag = block('#ffd23f', 0.3, 7.2, 0, 0.6, 0.35, 0.02); g.add(flag); g.userData.flag = flag;
  g.add(block('#3a2a4a', 0, 3.4, 0.86, 0.35, 0.6, 0.05));
  return g;
}
const crowdTex = canvasTex(256, 256, (c, w, h) => {
  c.fillStyle = '#39415a'; c.fillRect(0, 0, w, h);
  const cols = ['#ff4d6d', '#ffd23f', '#4cc9f0', '#3bceac', '#f1f1f1', '#ff8c42', '#c77dff'];
  const skin = ['#f3c9a0', '#c98a5a', '#8a5a3a', '#f6dcb5'];
  for (let r = 0, y = 20; y < h; y += 32, r++) for (let x = 16 + (r % 2) * 16; x < w; x += 32) {
    const k = (x * 7 + y * 3) % 7;
    c.fillStyle = cols[k]; c.beginPath(); c.ellipse(x, y + 9, 11, 9, 0, 0, 7); c.fill();          // shirt
    c.fillStyle = skin[(x + y) % 4]; c.beginPath(); c.arc(x, y - 4, 7, 0, 7); c.fill();           // head
    if (k % 3 === 0) { c.fillStyle = cols[(k + 2) % 7]; c.fillRect(x + 8, y - 16, 3, 16); c.fillRect(x + 8, y - 16, 12, 8); } // flag
  }
}, true);

function spawnDecor(theme, x) {
  const items = [];
  const add = (o, w = 1) => { decor.add(o); items.push({ obj: o, x: o.position.x + w }); };
  const r = (a, b) => a + Math.random() * (b - a);
  // fence posts with flags
  if (theme !== 'castle') {
    for (let px = x; px < x + 6; px += 1.2) {
      const post = block('#2f3542', px, 0.32, -1.9, 0.06, 0.64, 0.06); add(post);
      if (Math.round(px / 1.2) % 2 === 0) { const f = mesh(shapeGeo('flag', [[0, 0], [0.32, 0.09], [0, 0.18]], 0.01, 0), mat(['#e0322b', '#1f6fd6', '#ffc21a', '#2fae4a'][Math.abs(Math.round(px)) % 4], { double: true }), px + 0.03, 0.46, -1.9); add(f); }
    }
  }
  if (theme === 'bay' || theme === 'mud') {
    for (let i = 0; i < 3; i++) add(theme === 'mud' ? tree(x + r(0, 6), r(-3, -9), r(0.8, 1.3)) : roundTree(x + r(0, 6), r(-3, -10), r(0.8, 1.4)));
    if (Math.random() < 0.5) add(ball(theme === 'mud' ? '#b99b6b' : '#7fd07f', x + r(0, 6), -2, r(-18, -28), r(6, 10), r(3.5, 5), r(4, 6)), 10);
    if (Math.floor(x / 6) % 5 === 0) add(lookout(x + 3, -16, 1), 3);
  } else if (theme === 'snow') {
    for (let i = 0; i < 4; i++) add(tree(x + r(0, 6), r(-3, -12), r(0.8, 1.5), true));
    if (Math.random() < 0.7) add(mountain(x + r(0, 6), r(-26, -40), r(1.6, 2.6)), 12);
  } else if (theme === 'castle') {
    add(block('#b9b2a3', x + 3, 1.3, -6, 6.02, 2.6, 0.8), 3);
    for (let i = 0; i < 6; i++) add(block('#b9b2a3', x + 0.5 + i, 2.75, -6, 0.5, 0.3, 0.8));
    const ban = block(['#7b3fe4', '#ffd23f'][Math.floor(x / 6) % 2 ? 0 : 1], x + 1.5, 1.6, -5.58, 0.5, 1.2, 0.02); add(ban);
    if (Math.floor(x / 6) % 3 === 0) add(castleTower(x + 4.5, -6.5), 2);
    if (Math.random() < 0.5) add(roundTree(x + r(0, 6), r(-2.6, -4), r(0.6, 0.9)));
  } else if (theme === 'stadium') {
    const st = new THREE.Mesh(boxG(), texMat((() => { const t = crowdTex.clone(); t.needsUpdate = true; t.repeat.set(2.5, 1.6); return t; })()));
    st.scale.set(6.02, 3.6, 0.1); st.position.set(x + 3, 2.4, -7.5); st.rotation.x = -0.55; add(st, 3);
    add(block('#2f3542', x + 3, 0.5, -6.2, 6.02, 1.0, 0.3), 3);
    add(block('#ffcc00', x + 3, 1.02, -6.05, 6.02, 0.06, 0.05), 3);
    if (Math.floor(x / 6) % 3 === 0) {
      const tw = new THREE.Group(); tw.position.set(x + 1, 0, -9.5);
      tw.add(block('#555', 0, 4, 0, 0.18, 8, 0.18)); tw.add(block('#555', 0, 8.1, 0, 1.6, 0.6, 0.2));
      for (let j = 0; j < 3; j++) tw.add(ball('#fffbe0', -0.5 + j * 0.5, 8.1, 0.12, 0.16, 0.16, 0.05, { basic: true }));
      add(tw, 1);
    }
    if (Math.floor(x / 6) % 7 === 2) add(lookout(x + 3, -26, 0.9), 3);
  }
  decorItems.push(...items);
}
function updateDecor(theme) {
  const camU = camX * S;
  if (decorX < camU - 25) decorX = Math.floor((camU - 20) / 6) * 6;
  while (decorX < camU + 40) { spawnDecor(theme, decorX); decorX += 6; }
  decorItems = decorItems.filter(d => { if (d.x < camU - 22) { decor.remove(d.obj); return false; } return true; });
  for (const d of decorItems) if (d.obj.userData.flag) d.obj.userData.flag.rotation.y = Math.sin(time * 4 + d.x) * 0.3;
}

// ======================================================================
// Game state
// ======================================================================
let team = [PUPS[save.team[0]] || PUPS[0], PUPS[save.team[1]] || PUPS[3]];
let active = 0;
let pup = team[0];
let truckType = TRUCKS[save.truck] || TRUCKS[0];
if (!truckUnlocked(truckType)) truckType = TRUCKS[0];
let state = 'title', mode = 'campaign';
let levelIdx = 0, arenaIdx = 0, curLevel = LEVELS[0];
let camX = 0, time = 0, W = 1000;
let hearts = MAX_HEARTS, bones = 0, crushed = 0, rescued = 0, flips = 0, scrapCount = 0, bed = [];
let entities = [], particles = [], popups = [], flyers = [], confetti = [], waves = [];
let nextX = 0, segSinceFriend = 0, friendTarget = 3, sinceHazard = 0, wallsSpawned = 0;
let boostHeld = false, mudSlow = 0, mudLevel = 0, hurtSlow = 0, invuln = 0, shake = 0, iceT = 0;
let charge = [1, 1], abilityT = 0, abilityKey = null, swapCool = 0, slamming = false;
let cineT = 0, flashT = 0, flashColor = '#fff', dashT = 0, floatT = 0, specialHits = 0, prompted = false;
let ended = false, rival = null, finishX = 0, finishEnt = null, loopRide = null;
let fsScore = 0, fsCombo = 1, fsComboT = 0, fsTime = 0, wheelieHeld = false, wheelieAcc = 0, donutT = 0, crashT = 0, trick = { target: 0, done: 0 };
const truck = { sx: 300, y: GROUND, prevY: GROUND, vy: 0, onGround: true, jumps: 2, angle: 0, spin: 0, spinning: false, spinRate: 0, squash: 0, falling: false };

function truckWX() { return camX + truck.sx; }
function ab() { return pup.ab.key; }
function fxState() {
  const k = abilityT > 0 ? abilityKey : null;
  return { nitro: k === 'nitro', water: k === 'water', glide: k === 'glide', blade: k === 'blade', magnet: k === 'magnet' || k === 'ears', hover: k === 'hover', plow: k === 'plow', dash: k === 'dash' };
}
function invincible() { return abilityT > 0 || dashT > 0; }   // every special keeps you safe
function speed() {
  const fx = fxState();
  const mudOk = pup.id === 'zuma' || invincible();
  return curLevel.speed * (boostHeld ? 1.5 : 1) * (mudSlow > 0 && !mudOk ? 0.6 : 1) * (hurtSlow > 0 ? 0.45 : 1)
    * (fx.nitro ? 1.8 : dashT > 0 ? 5 : fx.blade || fx.plow ? 1.2 : 1) * (iceT > 0 && pup.id !== 'everest' ? 1.3 : 1) * (donutT > 0 ? 0.35 : 1) * (crashT > 0 ? 0.5 : 1);
}
function progress() {
  const g = curLevel.goal;
  return { rescue: rescued, crush: crushed, bones, flips, race: 0, reach: 0, freestyle: 0 }[g.type];
}
function freestyleLevel(i) {
  const a = ARENAS[i];
  return { name: a.name, ico: a.ico, theme: a.theme, sky: a.sky, speed: 330, gap: [260, 420], goal: { type: 'freestyle' },
           tip: 'TRICK in the air = flip! TRICK on the ground = donut! Hold WHEELIE for points!', w: { ramp: 3, bigRamp: 2, cars: 3, loop: 1.2, bonesHigh: 1 } };
}
function maxJumps() { return pup.id === 'liberty' ? 3 : 2; }

function startLevel() {
  ensureAudio();
  clearWorld();
  camX = 0; entities = []; particles = []; popups = []; flyers = []; confetti = []; waves = [];
  hearts = MAX_HEARTS; bones = 0; crushed = 0; rescued = 0; flips = 0; scrapCount = 0; bed = [];
  charge = [1, 1]; abilityT = 0; abilityKey = null; swapCool = 0; slamming = false; active = 0; pup = team[0];
  cineT = 0; flashT = 0; dashT = 0; floatT = 0; specialHits = 0; prompted = false;
  invuln = 0; hurtSlow = 0; mudSlow = 0; mudLevel = 0; shake = 0; iceT = 0; ended = false; loopRide = null;
  fsScore = 0; fsCombo = 1; fsComboT = 0; fsTime = FS_TIME; wheelieHeld = false; wheelieAcc = 0; donutT = 0; crashT = 0; trick = { target: 0, done: 0 };
  segSinceFriend = 0; sinceHazard = 0; wallsSpawned = 0; friendTarget = rint(curLevel.friendEvery || [2, 3]);
  nextX = 900;
  Object.assign(truck, { y: GROUND, prevY: GROUND, vy: 0, onGround: true, jumps: maxJumps(), angle: 0, spinning: false, squash: 0, falling: false });
  rival = null; finishEnt = null;
  const g = curLevel.goal;
  if (g.type === 'race' || g.type === 'reach') {
    finishX = g.n;
    finishEnt = { t: 'finish', x: finishX, w: 200, who: g.who, saved: false };
    entities.push(finishEnt);
  }
  if (g.type === 'race') {
    const others = PUPS.filter(p => !team.includes(p));
    rival = { x: truck.sx, pup: others[Math.floor(Math.random() * others.length)], truck: TRUCKS[1], spin: 0 };
  }
  setTheme(curLevel); resetDecor();
  useTruckModels();
  updatePadBtn();
}

function rint([a, b]) { return a + Math.floor(Math.random() * (b - a + 1)); }
function rnd(a, b) { return a + Math.random() * (b - a); }
function pickWeighted(w) {
  const keys = Object.keys(w); let total = 0;
  for (const k of keys) total += w[k];
  let r = Math.random() * total;
  for (const k of keys) { r -= w[k]; if (r <= 0) return k; }
  return keys[0];
}
function boneArc(x, n, base, peak, spread) {
  for (let i = 0; i < n; i++) { const k = n === 1 ? 0.5 : i / (n - 1); entities.push({ t: 'bone', x: x + i * spread, y: GROUND - base - peak * Math.sin(k * Math.PI), got: false }); }
  return (n - 1) * spread;
}
function carRow(x, n) {
  for (let i = 0; i < n; i++) entities.push({ t: 'car', x: x + i * 100, w: 96, h: 58, color: CAR_COLORS[Math.floor(Math.random() * CAR_COLORS.length)], crushed: false, crushT: 0 });
  return n * 100;
}

const HAZARDS = ['boulder', 'pit', 'tires', 'fire', 'snowman', 'bridge', 'canyon'];
function spawnSegment() {
  const lv = curLevel;
  if (finishEnt && nextX > finishX - 600) { nextX = Infinity; return; }
  let type;
  const hazards = HAZARDS.filter(k => lv.w[k]);
  const forceHazard = () => hazards[Math.floor(Math.random() * hazards.length)];
  if (lv.goal.type === 'rescue' && segSinceFriend >= friendTarget) type = 'friend';
  else if (lv.goal.type === 'rescue' && segSinceFriend === friendTarget - 1 && hazards.length) type = forceHazard();
  else if (sinceHazard >= (lv.forceEvery || 2) && hazards.length) type = forceHazard();
  else type = pickWeighted(lv.w);
  if (type === 'wall' && (wallsSpawned >= (lv.maxWalls || 0) || nextX < 2500)) type = hazards.length ? forceHazard() : 'cars';
  segSinceFriend++;
  sinceHazard = hazards.includes(type) || type === 'wall' ? 0 : sinceHazard + 1;
  const hard = levelIdx >= 5;
  switch (type) {
    case 'cars': nextX += carRow(nextX, rint([1, mode === 'freestyle' ? 4 : levelIdx >= 1 ? 4 : 3])); break;
    case 'ramp': case 'bigRamp': {
      const big = type === 'bigRamp';
      entities.push({ t: 'ramp', x: nextX, w: big ? 210 : 180, h: big ? 120 : 80, launch: big ? 1350 : 1150 });
      boneArc(nextX + 260, 5, big ? 260 : 180, 160, 70);
      nextX += 180 + (big ? 720 : 560);
      if (Math.random() < 0.4) nextX += carRow(nextX, 3);
      break;
    }
    case 'canyon': {
      entities.push({ t: 'ramp', x: nextX, w: 180, h: 80, launch: 1150 });
      const gw = rint([280, 340]);
      entities.push({ t: 'pit', x: nextX + 200, w: gw, canyon: true });
      boneArc(nextX + 220, 4, 240, 80, gw / 3);
      nextX += 200 + gw + 120; break;
    }
    case 'loop': nextX += 160; entities.push({ t: 'loop', x: nextX, r: 150, done: false }); nextX += 340; break;
    case 'mud': {
      const w = rint([200, 300]);
      entities.push({ t: 'mud', x: nextX, w, splashed: false });
      if (Math.random() < 0.5) boneArc(nextX + 40, 3, 190, 40, (w - 80) / 2);
      nextX += w; break;
    }
    case 'ice': { const w = rint([260, 420]); entities.push({ t: 'ice', x: nextX, w }); nextX += w; break; }
    case 'bonesLow': nextX += boneArc(nextX, 5, 70, 40, 60); break;
    case 'bonesHigh': nextX += boneArc(nextX, 5, 200, rnd(60, 140), 55); break;
    case 'boulder': case 'snowman': {
      const sm = type === 'snowman' || lv.theme === 'snow';
      entities.push({ t: sm ? 'snowman' : 'boulder', x: nextX, w: sm ? 60 : 72, h: sm ? 100 : 62, broken: false });
      boneArc(nextX - 60, 3, sm ? 220 : 180, 50, 96);
      if (hard && Math.random() < 0.35) { entities.push({ t: sm ? 'snowman' : 'boulder', x: nextX + 420, w: sm ? 60 : 72, h: sm ? 100 : 62, broken: false }); nextX += 420; }
      nextX += 72; break;
    }
    case 'tires': entities.push({ t: 'tires', x: nextX, w: 64, h: 132, broken: false }); boneArc(nextX - 80, 3, 280, 60, 110); nextX += 64; break;
    case 'fire': entities.push({ t: 'fire', x: nextX, w: 72, h: 70, broken: false }); boneArc(nextX - 60, 3, 200, 50, 96); nextX += 72; break;
    case 'wall': wallsSpawned++; entities.push({ t: 'wall', x: nextX + 200, w: 56, h: 300, broken: false }); nextX += 260; break;
    case 'pit': {
      const w = rint([130, levelIdx >= 5 ? 200 : 170]);
      entities.push({ t: 'pit', x: nextX, w });
      boneArc(nextX - 40, 3, 190, 50, (w + 80) / 2);
      nextX += w; break;
    }
    case 'bridge': entities.push({ t: 'bridge', x: nextX + 40, w: 220, phase: rnd(0, 4) }); nextX += 300; break;
    case 'goodie': {
      const kind = hearts < MAX_HEARTS && Math.random() < 0.5 ? 'heart' : 'star';
      entities.push({ t: 'goodie', kind, x: nextX + 40, y: GROUND - 250, got: false });
      nextX += 80; break;
    }
    case 'scrap': for (let i = 0; i < 3; i++) entities.push({ t: 'scrap', x: nextX + i * 70, y: GROUND - 60 - (i === 1 ? 140 : 0), got: false }); nextX += 160; break;
    case 'friend': {
      segSinceFriend = 0; friendTarget = rint(lv.friendEvery || [2, 3]);
      const balloon = Math.random() < (lv.balloon || 0);
      entities.push({ t: 'friend', x: nextX + 60, y: balloon ? GROUND - 230 : GROUND - 12, balloon, color: ['#ff4d6d', '#4cc9f0', '#ffd23f', '#c77dff'][rint([0, 3])],
                      kind: FRIENDS[Math.floor(Math.random() * FRIENDS.length)], done: false });
      nextX += 120; break;
    }
  }
  nextX += rint(lv.gap) + (['pit', 'tires', 'wall', 'bridge'].includes(type) ? 80 : 0);
}

function burst(x, y, n, colors, spd = 300, grav = 900, size = 6) {
  for (let i = 0; i < n; i++) {
    const a = Math.random() * Math.PI * 2, v = spd * (0.4 + Math.random() * 0.8);
    particles.push({ x, y, z: (Math.random() - 0.3) * 0.9, vx: Math.cos(a) * v, vy: Math.sin(a) * v - spd * 0.4, vz: (Math.random() - 0.5) * 1.5, life: 0.6 + Math.random() * 0.5, max: 1.1, color: colors[i % colors.length], size: size * (0.6 + Math.random() * 0.8), grav });
  }
}
function puff(x, y, color, vx = 0, vy = 0, size = 7, life = 0.4, grav = 0, z = 0) { particles.push({ x, y, z, vx, vy, vz: 0, life, max: life, color, size, grav }); }
function popup(text, wx, y, color = '#fff', size = 40) { popups.push({ text, x: wx, y: y - 50 * popups.filter(p => p.life > 0.5).length, life: 1.1, color, size }); }
function fsAdd(pts, text, color = '#ffd000') {
  if (mode !== 'freestyle' || ended) return;
  const v = Math.round(pts * fsCombo);
  fsScore += v; fsComboT = 3;
  popup(`${text} +${v}`, truckWX(), truck.y - 230, color, 34);
  fsCombo = Math.min(3, fsCombo + 0.25);
}

// ======================================================================
// Actions
// ======================================================================
function jump() {
  if (state !== 'play' || truck.falling || loopRide) return;
  if (truck.jumps > 0) {
    const iceWeak = iceT > 0 && pup.id !== 'everest' ? 0.85 : 1;
    truck.vy = (truck.onGround ? -JUMP_V : -AIR_JUMP_V) * iceWeak;
    if (!truck.onGround) truck.spinning = false;
    truck.onGround = false; truck.jumps--;
    sfx.jump();
    burst(truckWX() - 40, truck.y - 4, 8, ['#c99a6a', '#a8743f'], 160, 600, 7);
  }
}
function honk() {
  if (state !== 'play') return;
  (HORNS[truckType.id] || HORNS.pup)();
  setTimeout(sfx.bark, 700);
  popup('HONK!', truckWX() + 60, truck.y - 210, '#c58cff', 34);
}
const SPECIAL_SFX = {
  nitro: () => { for (let i = 0; i < 4; i++) { tone(700, 0.22, 'square', 0.1, 1100, i * 0.44); tone(1100, 0.22, 'square', 0.1, 700, i * 0.44 + 0.22); } noise(1.2, 0.3, 1800); },
  water: () => { noise(3, 0.35, 2200); tone(200, 0.5, 'sine', 0.2, 500); },
  glide: () => { for (let i = 0; i < 18; i++) noise(0.08, 0.35, 500, i * 0.12); tone(300, 1.2, 'sawtooth', 0.08, 900); },
  blade: () => { noise(1.5, 0.45, 300); tone(60, 1.5, 'sawtooth', 0.2, 90); },
  magnet: () => { for (let i = 0; i < 6; i++) tone(400 + i * 150, 0.15, 'square', 0.08, 1600, i * 0.1); },
  hover: () => { tone(110, 2, 'sawtooth', 0.1, 140); noise(2, 0.2, 900); },
  plow: () => { noise(2, 0.35, 1500); tone(90, 1.2, 'square', 0.1, 70); },
  ears: () => { for (let i = 0; i < 3; i++) tone(1800, 0.12, 'sine', 0.15, 2400, i * 0.25); },
  dash: () => { tone(200, 0.5, 'sawtooth', 0.15, 2000); noise(0.5, 0.4, 3000); },
  stomp: () => { noise(0.9, 0.5, 400); tone(110, 0.9, 'sawtooth', 0.2, 60); },
};
function useSpecial() {
  if (state !== 'play' || mode !== 'campaign' || charge[active] < 1 || abilityT > 0 || dashT > 0 || ended) return;
  charge[active] = 0;
  const k = ab();
  abilityKey = k; abilityT = ABILITY_TIME[k]; specialHits = 0;
  cineT = 0.55; flashT = 0.45; flashColor = pup.color; shake = 0.25;
  sfx.power(); setTimeout(() => (SPECIAL_SFX[k] || sfx.power)(), 250);
  showBanner(pup);
  burst(truckWX(), truck.y - 90, 40, [pup.color, '#ffffff', '#ffd23f'], 520, 300, 10);
  if (k === 'dash') { dashT = 0.45; }
  else if (k === 'stomp') { slamming = true; truck.onGround = false; truck.vy = -1150; truck.spinning = false; }
  else if (k === 'water') mudLevel = 0;
  speak(`${pup.name}! ${pup.ab.name}!`);
}
function showBanner(p) {
  const b = $('banner');
  $('bannerImg').src = pupThumbs[p.id] || '';
  $('bannerName').textContent = p.name.toUpperCase();
  $('bannerMove').textContent = `${p.ab.icon} ${p.ab.name}!`;
  b.style.setProperty('--pc', p.color);
  b.classList.remove('go'); void b.offsetWidth; b.classList.add('go');
}
function swapPup() {
  if (state !== 'play' || mode !== 'campaign' || swapCool > 0 || ended || loopRide) return;
  active = 1 - active; pup = team[active];
  abilityT = 0; abilityKey = null; slamming = false; dashT = 0;
  truck.jumps = Math.min(truck.jumps, maxJumps());
  if (truck.onGround) truck.jumps = maxJumps();
  swapCool = 2;
  sfx.swap();
  burst(truckWX(), truck.y - 80, 26, ['#ffffff', pup.color, '#ffd23f'], 320, 200, 9);
  popup('PUP TAG!', truckWX(), truck.y - 240, '#4cc9f0', 46);
  speak(`${pup.name}, you're up!`);
  useTruckModels();
  updatePadBtn();
}
function trickPress() {
  if (state !== 'play' || mode !== 'freestyle' || loopRide || crashT > 0) return;
  if (truck.onGround) { if (donutT <= 0) { donutT = 1; sfx.trick(); } }
  else { trick.target += Math.PI * 2; sfx.trick(); }
}
function hurt(label) {
  if (invuln > 0 || invincible() || ended) return false;
  hearts--; invuln = 1.6; hurtSlow = 0.6; shake = 0.4;
  sfx.bonk();
  popup(label || 'OUCH!', truckWX(), truck.y - 220, '#ff3b5c', 44);
  if (hearts <= 0) endLevel(false, 'hearts');
  return true;
}
function launch(e, power = 1) {
  e.fly = { dx: 0, dy: 0, vx: (550 + Math.random() * 450) * power, vy: -(550 + Math.random() * 400) * power, vr: (Math.random() - 0.5) * 14, rot: 0, t: 0 };
}
function smash(e, label, fling) {
  e.broken = true;
  if (e.t === 'fire') { e.steam = 1; sfx.hiss(); specialHits++; }
  else if (fling || abilityT > 0 || dashT > 0) { launch(e); specialHits++; charge[active] = Math.min(1, charge[active] + 0.02); }
  sfx.stomp();
  const cols = e.t === 'tires' ? ['#1b1b1b', '#333', '#ffcc00'] : e.t === 'snowman' ? ['#ffffff', '#dfe9f7', '#ff8c1a'] : ['#6f7b88', '#8d99a6', '#5c6773', '#b0aa9b'];
  burst(e.x + e.w / 2, GROUND - e.h / 2, e.t === 'wall' ? 30 : 16, cols, 420, 1100, 9);
  popup(label, e.x + e.w / 2, GROUND - Math.min(e.h, 160) - 90, '#ffcc00', 44);
  bones += 2; shake = Math.max(shake, 0.2);
}
function canBreak(e) {
  if (abilityT > 0 || dashT > 0) return true;
  const k = null;
  if (k === 'nitro' || k === 'dash') return true;
  if (e.t === 'fire') return false;
  if (pup.id === 'rubble' && e.t !== 'tires') return true;   // Rubble's blade is always on for stone
  if (k === 'blade' || k === 'plow') return true;
  return false;
}
function bridgeDown(e) { return ((time + e.phase) % 4.0) < 2.4; }
function bridgeAngle(e) {
  const p = ((time + e.phase) % 4.0);
  if (p < 2.4) return 0;
  if (p < 2.7) return (p - 2.4) / 0.3 * 1.3;
  if (p < 3.7) return 1.3;
  return 1.3 * (1 - (p - 3.7) / 0.3);
}

// ======================================================================
// Update
// ======================================================================
function update(dt) {
  time += dt;
  if (state !== 'play') {
    camX += 140 * dt; truck.spin += 140 * dt / 36;
    truck.y = GROUND; truck.angle = 0; truck.squash = 0;
    updateFx(dt); return;
  }
  flashT -= dt;
  if (cineT > 0) { cineT -= dt; dt *= 0.2; }        // slow-motion moment when a special starts
  mudSlow -= dt; hurtSlow -= dt; invuln -= dt; iceT -= dt; swapCool -= dt; crashT -= dt; dashT -= dt; floatT -= dt;
  shake = Math.max(0, shake - dt);
  if (abilityT > 0) {
    abilityT -= dt;
    if (abilityT <= 0) {
      if (abilityKey === 'glide' || abilityKey === 'hover') { floatT = 1.2; truck.vy = 0; }
      abilityKey = null; invuln = Math.max(invuln, 0.8);
      if (specialHits > 0) { popup(`SUPER x${specialHits}!`, truckWX() + 40, truck.y - 260, '#ffd000', 56); bones += specialHits; sfx.rescue(); }
    }
  }
  for (let i = 0; i < 2; i++) if (!(i === active && abilityT > 0)) charge[i] = Math.min(1, charge[i] + dt / 9);
  mudLevel = Math.max(0, mudLevel - dt * 0.15);
  const fx = fxState();

  if (mode === 'freestyle' && !ended) {
    fsTime -= dt;
    fsComboT -= dt; if (fsComboT <= 0) fsCombo = 1;
    if (fsTime <= 0) { fsTime = 0; endLevel(true); }
  }

  const v = ended ? curLevel.speed * 0.6 : speed();
  const prevWX = truckWX();

  if (loopRide) {
    const L = loopRide.e;
    loopRide.phi += (v * 1.7 / L.r) * dt;
    const phi = Math.min(loopRide.phi, Math.PI * 2);
    camX = L.x + L.r * Math.sin(phi) - truck.sx;
    truck.y = GROUND - L.r + L.r * Math.cos(phi);
    truck.angle = -phi;
    truck.spin += v * 1.7 * dt / 36;
    if (Math.random() < 0.5) puff(truckWX() - 60, truck.y - 20, '#ffd23f');
    if (loopRide.phi >= Math.PI * 2) {
      loopRide = null; truck.angle = 0; truck.y = GROUND; camX = L.x - truck.sx + 2;
      flips++; bones += 3;
      popup('LOOP!', truckWX(), GROUND - 260, '#ffd000', 52); sfx.rescue();
      fsAdd(800, 'LOOP');
    }
    updateFx(dt); updateHud(); return;
  }

  camX += v * dt;
  const wx = truckWX();

  while (nextX < camX + W + 900) spawnSegment();
  entities = entities.filter(e => e.x + (e.w || 60) > camX - 600 || e === finishEnt);

  if (rival) {
    rival.x += curLevel.speed * curLevel.rival * dt; rival.spin += curLevel.speed * curLevel.rival * dt / 36;
    if (!ended && rival.x >= finishX + 100) endLevel(false, 'race');
  }
  if (finishEnt && !ended && wx >= finishX + 100) {
    if (finishEnt.who) { finishEnt.saved = true; flyers.push({ kind: finishEnt.who, fx: finishX + 150, fy: GROUND - 20, t: 0 }); sfx.rescue(); popup('RESCUED!', finishX + 100, GROUND - 200, '#2fae4a', 50); }
    endLevel(true);
  }

  let rampY = null, rampAngle = 0, overPit = null;
  for (const e of entities) {
    if (e.t === 'ramp') {
      if (wx >= e.x && wx <= e.x + e.w) { rampY = GROUND - e.h * (wx - e.x) / e.w; rampAngle = -Math.atan2(e.h, e.w); }
      if (truck.onGround && prevWX <= e.x + e.w && wx > e.x + e.w) {
        truck.onGround = false; truck.vy = -e.launch; truck.jumps = maxJumps() - 1;
        truck.spinning = true; truck.spinRate = -Math.PI * 2 / (2 * e.launch / GRAV * 0.92);
        sfx.flip();
      }
    } else if (e.t === 'pit' && wx > e.x + 22 && wx < e.x + e.w - 22) overPit = e;
    else if (e.t === 'bridge' && wx > e.x - 80 && wx < e.x + e.w) {
      const p = (time + e.phase) % 4.0;   // the bridge waits while you cross
      if (truck.onGround && p > 2.1 && p < 2.4) e.phase -= p - 2.1;
      if (wx > e.x + 18 && wx < e.x + e.w - 18 && bridgeAngle(e) > 0.35) overPit = e;
    }
    else if (e.t === 'loop' && !e.done && truck.onGround && prevWX < e.x && wx >= e.x) {
      e.done = true; loopRide = { e, phi: 0 }; camX = e.x - truck.sx; sfx.flip(); return;
    }
  }
  if (overPit && !truck.falling && (fx.hover || fx.nitro)) overPit = null;   // hover & nitro skim over water

  truck.prevY = truck.y;
  const flying = fx.glide || fx.hover;
  if (flying) {
    // Skye flies high above everything; Zuma hovers above low obstacles and water
    const target = GROUND - (fx.glide ? 345 : 150) + Math.sin(time * 4) * 8;
    truck.onGround = false; truck.falling = false; truck.spinning = false; slamming = false;
    truck.vy = (target - truck.y) * 5;
    truck.y += truck.vy * dt;
    truck.angle += ((fx.glide ? -0.08 : 0) + Math.sin(time * 3) * 0.04 - truck.angle) * Math.min(1, dt * 6);
    truck.jumps = maxJumps();
    if (Math.random() < 0.7) puff(wx - 40 + Math.random() * 80, truck.y + 10, fx.glide ? '#ffffff' : '#bfe9ff', -120, 120, 8, 0.4, 0);
  }
  if (!flying && truck.onGround) {
    if (overPit) { truck.onGround = false; truck.vy = 50; truck.falling = true; truck.jumps = 0; sfx.fall(); }
    else {
      truck.y = rampY !== null ? rampY : GROUND;
      let target = rampY !== null ? rampAngle : 0;
      if (mode === 'freestyle' && wheelieHeld && rampY === null) target = -0.5;
      truck.angle += (target - truck.angle) * Math.min(1, dt * 12);
    }
  }
  if (!flying && !truck.onGround) {
    let g = GRAV * (pup.id === 'skye' ? 0.85 : 1);
    if (floatT > 0 && truck.vy > 160) truck.vy = 160;   // gentle landing after flying
    if (slamming && truck.vy > -200) { truck.vy = Math.max(truck.vy, 1500); g = 0; }
    truck.vy += g * dt;
    truck.y += truck.vy * dt;
    if (truck.spinning) truck.angle += truck.spinRate * dt;
    else truck.angle += (Math.max(-0.35, Math.min(0.3, truck.vy * 0.0004)) - truck.angle) * Math.min(1, dt * 6);
    if (trick.done < trick.target) trick.done = Math.min(trick.target, trick.done + Math.PI * 2 / 0.5 * dt);
    if (overPit && truck.y > GROUND + 4) truck.falling = true;
    if (truck.falling) {
      if (truck.y > GROUND + 160) {
        const pit = entities.find(e => (e.t === 'pit' || e.t === 'bridge') && wx > e.x - 40 && wx < e.x + e.w + 60);
        burst(wx, GROUND - 10, 18, ['#4a90e2', '#ffffff', '#9fd0ff'], 300, 800, 7);
        sfx.splash();
        hurt('SPLASH!');
        if (pit) camX = pit.x + pit.w + 30 - truck.sx;
        Object.assign(truck, { y: GROUND - 220, vy: -300, falling: false, spinning: false, angle: 0, jumps: 1 });
        trick = { target: 0, done: 0 }; slamming = false;
      }
    } else {
      const floor = rampY !== null ? rampY : GROUND;
      if (truck.y >= floor && truck.vy > 0 && !overPit) {
        const hard = truck.vy;
        if (truck.spinning) {
          flips++; bones += 3;
          popup('BACKFLIP!', wx, truck.y - 220, '#ffcc00', 48);
          if (curLevel.goal.type === 'flips') sfx.rescue();
          fsAdd(500, 'BACKFLIP');
        }
        if (mode === 'freestyle' && trick.target > 0) {
          if (trick.target - trick.done > 0.6) crash();
          else { const n = Math.round(trick.target / (Math.PI * 2)); fsAdd(350 * n * (n > 1 ? 1.5 : 1), n > 1 ? `${n}x FLIP` : 'FLIP'); }
        }
        trick = { target: 0, done: 0 };
        if (slamming) { slamming = false; dinoQuake(wx); }
        truck.y = floor; truck.onGround = true; truck.jumps = maxJumps();
        truck.spinning = false; truck.angle = 0; truck.vy = 0;
        if (hard > 500) {
          truck.squash = 1; sfx.land();
          burst(wx - 50, GROUND - 4, 10, ['#c99a6a', '#a8743f', '#8a5a2b'], 220, 700, 8);
          burst(wx + 50, GROUND - 4, 10, ['#c99a6a', '#a8743f', '#8a5a2b'], 220, 700, 8);
          if (mode === 'freestyle' && hard > 1300) fsAdd(300, 'BIG AIR', '#4cc9f0');
        }
      }
    }
  }
  truck.squash = Math.max(0, truck.squash - dt * 4);
  truck.spin += v * dt / 36;

  if (mode === 'freestyle') {
    if (donutT > 0) {
      donutT -= dt;
      if (Math.random() < 0.8) burst(wx + (Math.random() - 0.5) * 120, GROUND - 4, 1, ['#c99a6a', '#a8743f'], 260, 700, 8);
      if (donutT <= 0) fsAdd(400, 'DONUT', '#ff8c42');
    }
    if (wheelieHeld && truck.onGround && donutT <= 0) {
      wheelieAcc += dt;
      if (wheelieAcc >= 1) { wheelieAcc = 0; fsAdd(100, 'WHEELIE', '#5fe07a'); }
    } else wheelieAcc = 0;
  }

  runSpecial(dt, wx, fx);
  for (const e of entities) if (e.fly) { const f = e.fly; f.t += dt; f.vy += 1500 * dt; f.dx += f.vx * dt; f.dy += f.vy * dt; f.rot += f.vr * dt; }

  // collisions (truck box: wx±75, truck.y-150..truck.y)
  const top = truck.y - 150, L = wx - 75, Rt = wx + 75;
  const pull = fx.magnet || fx.nitro ? (abilityKey === 'nitro' ? 260 : W) : 0;
  for (const e of entities) {
    if (pull && (e.t === 'bone' || e.t === 'scrap' || e.t === 'goodie') && !e.got && e.x > wx - 100 && e.x < wx + pull + 200) {
      e.x += (wx - e.x) * Math.min(1, dt * 5); e.y += (truck.y - 80 - e.y) * Math.min(1, dt * 5);
    }
    if (e.t === 'car') {
      if (e.crushed) { e.crushT += dt; continue; }
      if (Rt > e.x && L < e.x + e.w && truck.y > GROUND - e.h && !truck.falling) {
        e.crushed = true; crushed++; bones += 1; charge[active] = Math.min(1, charge[active] + 0.04);
        if (invincible()) { launch(e, 0.8); specialHits++; }
        sfx.crunch();
        burst(e.x + e.w / 2, GROUND - 30, 14, [e.color, '#cdeeff', '#ffffff', '#ffcc00'], 380, 1000, 7);
        popup(['CRUSH!', 'SMASH!', 'CRUNCH!', 'WOW!'][Math.floor(Math.random() * 4)], e.x + e.w / 2, GROUND - 150, '#ff4d6d', 42);
        fsAdd(100, 'CRUSH', '#ff4d6d');
        if (truck.onGround) { truck.onGround = false; truck.vy = -420; truck.jumps = maxJumps() - 1; }
        else if (truck.vy > 0) truck.vy = -420;
      }
    } else if (['boulder', 'tires', 'snowman', 'wall', 'fire'].includes(e.t) && !e.broken) {
      const inset = e.t === 'fire' ? 42 : 16;   // forgiving hitboxes
      if (Rt - inset > e.x && L + inset < e.x + e.w) {
        const objTop = GROUND - e.h + (e.t === 'fire' ? 30 : 0);
        if (e.t !== 'fire' && e.t !== 'wall' && truck.vy > 0 && truck.prevY <= objTop + 10 && truck.y >= objTop) {
          smash(e, 'STOMP!');
          truck.y = objTop; truck.vy = -650; truck.jumps = maxJumps() - 1; truck.spinning = false; truck.angle = 0;
          if (slamming) { slamming = false; dinoQuake(wx); }
        } else if (truck.y > objTop + 14) {
          if (canBreak(e)) smash(e, e.t === 'wall' ? 'CRASH THROUGH!' : 'POW!');
          else {
            e.broken = true;
            if (e.t === 'fire') { e.steam = 0; burst(e.x + e.w / 2, GROUND - 40, 12, ['#ff6a00', '#ffe066'], 300, 400, 7); }
            else burst(e.x + e.w / 2, GROUND - e.h / 2, 10, ['#6f7b88', '#8d99a6', '#1b1b1b'], 300, 1000, 8);
            hurt(e.t === 'fire' ? 'HOT HOT!' : e.t === 'wall' ? 'BONK!' : 'OUCH!');
          }
        }
      }
    } else if (e.t === 'fire' && e.broken && e.steam > 0) {
      e.steam -= dt * 0.8;
      if (Math.random() < 0.4) puff(e.x + 36 + (Math.random() - 0.5) * 50, GROUND - 30, '#e6ecf2', 0, -120, 12, 0.8);
    } else if (e.t === 'bone' && !e.got) {
      if (e.x > L - 15 && e.x < Rt + 15 && e.y > top - 20 && e.y < truck.y) {
        e.got = true; bones++; sfx.bone();
        charge[active] = Math.min(1, charge[active] + 0.05);
        burst(e.x, e.y, 6, ['#fff36b', '#ffffff'], 200, 300, 5);
        if (mode === 'freestyle') fsScore += 10;
      }
    } else if (e.t === 'scrap' && !e.got) {
      if (e.x > L - 15 && e.x < Rt + 15 && e.y > top - 20 && e.y < truck.y) {
        e.got = true; sfx.scrap(); bones += 1;
        burst(e.x, e.y, 6, ['#9aa5b5', '#ffffff'], 200, 300, 5);
        if (pup.id === 'rocky') {
          scrapCount++;
          if (scrapCount >= 3) {
            scrapCount = 0;
            if (hearts < MAX_HEARTS) { hearts++; sfx.heart(); popup('TRUCK FIXED! +1 ❤', wx, truck.y - 230, '#2fae4a', 36); }
            else popup('RECYCLED!', wx, truck.y - 230, '#2fae4a', 36);
          }
        }
      }
    } else if (e.t === 'goodie' && !e.got) {
      if (e.x > L - 20 && e.x < Rt + 20 && e.y > top - 30 && e.y < truck.y) {
        e.got = true;
        if (e.kind === 'heart') { hearts = Math.min(MAX_HEARTS, hearts + 1); sfx.heart(); popup('+1 HEART!', e.x, e.y - 60, '#ff3b5c', 40); }
        else { charge = [1, 1]; sfx.power(); popup('SPECIAL READY!', e.x, e.y - 60, '#ffd000', 40); }
        burst(e.x, e.y, 14, ['#ffd000', '#ff3b5c', '#ffffff'], 260, 300, 6);
      }
    } else if (e.t === 'mud') {
      if (truck.onGround && wx > e.x && wx < e.x + e.w && !e.dried) {
        mudSlow = 0.25;
        if (pup.id !== 'zuma') mudLevel = 1;
        if (Math.random() < 0.6) burst(wx + (Math.random() - 0.5) * 100, GROUND - 4, 2, ['#5a3a1c', '#7a4f28'], 260, 900, 8);
        if (!e.splashed) { e.splashed = true; sfx.splash(); popup(pup.id === 'zuma' ? 'ZOOM!' : 'SPLASH!', wx, GROUND - 200, '#7a4f28', 44); }
      }
    } else if (e.t === 'ice') {
      if (truck.onGround && wx > e.x && wx < e.x + e.w) {
        iceT = 0.2;
        if (pup.id !== 'everest' && Math.random() < 0.4) puff(wx - 50, GROUND - 6, '#e6f6ff', -100, -40, 6, 0.4, 200);
        if (!e.slid) { e.slid = true; popup(pup.id === 'everest' ? 'GRIP!' : 'WHEEE!', wx, GROUND - 200, '#4cc9f0', 40); }
      }
    } else if (e.t === 'friend' && !e.done) {
      const fy = e.balloon ? e.y - 20 : GROUND - 30;
      const near = fx.magnet && abilityKey === 'ears' && e.x > wx && e.x < wx + 450;
      if (near || e.x > L - 20 && e.x < Rt + 20 && fy > top - 40 && fy < truck.y + 10) {
        e.done = true;
        flyers.push({ kind: e.kind, fx: e.x, fy, t: 0 });
        sfx.rescue();
        popup('RESCUED!', e.x, fy - 150, '#2fae4a', 46);
        if (e.balloon) burst(e.x, e.y - 70, 10, [e.color, '#fff'], 250, 400, 6);
      }
    }
  }

  if ((fx.plow || fx.blade) && truck.onGround && Math.random() < 0.6) burst(wx + 90, GROUND - 10, 1, curLevel.theme === 'snow' ? ['#fff'] : ['#c99a6a'], 200, 600, 6);
  if (pup.design === 'dozer' && truckType.id === 'pup' && Math.random() < 0.15) puff(wx + 7, truck.y - 165, 'rgba(120,120,120,.6)', -40, -60, 9, 0.8);

  for (const f of flyers) {
    f.t += dt * 1.6;
    if (f.t >= 1 && !f.arrived) {
      f.arrived = true; bed.push(f.kind); if (FRIENDS.includes(f.kind)) rescued++;
      burst(truckWX() - 50, truck.y - 110, 16, ['#ffcc00', '#ff6fae', '#5ec8ff', '#2fae4a'], 260, 500, 6);
      if (FRIENDS.includes(f.kind) && rescued < curLevel.goal.n) speak(['Great job!', 'You saved the ' + FRIEND_NAMES[f.kind] + '!', 'PawJam to the rescue!'][Math.floor(Math.random() * 3)]);
    }
  }
  flyers = flyers.filter(f => !f.arrived);

  const g = curLevel.goal;
  if (!ended && !['race', 'reach', 'freestyle'].includes(g.type) && progress() >= g.n) endLevel(true);

  if (boostHeld && Math.random() < 0.5) puff(wx - 85, truck.y - 70, '#ff9a3c', -200, -40, 8, 0.3, -100);

  if (engineGain && actx) {
    engineGain.gain.setTargetAtTime(muted ? 0 : 0.035, actx.currentTime, 0.1);
    engineOsc.frequency.setTargetAtTime(45 + v * 0.12 + (truck.onGround ? 0 : 25), actx.currentTime, 0.1);
  }
  updateFx(dt);
  updateHud();
}

function crash() {
  crashT = 0.8; fsCombo = 1; shake = 0.4; sfx.crash();
  popup('CRASH!', truckWX(), truck.y - 220, '#ff3b5c', 46);
  burst(truckWX(), GROUND - 40, 20, ['#c99a6a', '#555', '#ffcc00'], 360, 900, 8);
}
function dinoQuake(wx) {
  sfx.quake(); shake = 0.9; flashT = 0.3; flashColor = '#8bc34a';
  waves.push({ x: wx, r: 0, life: 0.8 }, { x: wx, r: -250, life: 1.0 });
  popup('DINO STOMP!', wx, GROUND - 270, '#8bc34a', 56);
  let n = 0;
  for (const e of entities) {
    if (e.x < wx - 200 || e.x > wx + W) continue;
    if (['boulder', 'tires', 'snowman', 'wall', 'fire'].includes(e.t) && !e.broken) { e.broken = true; launch(e, 1.2); n++; burst(e.x + e.w / 2, GROUND - 30, 10, ['#8d99a6', '#c99a6a'], 380, 1000, 8); }
    if (e.t === 'car' && !e.crushed) { e.crushed = true; crushed++; launch(e, 1.1); n++; }
  }
  specialHits += n;
  if (n) sfx.crunch();
}
const OBSTACLES = ['boulder', 'tires', 'snowman', 'wall', 'fire'];
function runSpecial(dt, wx, fx) {
  const k = abilityT > 0 ? abilityKey : null;
  if (dashT > 0) { for (let i = 0; i < 4; i++) puff(wx - 60 - Math.random() * 200, truck.y - 30 - Math.random() * 110, i % 2 ? '#ffd23f' : pup.color, -300, 0, 9, 0.35); }
  if (!k) return;
  if (k === 'water') {
    // a big jet that blasts everything ahead off the track
    const reach = wx + 950;
    for (let i = 0; i < 6; i++) particles.push({ x: wx + 70, y: truck.y - 120, z: 0.25 + (Math.random() - 0.5) * 0.3, vx: 900 + Math.random() * 300, vy: -260 + Math.random() * 160, vz: (Math.random() - 0.5) * 0.6, life: 0.75, max: 0.75, color: i % 2 ? '#4cc9f0' : '#e6f7ff', size: 7 + Math.random() * 5, grav: 700 });
    for (const e of entities) {
      if (e.x < wx + 60 || e.x > reach) continue;
      if (e.t === 'fire' && !e.broken) { e.broken = true; e.steam = 1; specialHits++; sfx.hiss(); popup('FIRE OUT!', e.x + 36, GROUND - 170, '#4cc9f0', 40); }
      else if (OBSTACLES.includes(e.t) && !e.broken) { e.broken = true; launch(e, 1.1); specialHits++; burst(e.x + e.w / 2, GROUND - 40, 14, ['#4cc9f0', '#ffffff'], 360, 700, 8); popup('WASHED AWAY!', e.x + e.w / 2, GROUND - 190, '#4cc9f0', 34); }
      else if (e.t === 'car' && !e.crushed) { e.crushed = true; crushed++; launch(e, 0.9); specialHits++; burst(e.x + 48, GROUND - 30, 10, ['#4cc9f0', '#ffffff', e.color], 360, 800, 7); }
      else if (e.t === 'mud' && !e.dried) { e.dried = true; specialHits++; popup('CLEAN!', e.x + e.w / 2, GROUND - 160, '#4cc9f0', 34); }
      else if ((e.t === 'bone' || e.t === 'scrap' || e.t === 'goodie') && !e.got) { e.x += (wx - e.x) * Math.min(1, dt * 4); e.y += (truck.y - 80 - e.y) * Math.min(1, dt * 4); }
    }
  } else if (k === 'magnet') {
    // Rocky recycles junk ahead into gears that fly to the truck
    for (const e of entities) {
      if (e.x < wx + 80 || e.x > wx + 900) continue;
      if ((OBSTACLES.includes(e.t) && !e.broken) || (e.t === 'car' && !e.crushed)) {
        if (e.t === 'car') { e.crushed = true; crushed++; } else e.broken = true;
        e.recycled = true; specialHits++;
        burst(e.x + (e.w || 60) / 2, GROUND - 40, 14, ['#2fae4a', '#9aa5b5', '#ffffff'], 300, 500, 8);
        for (let i = 0; i < 2; i++) entities.push({ t: 'scrap', x: e.x + 20 + i * 40, y: GROUND - 80 - i * 40, got: false });
        popup('RECYCLED!', e.x + 40, GROUND - 180, '#2fae4a', 36);
      }
    }
    if (Math.random() < 0.5) puff(wx + (Math.random() - 0.3) * 600, truck.y - Math.random() * 300, '#4cc9f0', 0, 0, 5, 0.3);
  } else if (k === 'ears') {
    // Tracker hears danger and jumps for you
    const kk = speed() / 330;
    for (const e of entities) {
      const d = e.x - wx;
      if (['boulder', 'tires', 'snowman', 'fire', 'wall'].includes(e.t) && !e.broken && d > 60 * kk && d < 140 * kk && truck.onGround) jump();
      if (((e.t === 'pit' && !e.canyon) || (e.t === 'bridge' && !bridgeDown(e))) && d > 20 * kk && d < 90 * kk && truck.onGround) jump();
      if ((e.t === 'tires' && !e.broken || e.t === 'pit' && e.canyon) && d < 90 && d > -e.w && !truck.onGround && truck.vy > -150 && truck.jumps > 0) jump();
      if (e.t === 'friend' && !e.done && e.x > wx && e.x < wx + W) { e.done = true; flyers.push({ kind: e.kind, fx: e.x, fy: e.balloon ? e.y - 20 : GROUND - 30, t: 0 }); sfx.rescue(); popup('I HEAR YOU!', e.x, GROUND - 220, '#7fa23a', 36); specialHits++; }
    }
  } else if (k === 'blade' || k === 'plow') {
    for (const e of entities) if (OBSTACLES.includes(e.t) && !e.broken && e.x > wx && e.x < wx + 170) smash(e, k === 'plow' ? 'PLOWED!' : 'BULLDOZED!', true);
    if (Math.random() < 0.8) burst(wx + 110, GROUND - 10, 2, k === 'plow' ? ['#ffffff', '#dfe9f7'] : ['#c99a6a', '#a8743f'], 300, 700, 8);
  } else if (k === 'nitro') {
    for (let i = 0; i < 2; i++) puff(wx - 90, truck.y - 70 + (Math.random() - 0.5) * 30, i ? '#4cc9f0' : '#ffffff', -500, 0, 10, 0.3);
  }
}
function updateFx(dt) {
  for (const p of particles) { p.x += p.vx * dt; p.y += p.vy * dt; p.z += (p.vz || 0) * dt; p.vy += p.grav * dt; p.life -= dt; }
  particles = particles.filter(p => p.life > 0);
  if (particles.length > 900) particles.splice(0, particles.length - 900);
  for (const p of popups) { p.y -= 60 * dt; p.life -= dt; }
  popups = popups.filter(p => p.life > 0);
  for (const w of waves) { w.r += 900 * dt; w.life -= dt; }
  waves = waves.filter(w => w.life > 0);
  for (const p of confetti) { p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 300 * dt; p.r += p.vr * dt; }
  confetti = confetti.filter(p => p.y < hudH + 40);
  if (state !== 'play' && engineGain && actx) engineGain.gain.setTargetAtTime(0, actx.currentTime, 0.1);
}

// ======================================================================
// 3D sync & render
// ======================================================================
const truckModels = new Map();
let playerModel = null, rivalModel = null;
function getTruckModel(p, tk) {
  const key = p.id + '|' + tk.id;
  if (!truckModels.has(key)) { const m = buildTruck(p, tk); truckModels.set(key, m); }
  return truckModels.get(key);
}
function useTruckModels() {
  if (playerModel) scene.remove(playerModel);
  playerModel = getTruckModel(pup, truckType); scene.add(playerModel);
  if (rivalModel) { scene.remove(rivalModel); rivalModel = null; }
  if (rival) { rivalModel = buildTruck(rival.pup, rival.truck); rivalModel.scale.setScalar(0.92); scene.add(rivalModel); }
}
function clearWorld() { for (const e of entities) if (e.mesh) world.remove(e.mesh); }
function makeEntityMesh(e) {
  let g;
  switch (e.t) {
    case 'car': g = buildCar(e.color); g.position.set((e.x + e.w / 2) * S, 0, 0.1); break;
    case 'boulder': g = buildBoulder(); g.position.set((e.x + e.w / 2) * S, 0, 0); break;
    case 'snowman': g = buildSnowman(); g.position.set((e.x + e.w / 2) * S, 0, 0); break;
    case 'tires': g = buildTires(); g.position.set((e.x + e.w / 2) * S, 0, 0); break;
    case 'fire': g = buildFire(); g.position.set((e.x + e.w / 2) * S, 0, 0); break;
    case 'wall': g = buildWall(e.h * S); g.position.set((e.x + e.w / 2) * S, 0, 0); break;
    case 'ramp': g = buildRamp(e); g.position.set(e.x * S, 0, 0); break;
    case 'loop': g = buildLoop(e); g.position.set(e.x * S, 0, 0); break;
    case 'pit': g = buildPit(e); g.position.set(e.x * S, 0, 0); break;
    case 'bridge': g = buildBridge(e); g.position.set(e.x * S, 0, 0); break;
    case 'finish': g = buildFinish(e); g.position.set(e.x * S, 0, 0); break;
    case 'mud': {
      g = new THREE.Group(); g.position.set((e.x + e.w / 2) * S, 0, 0);
      const d = mesh(cylG(28), mat('#5a3a1c'), 0, 0.008, 0, e.w * S / 2, 0.02, 1.2, false); d.receiveShadow = true; g.add(d);
      g.add(mesh(cylG(28), mat('#7a4f28', { shiny: true, metal: 0.05, rough: 0.3 }), 0, 0.02, 0, e.w * S / 2 - 0.15, 0.02, 1.0, false));
      for (let i = 0; i < 4; i++) g.add(ball('#9a6a3a', (i - 1.5) * 0.4, 0.04, ((i * 37) % 5 - 2) * 0.2, 0.06, 0.03, 0.06));
      g.userData.water = mesh(cylG(28), mat('#4cc9f0', { opacity: 0.6, shiny: true, metal: 0.1 }), 0, 0.03, 0, e.w * S / 2, 0.02, 1.1, false); g.userData.water.visible = false; g.add(g.userData.water);
      break;
    }
    case 'ice': {
      g = new THREE.Group(); g.position.set((e.x + e.w / 2) * S, 0, 0);
      g.add(mesh(cylG(28), mat('#bfe9ff', { shiny: true, metal: 0.2, rough: 0.05 }), 0, 0.01, 0, e.w * S / 2, 0.02, 1.3, false));
      g.add(block('#ffffff', -0.3, 0.025, 0.2, 0.5, 0.005, 0.04, { basic: true })); g.add(block('#ffffff', 0.4, 0.025, -0.3, 0.35, 0.005, 0.04, { basic: true }));
      break;
    }
    case 'bone': g = buildBone(); g.position.set(e.x * S, (GROUND - e.y) * S, 0); break;
    case 'scrap': g = buildGear(); g.position.set(e.x * S, (GROUND - e.y) * S, 0); break;
    case 'goodie': {
      g = new THREE.Group(); g.position.set(e.x * S, (GROUND - e.y) * S, 0);
      g.add(e.kind === 'star' ? mesh(starGeo(0.24, 0.08), mat('#ffd000', { emissive: '#7a5a00' })) : mesh(heartGeo(0.2, 0.1), mat('#ff3b5c', { emissive: '#5a0010' })));
      g.add(mesh(sphereG(), mat('#ffffff', { basic: true, opacity: 0.18 }), 0, 0, 0, 0.36, 0.36, 0.36, false));
      break;
    }
    case 'friend': {
      g = new THREE.Group(); g.position.set(e.x * S, 0, 0.2);
      const f = buildFriend(e.kind, 1.5); g.add(f); g.userData.f = f; f.rotation.y = 0.8;
      if (e.balloon) {
        f.position.y = (GROUND - e.y) * S;
        const b = ball(e.color, 0, f.position.y + 0.95, 0, 0.26, 0.32, 0.26, { shiny: true, metal: 0.05, rough: 0.3 }); g.add(b); g.userData.balloon = b;
        const str = rod('#555', 0, f.position.y + 0.5, 0, 0.006, 0.5); g.add(str);
      } else g.add(ball('#8d99a6', 0, 0.04, 0, 0.36, 0.1, 0.3));
      const h = helpSprite(); h.position.set(0, (e.balloon ? (GROUND - e.y) * S + 1.6 : 1.2), 0); g.add(h); g.userData.help = h;
      break;
    }
    default: return null;
  }
  world.add(g);
  return g;
}
function syncEntities() {
  const live = new Set();
  for (const e of entities) {
    if (!e.mesh) { e.mesh = makeEntityMesh(e); if (e.mesh) e.mesh.userData.bx = e.mesh.position.x; }
    if (!e.mesh) continue;
    live.add(e.mesh);
    const m = e.mesh, ud = m.userData;
    if (e.fly) { m.position.x = ud.bx + e.fly.dx * S; m.position.y = -e.fly.dy * S; m.rotation.z = -e.fly.rot; m.rotation.x = e.fly.rot * 0.4; }
    switch (e.t) {
      case 'car':
        if (e.recycled) m.visible = false;
        else if (e.crushed && !e.fly) { const k = Math.max(0.32, 1 - e.crushT * 6); ud.inner.scale.set(1 + (1 - k) * 0.2, k, 1 + (1 - k) * 0.1); ud.inner.rotation.z = (1 - k) * 0.1; }
        break;
      case 'boulder': case 'snowman': case 'tires': case 'wall': m.visible = !e.recycled && (!e.broken || (e.fly && e.fly.t < 2.5)); break;
      case 'fire':
        if (e.recycled) m.visible = false;
        ud.flames.forEach((f, i) => { f.visible = !e.broken; f.scale.y = 0.6 + Math.sin(time * 14 + i * 2) * 0.12; f.position.y = f.scale.y / 2 + 0.05; });
        break;
      case 'bone': m.position.set(e.x * S, (GROUND - e.y) * S, 0); m.rotation.y = time * 3 + e.x; m.visible = !e.got; break;
      case 'scrap': m.position.set(e.x * S, (GROUND - e.y) * S + Math.sin(time * 4 + e.x) * 0.05, 0); m.rotation.y = time * 2; m.rotation.z = time * 2; m.visible = !e.got; break;
      case 'goodie': m.position.set(e.x * S, (GROUND - e.y) * S + Math.sin(time * 4 + e.x) * 0.06, 0); m.rotation.y = time * 2.5; m.visible = !e.got; break;
      case 'friend': {
        m.visible = !e.done;
        const bob = Math.sin(time * (e.balloon ? 2 : 6) + e.x) * (e.balloon ? 0.06 : 0.02);
        ud.f.position.y = (e.balloon ? (GROUND - e.y) * S : 0.1) + bob;
        if (ud.balloon) ud.balloon.position.y = ud.f.position.y + 0.95;
        ud.help.position.y = (e.balloon ? (GROUND - e.y) * S + 1.6 : 1.2) + Math.sin(time * 4) * 0.04;
        break;
      }
      case 'bridge': {
        const a = bridgeAngle(e);
        ud.plank.rotation.z = a;
        const w = e.w * S, ex = Math.cos(a) * w, ey = Math.sin(a) * w;
        const top = new THREE.Vector3(-0.18, 1.5, -0.8), end = new THREE.Vector3(ex, ey, -0.8);
        ud.chain.position.copy(top).add(end).multiplyScalar(0.5);
        ud.chain.scale.set(0.02, top.distanceTo(end), 0.02);
        ud.chain.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), end.clone().sub(top).normalize());
        break;
      }
      case 'mud': if (e.dried) { ud.water.visible = true; } break;
      case 'finish': if (ud.citizen) { ud.citizen.visible = !e.saved; ud.help.visible = !e.saved; ud.citizen.position.y = 0.12 + Math.abs(Math.sin(time * 5)) * 0.06; } break;
    }
  }
  for (const c of [...world.children]) if (!live.has(c)) world.remove(c);
}

// particles as one instanced mesh
const PMAX = 900;
const pMesh = new THREE.InstancedMesh(geo('pSph', () => new THREE.IcosahedronGeometry(1, 1)), new THREE.MeshToonMaterial({ gradientMap: toonRamp }), PMAX);
pMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage); pMesh.frustumCulled = false; scene.add(pMesh);
const tmpM = new THREE.Matrix4(), tmpC = new THREE.Color(), tmpQ = new THREE.Quaternion(), tmpV = new THREE.Vector3(), tmpS = new THREE.Vector3();
function syncParticles() {
  let n = 0;
  for (const p of particles) {
    if (n >= PMAX) break;
    const k = Math.max(0.15, Math.min(1, p.life / p.max * 1.5));
    tmpV.set(p.x * S, (GROUND - p.y) * S, p.z || 0); const s = p.size * S * 0.9 * k; tmpS.set(s, s, s);
    tmpM.compose(tmpV, tmpQ, tmpS); pMesh.setMatrixAt(n, tmpM);
    tmpC.set(p.color.startsWith('rgba') ? '#9a9a9a' : p.color); pMesh.setColorAt(n, tmpC); n++;
  }
  pMesh.count = n; pMesh.instanceMatrix.needsUpdate = true; if (pMesh.instanceColor) pMesh.instanceColor.needsUpdate = true;
}
const jet = new THREE.Group(); scene.add(jet); jet.visible = false;
jet.add(mesh(cylG(12), mat('#4cc9f0', { basic: true, opacity: 0.55 }), 0, 0, 0, 0.13, 1, 0.13, false));
jet.add(mesh(cylG(12), mat('#ffffff', { basic: true, opacity: 0.7 }), 0, 0, 0, 0.06, 1, 0.06, false));
const upV = new THREE.Vector3(0, 1, 0);
function syncJet(fx, tx, ty) {
  jet.visible = !!fx.water;
  if (!fx.water) return;
  const a = new THREE.Vector3(tx + 0.75, ty + 1.2, 0.25), b = new THREE.Vector3(tx + 7.5, 0.4 + Math.sin(time * 30) * 0.08, 0.25);
  jet.position.copy(a).add(b).multiplyScalar(0.5);
  const len = a.distanceTo(b); jet.children.forEach((c, i) => { c.scale.y = len; const w = (i ? 0.06 : 0.14) * (1 + Math.sin(time * 40 + i) * 0.15); c.scale.x = c.scale.z = w; });
  jet.quaternion.setFromUnitVectors(upV, b.clone().sub(a).normalize());
}
const waveMeshes = [];
function syncWaves() {
  while (waveMeshes.length < waves.length) { const m = mesh(geo('wave', () => new THREE.TorusGeometry(1, 0.04, 6, 40)), mat('#8bc34a', { basic: true, opacity: 0.8 }), 0, 0.05, 0, 1, 1, 1, false); m.rotation.x = Math.PI / 2; scene.add(m); waveMeshes.push(m); }
  waveMeshes.forEach((m, i) => { const w = waves[i]; m.visible = !!w; if (w) { m.position.x = w.x * S; m.scale.set(Math.max(0.01, w.r * S), Math.max(0.01, w.r * S), 1); m.material.opacity = Math.min(1, w.life / 0.6); } });
}
const flyerMeshes = new Map();
function syncFlyers() {
  const live = new Set();
  for (const f of flyers) {
    if (!flyerMeshes.has(f)) { const m = buildFriend(f.kind, 1.3); scene.add(m); flyerMeshes.set(f, m); }
    const m = flyerMeshes.get(f); live.add(f);
    const tx = truckWX() - 50, ty = truck.y - 100, k = Math.min(1, f.t);
    m.position.set((f.fx + (tx - f.fx) * k) * S, (GROUND - (f.fy + (ty - f.fy) * k - Math.sin(k * Math.PI) * 160)) * S, 0);
    m.rotation.y = k * 6; m.scale.setScalar(1.3 - 0.6 * k);
  }
  for (const [f, m] of flyerMeshes) if (!live.has(f)) { scene.remove(m); flyerMeshes.delete(f); }
}
function syncBed(model) {
  const ud = model.userData;
  if (ud.bedKey === bed.join()) return;
  ud.bedKey = bed.join();
  ud.bed.clear();
  bed.slice(-4).forEach((k, i) => { const f = buildFriend(k, 0.75); f.position.set(-0.15 + (i % 2) * 0.22, 0, -0.2 + (i >> 1) * 0.3); f.rotation.y = 0.7; ud.bed.add(f); });
}

function poseTruck(model, x, y, angle, spin, squash, fx, extras = {}) {
  const ud = model.userData;
  model.position.set(x, y, extras.z || 0);
  model.rotation.set(0, extras.yaw || 0, -angle);
  model.scale.set(extras.scale || 1, (extras.scale || 1) * (1 - squash * 0.15), extras.scale || 1);
  for (const w of ud.wheels) w.rotation.z = -spin;
  ud.lift.position.y = fx.hover ? 0.12 + Math.sin(time * 10) * 0.02 : 0;
  ud.chassis.position.y = Math.sin(time * 18) * 0.008 + squash * -0.06;
  if (ud.rotor) ud.rotor.rotation.y = time * (fx.glide ? 40 : 14);
  if (ud.fanBlades) ud.fanBlades.rotation.x = time * (fx.hover ? 40 : 10);
  if (ud.wings.length) ud.wings.forEach((w, i) => { const s = fx.glide ? 1 : 0; w.scale.x = 0.42 + s * 0.5; w.position.z = (i ? 1 : -1) * (0.62 + s * 0.25); w.position.x = -0.45 - s * 0.05; });
  if (ud.tail) ud.tail.rotation.y = Math.sin(time * 6) * 0.3;
  const flash = Math.floor(time * (fx.nitro ? 14 : 6)) % 2;
  ud.blink.forEach((l, i) => { l.visible = (i % 2) === flash || ud.blink.length === 1; });
  if (ud.cannon) ud.cannon.rotation.z = fx.water ? 0.25 : 0;
  ud.magRing.visible = !!fx.magnet; if (fx.magnet) { ud.magRing.rotation.y = time * 2; ud.magRing.scale.setScalar(1 + Math.sin(time * 8) * 0.08); }
  ud.glow.visible = !!extras.glow; if (extras.glow) ud.glow.scale.set(1.25 + Math.sin(time * 16) * 0.06, 1.0 + Math.sin(time * 16) * 0.05, 0.9);
  if (ud.head) { ud.head.rotation.y = -0.75 + Math.sin(time * 1.3) * 0.15; ud.head.rotation.z = Math.sin(time * 2.1) * 0.06; }
}

// ---------- camera + per-frame render ----------
let hudScale = 1, hudW = 1000, hudH = 600, dpr = 1;
const hud = document.getElementById('hud'), hctx = hud.getContext('2d');
const FOV = 34;
let camLift = 0;
function resize() {
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  renderer.setPixelRatio(Math.min(dpr, 1.75)); renderer.setSize(innerWidth, innerHeight, false);
  camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix();
  hud.width = Math.round(innerWidth * dpr); hud.height = Math.round(innerHeight * dpr);
  hudScale = Math.min(innerHeight / H, innerWidth / 760);
  hudW = innerWidth / hudScale; hudH = innerHeight / hudScale;
  // world width visible at the track plane decides how far ahead to spawn
  const visH = 2 * camDist() * Math.tan(FOV * Math.PI / 360);
  W = visH * camera.aspect / S;
  truck.sx = Math.min(W * 0.3, 380);
  const small = innerHeight < 500 || innerWidth < 500;
  document.querySelectorAll('#controls .btn').forEach(b => b.style.zoom = small ? 0.68 : 1);
}
function camDist() { const a = innerWidth / innerHeight; return Math.max(9, 7.6 / (2 * Math.tan(FOV * Math.PI / 360) * a)); }
addEventListener('resize', resize);

const projV = new THREE.Vector3();
function toHud(xpx, ypx, z = 0) {
  projV.set(xpx * S, (GROUND - ypx) * S, z).project(camera);
  return { x: (projV.x + 1) / 2 * hudW, y: (1 - projV.y) / 2 * hudH };
}

function render3D() {
  const fx = state === 'play' ? fxState() : {};
  setTheme(state === 'play' || state === 'win' || state === 'fail' ? curLevel : (state === 'intro' ? curLevel : LEVELS[0]));
  const playing = state === 'play' || state === 'win' || state === 'fail';
  // camera follows the truck
  const cine = Math.max(0, Math.min(1, cineT / 0.55));
  const d = camDist() * (1 - 0.32 * cine);
  const cx = (camX + W / 2) * S * (1 - 0.55 * cine) + (truckWX() * S + 0.3) * 0.55 * cine;
  const ty = (GROUND - truck.y) * S;
  camLift += (Math.max(0, ty - 0.9) - camLift) * 0.08;
  const camY = 2.5 + camLift * 0.8;
  const shx = shake > 0 ? (Math.random() - 0.5) * 0.25 * shake / 0.4 : 0, shy = shake > 0 ? (Math.random() - 0.5) * 0.2 * shake / 0.4 : 0;
  camera.position.set(cx + 0.6 + shx, camY + shy, d);
  camera.lookAt(cx + 0.9, 1.15 + camLift * 0.75, 0);
  sun.position.set(cx - 4, 12, 8); sun.target.position.set(cx, 0, 0);
  const snap = Math.floor(cx / 4) * 4;
  if (trackPlane) { trackPlane.position.x = snap; outerPlane.position.x = snap; railMesh.position.x = snap; }
  if (sea) sea.position.x = snap;
  if (starPts) starPts.position.x = cx * 0.9;
  if (snowPts) {
    snowPts.position.x = cx; const p = snowPts.geometry.attributes.position;
    for (let i = 0; i < p.count; i++) { let y = p.getY(i) - 0.016 * (1 + (i % 3)); if (y < 0) y += 10; p.setY(i, y); }
    p.needsUpdate = true;
  }
  updateDecor((state === 'title' || state === 'garage' || state === 'levels') ? LEVELS[0].theme : curLevel.theme);

  if (playing) syncEntities(); else { for (const c of [...world.children]) world.remove(c); }
  // player truck
  if (!playerModel) useTruckModels();
  const flashOff = state === 'play' && invuln > 0 && Math.floor(time * 12) % 2 === 0;
  playerModel.visible = !flashOff;
  const wob = crashT > 0 ? Math.sin(time * 40) * 0.15 : 0;
  poseTruck(playerModel, truckWX() * S, ty, truck.angle + trick.done + wob, truck.spin, truck.squash, fx,
    { yaw: donutT > 0 ? (1 - donutT) * Math.PI * 4 : 0, glow: state === 'play' && invincible() });
  syncBed(playerModel);
  if (rivalModel && rival) { rivalModel.visible = playing; poseTruck(rivalModel, rival.x * S, 0, 0, rival.spin, 0, {}, { z: -1.25, scale: 0.92 }); }
  syncParticles(); syncWaves(); syncFlyers(); syncJet(fx, truckWX() * S, ty);
  renderer.render(scene, camera);
}

// ---------- 2D overlay: HUD, popups, hints ----------
function rrect(c, x, y, w, h, r) { c.beginPath(); c.roundRect(x, y, w, h, r); }
function circle(c, x, y, r, fill) { c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.fillStyle = fill; c.fill(); }
function poly(c, pts, fill) { c.beginPath(); c.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) c.lineTo(pts[i][0], pts[i][1]); c.closePath(); c.fillStyle = fill; c.fill(); }
function heart2d(c, x, y, s, fill) {
  c.beginPath(); c.moveTo(x, y + s * 0.35);
  c.bezierCurveTo(x - s * 1.1, y - s * 0.35, x - s * 0.45, y - s * 1.0, x, y - s * 0.45);
  c.bezierCurveTo(x + s * 0.45, y - s * 1.0, x + s * 1.1, y - s * 0.35, x, y + s * 0.35);
  c.fillStyle = fill; c.fill();
}
function gear2d(c, x, y, r, fill) {
  c.save(); c.translate(x, y); c.fillStyle = fill;
  for (let i = 0; i < 8; i++) { c.rotate(Math.PI / 4); c.fillRect(-r * 0.18, -r * 1.15, r * 0.36, r * 0.4); }
  circle(c, 0, 0, r * 0.85, fill); circle(c, 0, 0, r * 0.35, '#5a6470'); c.restore();
}
function label(c, txt, x, y, size, fill, stroke = '#1b1b3a') {
  c.textAlign = 'center'; c.textBaseline = 'middle'; c.font = `900 ${size}px Trebuchet MS, Arial`;
  c.lineWidth = Math.max(4, size / 5); c.strokeStyle = stroke; c.lineJoin = 'round'; c.strokeText(txt, x, y);
  c.fillStyle = fill; c.fillText(txt, x, y);
}
function emoji(c, e, x, y, size) { c.font = `${size}px sans-serif`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(e, x, y); }

function renderOverlay() {
  const c = hctx;
  c.setTransform(1, 0, 0, 1, 0, 0); c.clearRect(0, 0, hud.width, hud.height);
  c.setTransform(hudScale * dpr, 0, 0, hudScale * dpr, 0, 0);
  const playing = state === 'play' || state === 'win' || state === 'fail';
  if (state === 'play') {
    if (flashT > 0) { c.globalAlpha = Math.min(0.55, flashT / 0.45 * 0.55); c.fillStyle = flashColor; c.fillRect(0, 0, hudW, hudH); c.globalAlpha = 1; }
    if (abilityKey === 'nitro' && abilityT > 0 || dashT > 0) {
      c.strokeStyle = 'rgba(255,255,255,.75)'; c.lineCap = 'round';
      for (let i = 0; i < 14; i++) { const y = Math.random() * hudH * 0.8 + hudH * 0.05, x = Math.random() * hudW, l = 80 + Math.random() * 220; c.lineWidth = 2 + Math.random() * 4; c.beginPath(); c.moveTo(x, y); c.lineTo(x - l, y); c.stroke(); }
    }
    if (abilityT > 0) {
      const k = abilityT / ABILITY_TIME[abilityKey];
      c.fillStyle = 'rgba(255,255,255,.92)'; rrect(c, hudW / 2 - 130, hudH - 46, 260, 30, 15); c.fill();
      c.fillStyle = pup.color; rrect(c, hudW / 2 - 124, hudH - 40, 248 * k, 18, 9); c.fill();
      label(c, `${pup.ab.icon} ${pup.ab.name.toUpperCase()}`, hudW / 2, hudH - 64, 24, '#fff', pup.dark);
    }
  }
  if (playing) {
    if (state === 'play') drawHints(c);
    for (const e of entities) if (e.t === 'bridge' && !bridgeDown(e) && e.x - camX < W && e.x - camX > -300) { const p = toHud(e.x + e.w / 2, GROUND - 200); label(c, 'WAIT!', p.x, p.y + Math.sin(time * 8) * 4, 28, '#ffcc00'); }
    for (const p of popups) {
      const s = p.size * (1 + Math.max(0, p.life - 0.9) * 3);
      c.globalAlpha = Math.min(1, p.life * 2);
      const q = toHud(p.x, p.y, 0.6);
      c.font = `900 ${s}px Trebuchet MS, Arial`;
      const half = c.measureText(p.text).width / 2 + 8;
      label(c, p.text, Math.max(half, Math.min(hudW - half, q.x)), q.y, s, p.color);
    }
    c.globalAlpha = 1;
    drawHud(c);
  }
  if (state === 'play' && innerHeight > innerWidth * 1.15) label(c, 'Turn sideways! 🔄', hudW / 2, hudH * 0.2, 40, '#fff', '#1f4fa8');
  for (const p of confetti) { c.save(); c.translate(p.x, p.y); c.rotate(p.r); c.fillStyle = p.color; c.fillRect(-6, -3, 12, 6); c.restore(); }
}
function drawHints(c) {
  if (!truck.onGround) return;
  const wx = truckWX();
  const e = entities.find(e => ['boulder', 'tires', 'pit', 'fire', 'snowman', 'wall', 'bridge'].includes(e.t) && !e.broken && e.x - wx > 110 && e.x - wx < (e.t === 'wall' ? 800 : 420));
  if (!e) return;
  let txt = null;
  if (e.t === 'wall') {
    if (canBreak(e)) txt = 'SMASH IT!';
    else if (team[1 - active].id === 'rubble' || ['nitro', 'blade', 'plow', 'dash', 'stomp'].includes(team[1 - active].ab.key)) txt = '📱 PUP PAD!';
    else if (SMASHERS.includes(ab()) || ab() === 'stomp') txt = 'SPECIAL!';
    else txt = 'TOO TALL!';
  } else if (mode === 'campaign' && charge[active] >= 1 && abilityT <= 0 && e.x - wx < 600) txt = `${pup.ab.icon} SPECIAL!`;
  else if (curLevel.hints) txt = e.t === 'tires' ? 'JUMP x2!' : e.t === 'bridge' ? 'JUMP or WAIT!' : 'JUMP!';
  if (!txt) return;
  if (txt.includes('SPECIAL') && !prompted) { prompted = true; speak(`Tap the special button! ${pup.ab.name}!`); }
  const p = toHud(e.x + (e.w || 0) / 2, GROUND - Math.min(e.h || 60, 300) - 70, 0.3);
  const y = p.y + Math.sin(time * 10) * 6;
  label(c, txt, p.x, y, 34, '#5fe07a');
  poly(c, [[p.x - 13, y + 22], [p.x + 13, y + 22], [p.x, y + 38]], '#5fe07a');
}
function drawHud(c) {
  const fs = mode === 'freestyle';
  c.fillStyle = 'rgba(255,255,255,.92)';
  if (fs) {
    rrect(c, 14, 12, 230, 58, 29); c.fill();
    c.fillStyle = '#1f3b70'; c.font = '900 30px Trebuchet MS, Arial'; c.textAlign = 'left'; c.textBaseline = 'middle';
    c.fillText(`⭐ ${fsScore}`, 34, 43);
    c.fillStyle = 'rgba(255,255,255,.92)'; rrect(c, 254, 12, 110, 58, 29); c.fill();
    c.fillStyle = fsCombo > 1 ? '#ff6a00' : '#9aa5b5'; c.textAlign = 'center'; c.fillText(`x${+fsCombo.toFixed(2)}`, 309, 43);
    c.fillStyle = 'rgba(255,255,255,.92)'; rrect(c, 374, 12, 120, 58, 29); c.fill();
    c.fillStyle = fsTime < 10 ? '#e0322b' : '#1f3b70'; c.fillText(`⏱ ${Math.ceil(fsTime)}`, 434, 43);
    return;
  }
  rrect(c, 14, 12, 150, 58, 29); c.fill();
  for (let i = 0; i < MAX_HEARTS; i++) heart2d(c, 46 + i * 44, 45, 20, i < hearts ? '#ff3b5c' : '#d5dbe3');
  const gx = 174, g = curLevel.goal;
  c.fillStyle = 'rgba(255,255,255,.92)';
  if (g.type === 'race' || g.type === 'reach') {
    const bw = 260;
    rrect(c, gx, 12, bw, 58, 29); c.fill();
    c.fillStyle = '#d5dbe3'; rrect(c, gx + 20, 37, bw - 60, 10, 5); c.fill();
    const px = v => gx + 20 + Math.max(0, Math.min(1, (v - truck.sx) / (finishX + 100 - truck.sx))) * (bw - 60);
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) { c.fillStyle = (i + j) % 2 ? '#111' : '#fff'; c.fillRect(gx + bw - 36 + i * 7, 31 + j * 7, 7, 7); }
    if (rival) { circle(c, px(rival.x), 42, 12, '#1c1c1c'); circle(c, px(rival.x), 42, 6, '#3ddc4a'); }
    if (g.who) emoji(c, g.who === 'mayor' ? '👑' : '🐔', gx + bw - 14, 22, 18);
    circle(c, px(truckWX()), 42, 14, pup.color); emoji(c, '🐾', px(truckWX()), 43, 14);
  } else {
    rrect(c, gx, 12, 170, 58, 29); c.fill();
    emoji(c, { rescue: '🐱', crush: '🚗', bones: '🦴', flips: '🔄' }[g.type], gx + 34, 42, 30);
    c.fillStyle = '#1f3b70'; c.font = '900 30px Trebuchet MS, Arial'; c.textAlign = 'left'; c.textBaseline = 'middle';
    c.fillText(`${Math.min(progress(), g.n)}/${g.n}`, gx + 66, 43);
  }
  if (pup.id === 'rocky') {
    const rx = g.type === 'race' || g.type === 'reach' ? gx + 270 : gx + 180;
    c.fillStyle = 'rgba(255,255,255,.92)'; rrect(c, rx, 12, 130, 58, 29); c.fill();
    for (let i = 0; i < 3; i++) gear2d(c, rx + 30 + i * 36, 41, 11, i < scrapCount ? '#2fae4a' : '#d5dbe3');
  }
}

let hudCache = {};
function updateHud() {
  const fill = Math.round(charge[active] * 100);
  const ready = charge[active] >= 1 && abilityT <= 0;
  if (hudCache.fill !== fill || hudCache.ab !== pup.ab.icon || hudCache.active !== abilityT > 0) {
    $('specialFill').style.height = (abilityT > 0 ? Math.round(abilityT / ABILITY_TIME[abilityKey] * 100) : fill) + '%';
    $('specialIco').textContent = pup.ab.icon;
    hudCache.fill = fill; hudCache.ab = pup.ab.icon; hudCache.active = abilityT > 0;
  }
  if (hudCache.ready !== ready) { $('specialBtn').classList.toggle('ready', ready); hudCache.ready = ready; }
  const wall = entities.some(e => e.t === 'wall' && !e.broken && e.x - truckWX() > 0 && e.x - truckWX() < 900) && !canBreak({ t: 'wall' });
  const hint = wall && swapCool <= 0;
  if (hudCache.hint !== hint) { $('padBtn').classList.toggle('hint', hint); hudCache.hint = hint; }
  const cool = swapCool > 0;
  if (hudCache.cool !== cool) { $('padBtn').classList.toggle('cool', cool); hudCache.cool = cool; }
}
function updatePadBtn() { $('padName').textContent = team[1 - active].name.toUpperCase(); hudCache = {}; }

// ======================================================================
// Screens
// ======================================================================
const $ = id => document.getElementById(id);
const screens = ['title', 'garage', 'levels', 'intro', 'win', 'fail'];
const controlsEl = $('controls'), topbarEl = $('topbar');
function show(name) {
  screens.forEach(s => $(s).classList.toggle('show', s === name));
  const inGame = name === 'play';
  controlsEl.style.display = inGame ? 'flex' : 'none';
  topbarEl.style.display = inGame ? 'flex' : 'none';
  if (!inGame) { boostHeld = false; wheelieHeld = false; }
  document.body.classList.toggle('fs', mode === 'freestyle');
  if (['title', 'garage', 'levels'].includes(name) && (state === 'play' || state === 'win' || state === 'fail' || state === 'intro')) { pup = team[0]; rival = null; useTruckModels(); }
  state = name;
}
function starRow(st) { return '⭐'.repeat(st) + '<span style="opacity:.25">⭐</span>'.repeat(3 - st); }
function openLevels() {
  $('starTotal').textContent = `⭐ ${totalStars()} / ${MAX_STARS}`;
  const list = $('worldList'); list.innerHTML = '';
  WORLDS.forEach((wd, wi) => {
    const sec = document.createElement('div'); sec.className = 'world';
    sec.innerHTML = `<h3>${wd.ico} ${wd.name}</h3>`;
    const grid = document.createElement('div'); grid.className = 'grid lvgrid';
    LEVELS.forEach((Lv, i) => {
      if (Lv.world !== wi) return;
      const b = document.createElement('button');
      const open = levelUnlocked(i), st = save.stars[i] || 0;
      b.className = 'lvl' + (open ? '' : ' locked'); b.style.setProperty('--wc', wd.color);
      b.innerHTML = `<div class="ico">${open ? Lv.ico : '🔒'}</div><div class="num">LEVEL ${i + 1}</div><div class="nm">${Lv.name}</div><div class="st">${starRow(st)}</div>`;
      if (open) b.addEventListener('click', () => openIntro('campaign', i));
      grid.append(b);
    });
    sec.append(grid); list.append(sec);
  });
  const sec = document.createElement('div'); sec.className = 'world';
  sec.innerHTML = '<h3>🤘 Freestyle Stunt Arena</h3>';
  const grid = document.createElement('div'); grid.className = 'grid lvgrid';
  ARENAS.forEach((a, i) => {
    const b = document.createElement('button'); const r = save.fs[i] || {};
    b.className = 'lvl'; b.style.setProperty('--wc', '#e0322b');
    b.innerHTML = `<div class="ico">${a.ico}</div><div class="num">${r.best ? 'BEST ' + r.best : 'FREESTYLE'}</div><div class="nm">${a.name}</div><div class="st">${starRow(r.stars || 0)}</div>`;
    b.addEventListener('click', () => openIntro('freestyle', i));
    grid.append(b);
  });
  sec.append(grid); list.append(sec);
  show('levels');
}
function openIntro(m, i) {
  ensureAudio();
  mode = m;
  if (m === 'campaign') { levelIdx = i; curLevel = LEVELS[i]; } else { arenaIdx = i; curLevel = freestyleLevel(i); }
  $('introNum').textContent = m === 'campaign' ? `Level ${i + 1} · ${WORLDS[curLevel.world].name}` : 'Freestyle Stunt Arena';
  $('introName').textContent = curLevel.name;
  $('introIco').textContent = m === 'campaign' ? GOAL_ICON[curLevel.goal.type] : '🤘';
  $('introGoal').textContent = goalText(curLevel.goal);
  $('introTip').textContent = curLevel.tip;
  clearWorld(); entities = []; rival = null;
  show('intro');
  speak(m === 'campaign' ? `Level ${i + 1}. ${curLevel.name}. ${goalText(curLevel.goal)}` : `Freestyle! ${curLevel.name}!`);
}
function play() {
  startLevel();
  show('play');
  sfx.bark();
  speak(pup.name + '! ' + pup.line);
}
function endLevel(won, why) {
  if (ended) return;
  ended = true; boostHeld = false; wheelieHeld = false;
  setTimeout(() => {
    if (state !== 'play') return;
    const before = totalStars();
    let stars = 0;
    if (mode === 'freestyle') {
      stars = FS_STARS.filter(s => fsScore >= s).length;
      const r = save.fs[arenaIdx] || {};
      const newBest = !r.best || fsScore > r.best;
      save.fs[arenaIdx] = { best: Math.max(r.best || 0, fsScore), stars: Math.max(r.stars || 0, stars) };
      persist();
      $('winTitle').textContent = newBest ? 'NEW HIGH SCORE!' : 'TIME UP!';
      $('winText').textContent = `${pup.name} scored ${fsScore} points! ${stars < 3 ? `Get ${FS_STARS[stars]} for the next star.` : 'Freestyle superstar!'}`;
      $('nextBtn').style.display = 'none';
      speak(newBest ? `New high score! ${fsScore} points!` : `${fsScore} points! Awesome!`);
    } else if (won) {
      stars = Math.max(1, hearts);
      save.stars[levelIdx] = Math.max(save.stars[levelIdx] || 0, stars);
      persist();
      const last = levelIdx === LEVELS.length - 1, g = curLevel.goal;
      $('winTitle').textContent = last ? 'PAWJAM CHAMPION!' : g.type === 'race' ? 'YOU WON THE RACE!' : g.type === 'reach' ? `${CITIZENS[g.who].toUpperCase()} IS SAFE!` : 'MISSION COMPLETE!';
      $('winText').textContent = last ? `🏆 ${pup.name} is the champion of Adventure Bay Stadium! 🏆` :
        stars === 3 ? 'Perfect! Not a single heart lost!' : `Great job! Finish with all ${MAX_HEARTS} hearts to earn 3 stars.`;
      $('nextBtn').style.display = last ? 'none' : '';
      speak(last ? 'You are the Paw Jam champion!' : g.type === 'reach' ? `You saved ${CITIZENS[g.who]}! Mission complete!` : 'Mission complete! Paw Jam is on a roll!');
    }
    if (mode === 'freestyle' || won) {
      const after = totalStars();
      const unlocked = TRUCKS.filter(t => t.need > before && t.need <= after);
      sfx.win();
      for (let i = 0; i < 140; i++) confetti.push({ x: Math.random() * hudW, y: -Math.random() * 300, vx: (Math.random() - 0.5) * 120, vy: 80 + Math.random() * 160, r: Math.random() * 6, vr: (Math.random() - 0.5) * 10, color: ['#ff4d6d', '#ffd23f', '#3bceac', '#7b5cff', '#4cc9f0', '#ff8c42'][i % 6] });
      $('winStars').innerHTML = [0, 1, 2].map(i => `<i class="${i < stars ? '' : 'off'}" style="animation-delay:${i * 0.15}s">⭐</i>`).join('');
      const un = $('winUnlock');
      if (unlocked.length) { un.style.display = ''; un.textContent = `🔓 New truck style unlocked: ${unlocked.map(t => t.name).join(', ')}! Visit the Garage.`; }
      else un.style.display = 'none';
      show('win');
    } else {
      sfx.lose();
      $('failIco').textContent = why === 'race' ? '🏁' : '💔';
      $('failText').textContent = why === 'race' ? 'The rival truck won the race!' : 'Out of hearts!';
      $('failTip').textContent = why === 'race' ? 'Hold TURBO and use your SPECIAL to go faster!' :
        curLevel.w.wall ? 'Use the PUP PAD 📱 to swap to Rubble before big walls!' : 'Jump over rocks, fire and holes. Tap JUMP twice for a double jump!';
      show('fail');
      speak("Oh no! Let's try again!");
    }
  }, won ? 900 : 1100);
}

// ======================================================================
// Garage (3D turntable + rendered tiles)
// ======================================================================
const gCanvas = $('garagePreview');
const gRenderer = new THREE.WebGLRenderer({ canvas: gCanvas, antialias: true, alpha: true });
gRenderer.setPixelRatio(1); gRenderer.setSize(gCanvas.width, gCanvas.height, false); gRenderer.shadowMap.enabled = true;
const gScene = new THREE.Scene();
gScene.add(new THREE.HemisphereLight('#ffffff', '#8090a0', 1.1));
const gSun = new THREE.DirectionalLight('#ffffff', 1.8); gSun.position.set(3, 6, 5); gSun.castShadow = true; gSun.shadow.mapSize.set(1024, 1024); gScene.add(gSun);
const gFloor = mesh(cylG(48), mat('#ffffff', { opacity: 0.35 }), 0, -0.03, 0, 3.4, 0.06, 2.2, false); gFloor.receiveShadow = true; gScene.add(gFloor);
const gCam = new THREE.PerspectiveCamera(30, gCanvas.width / gCanvas.height, 0.1, 50);
gCam.position.set(0.3, 1.9, 5.6); gCam.lookAt(0.3, 0.9, 0);
let gLead = null, gBack = null;
function garageModels() {
  if (gLead) gScene.remove(gLead); if (gBack) gScene.remove(gBack);
  gLead = buildTruck(team[0], truckType); gLead.position.set(-0.6, 0, 0.4); gScene.add(gLead);
  gBack = buildTruck(team[1], truckType); gBack.scale.setScalar(0.7); gBack.position.set(1.75, 0, -0.9); gScene.add(gBack);
}
function renderGarage() {
  if (!gLead) return;
  gLead.rotation.y = Math.sin(time * 0.6) * 0.6 - 0.25;
  gBack.rotation.y = Math.sin(time * 0.6 + 1) * 0.5 - 0.4;
  for (const [m, i] of [[gLead, 0], [gBack, 1]]) { m.userData.wheels.forEach(w => w.rotation.z = -time * 3); poseTruckIdle(m, i); }
  gRenderer.render(gScene, gCam);
}
function poseTruckIdle(m, i) {
  const ud = m.userData;
  ud.chassis.position.y = Math.abs(Math.sin(time * 4 + i)) * 0.05;
  if (ud.rotor) ud.rotor.rotation.y = time * 14; if (ud.fanBlades) ud.fanBlades.rotation.x = time * 10;
  const flash = Math.floor(time * 6) % 2; ud.blink.forEach((l, j) => l.visible = (j % 2) === flash);
  if (ud.head) ud.head.rotation.y = -0.75 + Math.sin(time * 1.3 + i) * 0.2;
}
// thumbnails rendered once into images
const thumbRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
thumbRenderer.setPixelRatio(1);
const thumbScene = new THREE.Scene();
thumbScene.add(new THREE.HemisphereLight('#ffffff', '#8090a0', 1.2));
const tSun = new THREE.DirectionalLight('#ffffff', 1.6); tSun.position.set(3, 5, 6); thumbScene.add(tSun);
function thumb(obj, w, h, camPos, look) {
  thumbRenderer.setSize(w, h, false);
  const cam = new THREE.PerspectiveCamera(30, w / h, 0.05, 50); cam.position.copy(camPos); cam.lookAt(look);
  thumbScene.add(obj); thumbRenderer.render(thumbScene, cam); thumbScene.remove(obj);
  return thumbRenderer.domElement.toDataURL('image/png');
}
let pickSlot = 0;
const pupTiles = [], truckTiles = [], pupThumbs = {};
PUPS.forEach((p) => {
  const b = document.createElement('button'); b.className = 'tile';
  const img = document.createElement('img'); img.alt = p.name;
  const head = buildPupHead(p, 0.5); head.rotation.y = -1.0;
  img.src = thumb(head, 160, 160, new THREE.Vector3(0, 0.3, 2.7), new THREE.Vector3(0, 0.12, 0)); pupThumbs[p.id] = img.src;
  const nm = document.createElement('b'); nm.textContent = p.name;
  const bd = document.createElement('div'); bd.className = 'badge';
  b.append(img, nm, bd);
  b.addEventListener('click', () => {
    const other = 1 - pickSlot;
    if (team[other] === p) team[other] = team[pickSlot];
    team[pickSlot] = p;
    save.team = team.map(t => PUPS.indexOf(t)); persist();
    pup = team[0]; active = 0;
    sfx.bark(); speak(`${p.name}! ${p.ab.name}!`);
    if (pickSlot === 0) setSlot(1);
    refreshGarage(true);
  });
  $('pupGrid').append(b); pupTiles.push({ b, bd, p });
});
TRUCKS.forEach((t, i) => {
  const b = document.createElement('button'); b.className = 'tile';
  const img = document.createElement('img'); img.alt = t.name;
  const nm = document.createElement('b'); nm.textContent = t.name;
  const lock = document.createElement('div'); lock.className = 'lock';
  b.append(img, nm, lock);
  b.addEventListener('click', () => {
    if (!truckUnlocked(t)) { tone(200, 0.2, 'square', 0.1); speak(`Earn ${t.need} stars to unlock ${t.name}!`); return; }
    truckType = t; save.truck = i; persist(); (HORNS[t.id] || HORNS.pup)(); refreshGarage(true);
  });
  $('truckGrid').append(b); truckTiles.push({ b, img, lock, t });
});
function setSlot(s) { pickSlot = s; $('tabLead').classList.toggle('on', s === 0); $('tabBack').classList.toggle('on', s === 1); }
$('tabLead').addEventListener('click', () => setSlot(0));
$('tabBack').addEventListener('click', () => setSlot(1));
let thumbsFor = '';
function refreshGarage(models) {
  pupTiles.forEach(({ b, bd, p }) => {
    const slot = team.indexOf(p);
    b.classList.toggle('sel', slot === 0); b.classList.toggle('sel2', slot === 1);
    bd.style.display = slot < 0 ? 'none' : 'flex';
    bd.textContent = slot === 0 ? '1' : '2'; bd.style.background = slot === 0 ? '#ff6a00' : '#1f6fd6';
  });
  if (thumbsFor !== team[0].id) {
    thumbsFor = team[0].id;
    truckTiles.forEach(({ img, t }) => { const m = buildTruck(team[0], t); m.rotation.y = -0.45; img.src = thumb(m, 220, 150, new THREE.Vector3(0.2, 1.6, 4.4), new THREE.Vector3(0, 0.9, 0)); });
  }
  truckTiles.forEach(({ b, lock, t }) => {
    const open = truckUnlocked(t);
    b.classList.toggle('locked', !open); b.classList.toggle('sel', t === truckType);
    lock.innerHTML = open ? '' : `<span>🔒</span>⭐ ${t.need}`;
  });
  $('abilityInfo').innerHTML = team.map((p, i) => `${i ? '📱 Backup' : '⭐ Leader'}: ${p.name} — ${p.ab.icon} ${p.ab.name}: ${p.ab.desc}`).join('<br>');
  if (models !== false) { garageModels(); pup = team[0]; useTruckModels(); }
}

// ======================================================================
// Buttons & input
// ======================================================================
$('playBtn').addEventListener('click', () => { ensureAudio(); sfx.bark(); if (!save.seenGarage) { save.seenGarage = true; persist(); refreshGarage(true); show('garage'); } else openLevels(); });
$('rollBtn').addEventListener('click', openLevels);
$('garageBtn').addEventListener('click', () => { refreshGarage(true); setSlot(0); show('garage'); });
$('titleBtn').addEventListener('click', () => show('title'));
$('goBtn').addEventListener('click', play);
const retry = () => mode === 'campaign' ? openIntro('campaign', levelIdx) : openIntro('freestyle', arenaIdx);
$('againBtn').addEventListener('click', retry);
$('againBtn2').addEventListener('click', retry);
$('nextBtn').addEventListener('click', () => openIntro('campaign', Math.min(levelIdx + 1, LEVELS.length - 1)));
$('levelsBtn1').addEventListener('click', openLevels);
$('levelsBtn2').addEventListener('click', openLevels);
$('homeBtn').addEventListener('click', () => { if (window.speechSynthesis) speechSynthesis.cancel(); openLevels(); });
$('muteBtn').addEventListener('click', e => {
  muted = !muted; e.currentTarget.textContent = muted ? '🔇' : '🔊';
  if (muted && window.speechSynthesis) speechSynthesis.cancel();
});
hud.addEventListener('pointerdown', e => { e.preventDefault(); ensureAudio(); jump(); });
const press = (id, fn) => $(id).addEventListener('pointerdown', e => { e.preventDefault(); ensureAudio(); fn(); });
press('jumpBtn', jump); press('hornBtn', honk); press('specialBtn', useSpecial); press('padBtn', swapPup); press('trickBtn', trickPress);
function holdBtn(id, set) {
  const b = $(id);
  b.addEventListener('pointerdown', e => { e.preventDefault(); ensureAudio(); set(state === 'play'); b.classList.add('down'); b.setPointerCapture(e.pointerId); });
  ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(ev => b.addEventListener(ev, () => { set(false); b.classList.remove('down'); }));
}
holdBtn('turboBtn', v => boostHeld = v);
holdBtn('wheelieBtn', v => wheelieHeld = v);
addEventListener('keydown', e => {
  if (e.repeat) return;
  if (['Space', 'ArrowUp', 'KeyW'].includes(e.code)) { e.preventDefault(); ensureAudio(); jump(); }
  if (['ArrowRight', 'KeyD', 'ShiftLeft', 'ShiftRight'].includes(e.code)) boostHeld = state === 'play';
  if (e.code === 'KeyH') honk();
  if (e.code === 'KeyE' || e.code === 'KeyP') useSpecial();
  if (e.code === 'KeyQ' || e.code === 'Tab') { e.preventDefault(); swapPup(); }
  if (e.code === 'KeyF') trickPress();
  if (e.code === 'ArrowDown' || e.code === 'KeyS') wheelieHeld = state === 'play';
});
addEventListener('keyup', e => {
  if (['ArrowRight', 'KeyD', 'ShiftLeft', 'ShiftRight'].includes(e.code)) boostHeld = false;
  if (e.code === 'ArrowDown' || e.code === 'KeyS') wheelieHeld = false;
});
document.addEventListener('contextmenu', e => e.preventDefault());

// ======================================================================
// Loop
// ======================================================================
resize();
setTheme(LEVELS[0]);
useTruckModels();
refreshGarage(false);
$('loading').remove();
show('title');
let last = performance.now();
function frame(now) {
  const dt = Math.min(0.033, (now - last) / 1000);
  last = now;
  const t0 = performance.now(); update(dt); const t1 = performance.now(); if (!(window.__g && window.__g.norender)) render3D(); const t2 = performance.now(); renderOverlay();
  if (window.__g) { const pr = window.__g.prof = window.__g.prof || { u: 0, r: 0, o: 0, n: 0 }; pr.u += t1 - t0; pr.r += t2 - t1; pr.o += performance.now() - t2; pr.n++; }
  if (state === 'garage') renderGarage();
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
window.__pawjam = { get state() { return state; }, thumb, buildPupHead, buildTruck, PUPS, TRUCKS, THREE };
if (location.search.includes('debug')) window.__g = { ent: () => entities, wx: truckWX, st: () => state, truck, hearts: () => hearts, prog: () => progress(), save, jump, useSpecial, swapPup, trickPress, openIntro, play, pup: () => pup, bd: bridgeDown, spd: speed, setBoost: v => boostHeld = v, setWheelie: v => wheelieHeld = v, score: () => fsScore, loop: () => loopRide, calls: () => renderer.info.render.calls, setTeam: (a, b) => { team[0] = PUPS[a]; team[1] = PUPS[b]; }, charge: () => charge, hits: () => specialHits };
