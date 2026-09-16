"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Lightformer, PerformanceMonitor } from "@react-three/drei";
import { Sculpture } from "./sculpture";
import { Particles } from "./particles";
import { stage } from "./stage";
import { cn } from "@/lib/utils";

type Props = { quality: "high" | "mid"; onReady?: () => void };

/**
 * Canvas fixo atrás do conteúdo (z-index 1). Só renderiza quando a escultura
 * participa da narrativa (hero, manifesto, CTA final) e a aba está visível.
 */
export default function ExperienceCanvas({ quality, onReady }: Props) {
  const [visible, setVisible] = useState(stage.visible);
  const [running, setRunning] = useState(stage.visible);
  const [dpr, setDpr] = useState(quality === "high" ? 1.6 : 1.25);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const unsub = stage.subscribe((v) => {
      setVisible(v);
      clearTimeout(timeout);
      if (v) setRunning(!document.hidden);
      else timeout = setTimeout(() => setRunning(false), 900);
    });
    const onVis = () => setRunning(!document.hidden && stage.visible);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      unsub();
      clearTimeout(timeout);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed inset-0 z-[1] transition-opacity duration-[900ms] ease-(--ease-editorial)",
        visible ? "opacity-100" : "opacity-0",
      )}
    >
      <Canvas
        dpr={dpr}
        frameloop={running ? "always" : "never"}
        camera={{ position: [0, 0, 8], fov: 32, near: 0.1, far: 40 }}
        gl={{ antialias: quality === "high", alpha: true, powerPreference: "high-performance", stencil: false }}
        onCreated={() => onReady?.()}
        style={{ pointerEvents: "none" }}
      >
        <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(quality === "high" ? 1.6 : 1.25)} />
        <ambientLight intensity={0.35} color="#F3E6D6" />
        <directionalLight position={[-5, 2, 3]} intensity={2.2} color="#F2CFA6" />
        <directionalLight position={[4, -1, -2]} intensity={0.6} color="#C4AA87" />
        <Suspense fallback={null}>
          <Environment resolution={quality === "high" ? 128 : 64} frames={1}>
            <Lightformer form="rect" intensity={4} color="#F4D7B3" position={[-6, 1, 2]} scale={[3, 8, 1]} rotation-y={Math.PI / 2.4} />
            <Lightformer form="rect" intensity={1.4} color="#FFF6EA" position={[0, 6, 0]} scale={[10, 2, 1]} rotation-x={Math.PI / 2} />
            <Lightformer form="ring" intensity={1.6} color="#C4AA87" position={[5, -1, -3]} scale={3} />
          </Environment>
          <Sculpture quality={quality} />
        </Suspense>
        <Particles count={quality === "high" ? 320 : 110} />
      </Canvas>
    </div>
  );
}
