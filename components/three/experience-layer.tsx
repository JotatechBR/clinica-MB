"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useExperience } from "@/components/providers/experience-provider";
import { ScrollTrigger } from "@/lib/gsap";
import { stage } from "./stage";

const ExperienceCanvas = dynamic(() => import("./experience-canvas"), { ssr: false, loading: () => null });

/**
 * Orquestra a escultura 3D: decide se o WebGL será carregado (tier do dispositivo),
 * conecta ScrollTrigger + ponteiro + giroscópio ao estado da cena.
 */
export function ExperienceLayer() {
  const { tier, introDone } = useExperience();
  const [mount, setMount] = useState(false);
  const enabled = tier === "high" || tier === "mid";

  // Carrega o canvas somente após o preloader e em momento ocioso.
  useEffect(() => {
    if (!enabled || !introDone) return;
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(() => setMount(true), { timeout: 1200 });
      return () => (window as Window & { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback?.(id);
    }
    const t = setTimeout(() => setMount(true), 300);
    return () => clearTimeout(t);
  }, [enabled, introDone]);

  // Rolagem → progresso das fases
  useEffect(() => {
    if (!enabled) return;
    if (process.env.NODE_ENV !== "production") (window as unknown as { __mbStage: typeof stage }).__mbStage = stage;
    const updateVisibility = () => {
      stage.setVisible(stage.hero < 1 || stage.manifestoActive || stage.ctaActive);
    };

    const triggers = [
      ScrollTrigger.create({
        trigger: "#inicio",
        start: "top top",
        end: "bottom top",
        onUpdate: (self) => {
          stage.hero = self.progress;
          stage.velocity = Math.min(1, Math.abs(self.getVelocity()) / 3000);
          updateVisibility();
        },
      }),
      ScrollTrigger.create({
        trigger: "#manifesto",
        start: "top 60%",
        end: "bottom bottom",
        onUpdate: (self) => {
          stage.manifesto = self.progress;
        },
        onToggle: (self) => {
          stage.manifestoActive = self.isActive;
          updateVisibility();
        },
      }),
      ScrollTrigger.create({
        trigger: "#cta-final",
        start: "top 85%",
        end: "bottom 45%",
        onUpdate: (self) => {
          stage.cta = self.progress;
        },
        onToggle: (self) => {
          stage.ctaActive = self.isActive;
          updateVisibility();
        },
      }),
    ];

    return () => triggers.forEach((t) => t.kill());
  }, [enabled]);

  // Ponteiro, toque e giroscópio (somente quando não exige permissão)
  useEffect(() => {
    if (!enabled) return;
    const onPointer = (e: PointerEvent) => {
      stage.pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      stage.pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    let onOrient: ((e: DeviceOrientationEvent) => void) | null = null;
    const DOE = window.DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> } | undefined;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (coarse && DOE && typeof DOE.requestPermission !== "function") {
      onOrient = (e) => {
        if (e.gamma == null || e.beta == null) return;
        stage.pointer.x = Math.max(-1, Math.min(1, e.gamma / 35));
        stage.pointer.y = Math.max(-1, Math.min(1, (e.beta - 45) / 45));
      };
      window.addEventListener("deviceorientation", onOrient, { passive: true });
    }

    return () => {
      window.removeEventListener("pointermove", onPointer);
      if (onOrient) window.removeEventListener("deviceorientation", onOrient);
    };
  }, [enabled]);

  if (!mount || (tier !== "high" && tier !== "mid")) return null;
  return (
    <ExperienceCanvas
      quality={tier}
      onReady={() => document.documentElement.classList.add("webgl-ready")}
    />
  );
}
