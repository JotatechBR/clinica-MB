"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";
import { createLamina, createOrganicGeometry } from "./geometry";
import { computeTarget, stage } from "./stage";

const BONE = new THREE.Color("#F6F1EA");
const ESPRESSO = new THREE.Color("#141110");

type Props = { quality: "high" | "mid" };

/**
 * Escultura abstrata: núcleo de vidro champagne + lâminas translúcidas
 * (camadas da pele) + órbita fina (precisão).
 */
export function Sculpture({ quality }: Props) {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const laminae = useRef<THREE.Group>(null);
  const orbit = useRef<THREE.Mesh>(null);
  const bg = useMemo(() => BONE.clone(), []);
  const { viewport, size } = useThree();

  const high = quality === "high";
  const coreGeo = useMemo(() => createOrganicGeometry(high ? 40 : 18), [high]);
  const laminaGeos = useMemo(
    () => [
      createLamina(1.42, Math.PI * 0.95, Math.PI * 0.22, Math.PI * 0.5, high ? 72 : 40),
      createLamina(1.62, Math.PI * 0.8, Math.PI * 0.3, Math.PI * 0.42, high ? 72 : 40),
      createLamina(1.86, Math.PI * 0.62, Math.PI * 0.36, Math.PI * 0.3, high ? 72 : 40),
    ],
    [high],
  );

  const smoothed = useRef({ x: 0.07, y: 0.02, scale: 0, dark: 0, px: 0, py: 0, spin: 0 });

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const dt = Math.min(delta, 1 / 20);
    const mobile = size.width < 768;
    const target = computeTarget(mobile);
    const s = smoothed.current;
    const k = 1 - Math.exp(-dt * 3.2);

    s.x += (target.x - s.x) * k;
    s.y += (target.y - s.y) * k;
    s.scale += (target.scale - s.scale) * (1 - Math.exp(-dt * 2.4));
    s.dark += (target.dark - s.dark) * k;
    s.spin += (target.spin - s.spin) * k;
    s.px += (stage.pointer.x - s.px) * (1 - Math.exp(-dt * 2));
    s.py += (stage.pointer.y - s.py) * (1 - Math.exp(-dt * 2));

    const t = state.clock.elapsedTime;
    const base = Math.min(viewport.width, viewport.height * 0.9) * (mobile ? 0.36 : 0.3);

    g.position.set(s.x * viewport.width, -s.y * viewport.height + Math.sin(t * 0.5) * 0.04, 0);
    g.scale.setScalar(Math.max(0.0001, base * s.scale));
    g.rotation.x = s.py * 0.18 + Math.sin(t * 0.21) * 0.05;
    g.rotation.y = s.px * 0.35 + s.spin * 1.2;

    if (core.current) {
      core.current.rotation.y += dt * 0.08;
      core.current.rotation.z = Math.sin(t * 0.17) * 0.12;
    }
    if (laminae.current) {
      laminae.current.children.forEach((child, i) => {
        child.rotation.y += dt * (0.05 + i * 0.025) * (i % 2 ? -1 : 1);
        child.rotation.x = Math.sin(t * 0.13 + i) * 0.12 + 0.35 - i * 0.2;
      });
    }
    if (orbit.current) orbit.current.rotation.z += dt * 0.04;

    bg.copy(BONE).lerp(ESPRESSO, s.dark);
  });

  return (
    <group ref={group}>
      <mesh ref={core} geometry={coreGeo}>
        {high ? (
          <MeshTransmissionMaterial
            background={bg}
            backside
            backsideThickness={0.4}
            samples={6}
            resolution={512}
            transmission={1}
            thickness={0.9}
            roughness={0.16}
            ior={1.32}
            chromaticAberration={0.035}
            anisotropy={0.25}
            distortion={0.22}
            distortionScale={0.35}
            temporalDistortion={0.06}
            clearcoat={1}
            clearcoatRoughness={0.2}
            color="#EAD9C3"
            attenuationColor="#C4AA87"
            attenuationDistance={1.6}
          />
        ) : (
          <meshPhysicalMaterial
            color="#E6D3BB"
            roughness={0.22}
            metalness={0.05}
            transmission={0.85}
            thickness={0.8}
            ior={1.3}
            clearcoat={1}
            clearcoatRoughness={0.25}
            attenuationColor="#C4AA87"
            attenuationDistance={1.4}
          />
        )}
      </mesh>

      <group ref={laminae}>
        {laminaGeos.map((geo, i) => (
          <mesh key={i} geometry={geo} rotation={[0.3 - i * 0.2, i * 1.9, 0.2 * i]}>
            <meshPhysicalMaterial
              color={i === 1 ? "#9B715F" : "#C4AA87"}
              side={THREE.DoubleSide}
              transparent
              opacity={0.22 - i * 0.045}
              roughness={0.35}
              metalness={0.4}
              clearcoat={0.6}
              depthWrite={false}
            />
          </mesh>
        ))}
      </group>

      <mesh ref={orbit} rotation={[Math.PI / 2.35, 0.25, 0]}>
        <torusGeometry args={[2.15, high ? 0.0035 : 0.005, 6, 220]} />
        <meshBasicMaterial color="#C4AA87" transparent opacity={0.55} />
      </mesh>
    </group>
  );
}
