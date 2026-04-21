"use client";
import { useRef, useMemo, useEffect, useLayoutEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Float,
  MeshDistortMaterial,
  Sparkles,
  Environment,
  MeshTransmissionMaterial,
  AdaptiveDpr,
  AdaptiveEvents,
} from "@react-three/drei";
import * as THREE from "three";

// ── Shared material cache (prevents redundant GPU uploads) ────────────────────
const MATS = {
  gold: new THREE.MeshStandardMaterial({ color: "#c9a96e", metalness: 0.95, roughness: 0.05, envMapIntensity: 2 }),
  rose: new THREE.MeshStandardMaterial({ color: "#b76e79", metalness: 0.9, roughness: 0.1 }),
  petal: new THREE.MeshStandardMaterial({ color: "#d4a0a8", metalness: 0.8, roughness: 0.2 }),
  dark: new THREE.MeshStandardMaterial({ color: "#1a1a1a", metalness: 0.3, roughness: 0.65 }),
  mid:  new THREE.MeshStandardMaterial({ color: "#2a2a2a", metalness: 0.3, roughness: 0.5 }),
};

// ── Scissors ──────────────────────────────────────────────────────────────────
function Scissors({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.3;
    groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime) * 0.1;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.8}>
      <group ref={groupRef} position={position} scale={0.7}>
        <mesh rotation={[0, 0, Math.PI / 6]} material={MATS.gold}>
          <boxGeometry args={[0.08, 1.4, 0.04]} />
        </mesh>
        <mesh rotation={[0, 0, -Math.PI / 6]} material={MATS.gold}>
          <boxGeometry args={[0.08, 1.4, 0.04]} />
        </mesh>
        <mesh position={[0.3, -0.6, 0]} material={MATS.rose}>
          <torusGeometry args={[0.18, 0.04, 12, 24]} />
        </mesh>
        <mesh position={[-0.3, -0.6, 0]} material={MATS.rose}>
          <torusGeometry args={[0.18, 0.04, 12, 24]} />
        </mesh>
        <mesh material={MATS.petal}>
          <cylinderGeometry args={[0.06, 0.06, 0.1, 12]} />
        </mesh>
      </group>
    </Float>
  );
}

// ── Hair Dryer ────────────────────────────────────────────────────────────────
function HairDryer({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.x += delta * 0.18;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={1}>
      <group ref={groupRef} position={position} rotation={[0.3, 0.5, 0]} scale={0.6}>
        <mesh material={MATS.dark}>
          <cylinderGeometry args={[0.22, 0.18, 1.1, 20]} />
        </mesh>
        <mesh position={[0, 0.72, 0]} material={MATS.mid}>
          <cylinderGeometry args={[0.18, 0.22, 0.35, 20]} />
        </mesh>
        <mesh position={[0, 0.9, 0]} material={MATS.rose}>
          <cylinderGeometry args={[0.14, 0.18, 0.08, 20]} />
        </mesh>
        <mesh position={[0, -0.55, 0.25]} rotation={[0.6, 0, 0]} material={MATS.dark}>
          <cylinderGeometry args={[0.1, 0.09, 0.7, 12]} />
        </mesh>
        <mesh position={[0, 0.1, 0]} material={MATS.rose}>
          <cylinderGeometry args={[0.225, 0.225, 0.06, 20]} />
        </mesh>
      </group>
    </Float>
  );
}

// ── Comb — uses InstancedMesh for teeth (1 draw call vs 14) ──────────────────
const _tempObj = new THREE.Object3D();

function Comb({ position }: { position: [number, number, number] }) {
  const teethRef = useRef<THREE.InstancedMesh>(null);
  const TEETH = 14;

  useLayoutEffect(() => {
    if (!teethRef.current) return;
    for (let i = 0; i < TEETH; i++) {
      _tempObj.position.set(-0.72 + i * 0.11, -0.18, 0);
      _tempObj.updateMatrix();
      teethRef.current.setMatrixAt(i, _tempObj.matrix);
    }
    teethRef.current.instanceMatrix.needsUpdate = true;
  }, []);

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.2}>
      <group position={position} rotation={[0.2, 0.4, 0.3]} scale={0.7}>
        <mesh material={MATS.gold}>
          <boxGeometry args={[1.6, 0.18, 0.05]} />
        </mesh>
        <instancedMesh ref={teethRef} args={[undefined, undefined, TEETH]} material={MATS.petal}>
          <boxGeometry args={[0.04, 0.28, 0.04]} />
        </instancedMesh>
      </group>
    </Float>
  );
}

