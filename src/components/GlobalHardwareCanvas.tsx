import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const N = 4000;

// Utility functions for generating particle shapes
function alloc() {
  return new Float32Array(N * 3);
}

function applyOffset(arr: Float32Array, dx: number, dy: number) {
  for (let i = 0; i < N; i++) {
    arr[i * 3] += dx;
    arr[i * 3 + 1] += dy;
  }
  return arr;
}

function fillRandomFill(arr: Float32Array, startIdx: number, count: number, cx: number, cy: number, cz: number, radius: number) {
  let idx = startIdx;
  for (let i = 0; i < count && idx < N; i++) {
    const r = radius * Math.cbrt(Math.random());
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos(2 * Math.random() - 1);
    arr[idx * 3] = cx + r * Math.sin(phi) * Math.cos(theta);
    arr[idx * 3 + 1] = cy + r * Math.sin(phi) * Math.sin(theta);
    arr[idx * 3 + 2] = cz + r * Math.cos(phi);
    idx++;
  }
  return idx;
}

function fillRect(arr: Float32Array, startIdx: number, count: number, w: number, h: number, d: number, zOffset: number) {
  let idx = startIdx;
  for (let i = 0; i < count && idx < N; i++) {
    arr[idx * 3] = (Math.random() - 0.5) * w;
    arr[idx * 3 + 1] = (Math.random() - 0.5) * h;
    arr[idx * 3 + 2] = (Math.random() - 0.5) * d + zOffset;
    idx++;
  }
  return idx;
}

function fillCircle(arr: Float32Array, startIdx: number, count: number, cx: number, cy: number, cz: number, r: number, thick: number) {
  let idx = startIdx;
  for (let i = 0; i < count && idx < N; i++) {
    const angle = Math.random() * Math.PI * 2;
    const rad = r + (Math.random() - 0.5) * thick;
    arr[idx * 3] = cx + rad * Math.cos(angle);
    arr[idx * 3 + 1] = cy + rad * Math.sin(angle);
    arr[idx * 3 + 2] = cz + (Math.random() - 0.5) * thick;
    idx++;
  }
  return idx;
}

function shapeDisperse() {
  const arr = alloc();
  for (let i = 0; i < N; i++) {
    arr[i * 3] = (Math.random() - 0.5) * 14;
    arr[i * 3 + 1] = (Math.random() - 0.5) * 14;
    arr[i * 3 + 2] = (Math.random() - 0.5) * 14;
  }
  return arr;
}

function shapeProcessor() {
  const arr = alloc();
  let idx = 0;
  idx = fillRect(arr, idx, Math.floor(N * 0.45), 2.0, 2.0, 0.05, 0);
  idx = fillRect(arr, idx, Math.floor(N * 0.25), 1.4, 1.4, 0.1, 0.1);
  const pinCount = Math.floor(N * 0.25);
  const pinsPerSide = Math.floor(pinCount / 4);
  const edge = 1.05;
  for (let i = 0; i < pinsPerSide && idx < N; i++) {
    const t = (i / pinsPerSide - 0.5) * 1.8;
    idx = fillRect(arr, idx, 1, 0.1, 0.1, 0.1, 0);
    if (idx - 1 < N) {
      arr[(idx - 1) * 3] = t;
      arr[(idx - 1) * 3 + 1] = edge;
    }
    idx = fillRect(arr, idx, 1, 0.1, 0.1, 0.1, 0);
    if (idx - 1 < N) {
      arr[(idx - 1) * 3] = t;
      arr[(idx - 1) * 3 + 1] = -edge;
    }
    idx = fillRect(arr, idx, 1, 0.1, 0.1, 0.1, 0);
    if (idx - 1 < N) {
      arr[(idx - 1) * 3] = edge;
      arr[(idx - 1) * 3 + 1] = t;
    }
    idx = fillRect(arr, idx, 1, 0.1, 0.1, 0.1, 0);
    if (idx - 1 < N) {
      arr[(idx - 1) * 3] = -edge;
      arr[(idx - 1) * 3 + 1] = t;
    }
  }
  if (idx < N) idx = fillRandomFill(arr, idx, N - idx, 0, 0, 0, 2.5);
  return arr;
}

