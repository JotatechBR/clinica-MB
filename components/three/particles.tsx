"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function Particles({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    let seed = 7;
    const rand = () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };
    for (let i = 0; i < count; i++) {
      const r = 1.7 + rand() * 2.2;
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta) * 1.4;
      positions[i * 3 + 1] = r * Math.cos(phi);
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
    }
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, [count]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.015;
    ref.current.rotation.z += delta * 0.006;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial size={0.018} sizeAttenuation color="#E8D3B5" transparent opacity={0.55} depthWrite={false} />
    </points>
  );
}