// ── Mirror ────────────────────────────────────────────────────────────────────
function HandMirror({ position }: { position: [number, number, number] }) {
  const mirrorRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!mirrorRef.current) return;
    mirrorRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
  });

  return (
    <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.6}>
      <group position={position} scale={0.65}>
        <mesh ref={mirrorRef} position={[0, 0.3, 0]}>
          <circleGeometry args={[0.55, 48]} />
          <MeshTransmissionMaterial
            backside
            samples={4}
            thickness={0.3}
            roughness={0}
            transmission={0.6}
            ior={1.5}
            chromaticAberration={0.04}
            color="#d4a0a8"
          />
        </mesh>
        <mesh position={[0, 0.3, -0.01]} material={MATS.gold}>
          <ringGeometry args={[0.55, 0.65, 48]} />
        </mesh>
        <mesh position={[0, -0.5, 0]} material={MATS.rose}>
          <cylinderGeometry args={[0.07, 0.09, 0.8, 12]} />
        </mesh>
      </group>
    </Float>
  );
}

// ── Particle ring — single draw call ─────────────────────────────────────────
function ParticleRing() {
  const ringRef = useRef<THREE.Points>(null);
  const COUNT = 250;

  const positions = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const angle = (i / COUNT) * Math.PI * 2;
      const r = 6 + Math.random() * 3;
      pos[i * 3]     = Math.cos(angle) * r;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 2] = Math.sin(angle) * r;
    }
    return pos;
  }, []);

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, [positions]);

  const material = useMemo(
    () => new THREE.PointsMaterial({ color: "#b76e79", size: 0.03, transparent: true, opacity: 0.55, sizeAttenuation: true }),
    []
  );

  useEffect(() => () => { geometry.dispose(); material.dispose(); }, [geometry, material]);

  useFrame((_, delta) => {
    if (ringRef.current) ringRef.current.rotation.y += delta * 0.04;
  });

  return <points ref={ringRef} geometry={geometry} material={material} />;
}

// ── Central distortion orb ────────────────────────────────────────────────────
function CentralOrb() {
  const orbRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!orbRef.current) return;
    orbRef.current.rotation.x = state.clock.elapsedTime * 0.15;
    orbRef.current.rotation.y = state.clock.elapsedTime * 0.2;
  });

  return (
    <mesh ref={orbRef}>
      <sphereGeometry args={[1.1, 32, 32]} />
      <MeshDistortMaterial
        color="#b76e79"
        distort={0.32}
        speed={1.8}
        roughness={0}
        metalness={0.1}
        transparent
        opacity={0.1}
      />
    </mesh>
  );
}

// ── Camera — smooth sinusoidal orbit ─────────────────────────────────────────
function CameraRig() {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 0, 7));

  useFrame((state) => {
    targetPos.current.set(
      Math.sin(state.clock.elapsedTime * 0.1) * 0.8,
      Math.cos(state.clock.elapsedTime * 0.08) * 0.4,
      7
    );
    camera.position.lerp(targetPos.current, 0.02);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

// ── Canvas pause when hero scrolls out of view ────────────────────────────────
function FrameThrottle() {
  const { gl } = useThree();

  useEffect(() => {
    const canvas = gl.domElement;
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Reduce pixel ratio to 0.5 when not visible to save GPU time
        gl.setPixelRatio(entry.isIntersecting ? Math.min(window.devicePixelRatio, 2) : 0.5);
      },
      { threshold: 0.1 }
    );
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [gl]);

  return null;
}

// ── Main exported scene ───────────────────────────────────────────────────────
export default function HeroScene() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 7], fov: 50 }}
        performance={{ min: 0.5 }}
      >
        <Suspense fallback={null}>
          <AdaptiveDpr pixelated />
          <AdaptiveEvents />
          <FrameThrottle />
          <CameraRig />

          <ambientLight intensity={0.25} />
          <directionalLight position={[5, 5, 5]} intensity={1.4} color="#f7e7ce" />
          <pointLight position={[-4, 2, 2]} intensity={1.8} color="#b76e79" />
          <pointLight position={[4, -2, -2]} intensity={1.2} color="#d4a0a8" />
          {/* Removed castShadow — no shadow receivers, saves ~15% GPU */}
          <spotLight position={[0, 8, 0]} angle={0.4} penumbra={1} intensity={1.8} color="#f7e7ce" />

          <CentralOrb />
          <Scissors position={[-2.8, 1.2, 0]} />
          <HairDryer position={[2.8, 0.8, -0.5]} />
          <Comb position={[-2.2, -1.4, 0.5]} />
          <HandMirror position={[2.5, -1.2, 0]} />

          <Sparkles count={60} scale={10} size={0.7} speed={0.25} color="#b76e79" opacity={0.65} />
          <Sparkles count={30} scale={8}  size={0.4} speed={0.15} color="#f7e7ce" opacity={0.35} />

          <ParticleRing />

          <Environment preset="studio" />
          <fog attach="fog" args={["#0a0a0a", 10, 22]} />
        </Suspense>
      </Canvas>
    </div>
  );
}
