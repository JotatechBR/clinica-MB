"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { MotionConfig } from "framer-motion";
import { detectTier, type DeviceTier } from "@/lib/device";

type ExperienceContextValue = {
  /** Preloader finalizado — a hero pode iniciar sua coreografia. */
  introDone: boolean;
  completeIntro: () => void;
  /** `null` enquanto o dispositivo ainda não foi avaliado (SSR/hidratação). */
  tier: DeviceTier | null;
  reducedMotion: boolean;
  hasImage: (src: string) => boolean;
};

const ExperienceContext = createContext<ExperienceContextValue | null>(null);

export function ExperienceProvider({
  children,
  availableImages,
}: {
  children: React.ReactNode;
  availableImages: string[];
}) {
  const [introDone, setIntroDone] = useState(false);
  const [tier, setTier] = useState<DeviceTier | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setReducedMotion(mq.matches);
      setTier(detectTier());
    };
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const images = useMemo(() => new Set(availableImages), [availableImages]);
  const hasImage = useCallback((src: string) => images.has(src), [images]);
  const completeIntro = useCallback(() => setIntroDone(true), []);

  const value = useMemo(
    () => ({ introDone, completeIntro, tier, reducedMotion, hasImage }),
    [introDone, completeIntro, tier, reducedMotion, hasImage],
  );

  return (
    <ExperienceContext.Provider value={value}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ExperienceContext.Provider>
  );
}

export function useExperience() {
  const ctx = useContext(ExperienceContext);
  if (!ctx) throw new Error("useExperience deve ser usado dentro de <ExperienceProvider>");
  return ctx;
}