function shapeDrone() {
  const arr = alloc();
  let idx = 0;
  idx = fillRect(arr, idx, Math.floor(N * 0.25), 0.8, 1.8, 0.2, 0);
  const armCount = Math.floor(N * 0.4);
  const perArm = Math.floor(armCount / 4);
  const armL = 1.4;
  const arms = [[1, 1], [1, -1], [-1, 1], [-1, -1]];
  arms.forEach(([dx, dy]) => {
    const before = idx;
    idx = fillRect(arr, idx, perArm, armL, 0.15, 0.1, 0);
    for (let k = before; k < idx; k++) {
      const x = arr[k * 3];
      const y = arr[k * 3 + 1];
      const angle = Math.atan2(dy, dx);
      arr[k * 3] = x * Math.cos(angle) - y * Math.sin(angle) + (dx * armL) / 2;
      arr[k * 3 + 1] = x * Math.sin(angle) + y * Math.cos(angle) + (dy * armL) / 2;
    }
  });
  const propCount = Math.floor(N * 0.25);
  const perProp = Math.floor(propCount / 4);
  arms.forEach(([dx, dy]) => {
    idx = fillCircle(arr, idx, perProp, dx * armL, dy * armL, 0.1, 0.6, 0.05);
  });
  if (idx < N) idx = fillRandomFill(arr, idx, N - idx, 0, 0, 0, 2.5);
  return arr;
}

function shapeRaspberryPi() {
  const arr = alloc();
  let idx = 0;
  const boardW = 3.4;
  const boardH = 2.2;
  idx = fillRect(arr, idx, Math.floor(N * 0.35), boardW, boardH, 0.04, -0.02);
  const holeCount = Math.floor(N * 0.04);
  const perHole = Math.floor(holeCount / 4);
  const holeInset = 0.15;
  const holeXY = [
    [-boardW / 2 + holeInset, boardH / 2 - holeInset],
    [boardW / 2 - holeInset, boardH / 2 - holeInset],
    [-boardW / 2 + holeInset, -boardH / 2 + holeInset],
    [boardW / 2 - holeInset, -boardH / 2 + holeInset],
  ];
  holeXY.forEach(([x, y]) => {
    idx = fillCircle(arr, idx, perHole, x, y, 0.02, 0.11, 0.015);
  });
  const gpioCount = Math.floor(N * 0.13);
  const pins = 20;
  const perPinPair = Math.floor(gpioCount / (pins * 2));
  const gpioSpan = boardW * 0.8;
  const gpioStartX = -boardW / 2 + 0.35;
  for (let row = 0; row < 2; row++) {
    for (let p = 0; p < pins && idx < N; p++) {
      const x = gpioStartX + (p / (pins - 1)) * gpioSpan;
      const y = boardH / 2 - 0.18 - row * 0.16;
      const cnt = Math.min(perPinPair, N - idx);
      if (cnt > 0) idx = fillRandomFill(arr, idx, cnt, x, y, 0.06, 0.05);
    }
  }
  const socCount = Math.floor(N * 0.07);
  idx = fillRect(arr, idx, socCount, 0.85, 0.85, 0.02, 0);
  for (let k = idx - socCount; k < idx; k++) {
    arr[k * 3] += -0.35;
    arr[k * 3 + 1] += -0.15;
  }
  const usbCount = Math.floor(N * 0.09);
  const perUsb = Math.floor(usbCount / 2);
  for (let u = 0; u < 2; u++) {
    const cnt = Math.min(perUsb, N - idx);
    const before = idx;
    idx = fillRect(arr, idx, cnt, 0.55, 0.32, 0.02, 0);
    for (let k = before; k < idx; k++) {
      arr[k * 3] += boardW / 2 - 0.35;
      arr[k * 3 + 1] += boardH / 2 - 0.55 - u * 0.4;
    }
  }
  if (idx < N) idx = fillRandomFill(arr, idx, N - idx, 0, 0, 0, 2.5);
  return arr;
}

