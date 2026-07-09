"use client";

import { MotionConfig } from "framer-motion";
import { type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function MotionProvider({ children }: { children: ReactNode }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <MotionConfig
      reducedMotion={shouldReduceMotion ? "always" : "never"}
      transition={{
        type: "tween",
        duration: shouldReduceMotion ? 0.05 : 0.2,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </MotionConfig>
  );
}