function shapeArcReactor() {
  const arr = alloc();
  let idx = 0;
  const outerR = 1.9, innerR = 1.15;
  const toothCount = 16;
  const teethBudget = Math.floor(N * 0.42);
  const perTooth = Math.floor(teethBudget / toothCount);
  for (let t = 0; t < toothCount && idx < N; t++) {
    const a = (t / toothCount) * Math.PI * 2;
    const cx = Math.cos(a) * ((outerR + innerR) / 2);
    const cy = Math.sin(a) * ((outerR + innerR) / 2);
    const cnt = Math.min(perTooth, N - idx);
    const before = idx;
    idx = fillRect(arr, idx, cnt, 0.28, 0.55, 0.03, 0);
    for (let k = before; k < idx; k++) {
      const lx = arr[k * 3], ly = arr[k * 3 + 1];
      arr[k * 3] = cx + lx * Math.cos(a);
      arr[k * 3 + 1] = cy + lx * Math.sin(a);
      arr[k * 3 + 2] = ly;
    }
  }
  const collarBudget = Math.floor(N * 0.22);
  idx = fillCircle(arr, idx, Math.floor(collarBudget / 2), 0, 0, 0.32, outerR * 0.92, 0.03);
  idx = fillCircle(arr, idx, Math.ceil(collarBudget / 2), 0, 0, -0.32, outerR * 0.92, 0.03);
  const hubBudget = Math.floor(N * 0.16);
  idx = fillCircle(arr, idx, Math.floor(hubBudget * 0.5), 0, 0, 0, innerR, 0.025);
  const boltCount = 10;
  const perBolt = Math.floor(hubBudget * 0.5 / boltCount);
  for (let b = 0; b < boltCount && idx < N; b++) {
    const a = (b / boltCount) * Math.PI * 2;
    const cnt = Math.min(perBolt, N - idx);
    if (cnt > 0) idx = fillCircle(arr, idx, cnt, Math.cos(a) * innerR * 0.85, Math.sin(a) * innerR * 0.85, 0, 0.08, 0.01);
  }
  if (idx < N) idx = fillRandomFill(arr, idx, N - idx, 0, 0, 0, innerR * 0.65);
  return arr;
}

const STAGES = [
  applyOffset(shapeDisperse(), 3.5, 0),
  applyOffset(shapeProcessor(), 3.5, 0),
  shapeDisperse(),
  applyOffset(shapeDrone(), -3.5, 0),
  shapeDisperse(),
  applyOffset(shapeRaspberryPi(), 3.5, 0),
  shapeDisperse(),
  applyOffset(shapeArcReactor(), -3.5, 0),
];

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

const MorphingParticles = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const [smoothProgress, setSmoothProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const initialPositions = useMemo(() => {
    const arr = new Float32Array(N * 3);
    arr.set(STAGES[0]);
    return arr;
  }, []);

  useFrame(() => {
    if (!pointsRef.current) return;

    // Calculate scroll progress
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const targetProgress = maxScroll > 0 ? Math.min(Math.max(window.scrollY / maxScroll, 0), 1) : 0;
    
    // Smooth progress
    const newSmooth = smoothProgress + (targetProgress - smoothProgress) * 0.08;
    setSmoothProgress(newSmooth);

    const segments = STAGES.length - 1;
    const scaled = newSmooth * segments;
    const segIdx = Math.min(Math.floor(scaled), segments - 1);
    const localT = easeInOut(scaled - segIdx);

    const a = STAGES[segIdx];
    const b = STAGES[segIdx + 1];

    const curl = Math.sin(localT * Math.PI) * 0.9;
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < N; i++) {
      const ix = i * 3, iy = i * 3 + 1, iz = i * 3 + 2;
      const nx = (Math.random() - 0.5) * curl * 0.15;
      const ny = (Math.random() - 0.5) * curl * 0.15;
      const nz = (Math.random() - 0.5) * curl * 0.15;
      
      positions[ix] = a[ix] + (b[ix] - a[ix]) * localT + nx;
      positions[iy] = a[iy] + (b[iy] - a[iy]) * localT + ny;
      positions[iz] = a[iz] + (b[iz] - a[iz]) * localT + nz;
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.rotation.y += 0.0015;
    pointsRef.current.rotation.x = Math.sin(newSmooth * Math.PI * 2) * 0.1;
  });

  return (
    <points ref={pointsRef} scale={isMobile ? 0.7 : 1.35}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[initialPositions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#4829BA" // Dark blue / Royal Purple
        transparent
        opacity={isMobile ? 0.25 : 0.45}
        sizeAttenuation
      />
    </points>
  );
};

export default function GlobalHardwareCanvas() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
      <Canvas camera={{ position: [0, 0, 9], fov: 50 }}>
        <fog attach="fog" args={['#F8F9FE', 5, 15]} />
        <MorphingParticles />
      </Canvas>
    </div>
  );
}
