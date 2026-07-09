"use client";

import { TooltipProvider as TooltipPrimitiveProvider } from "@radix-ui/react-tooltip";
import { type ReactNode } from "react";

export function TooltipProvider({ children }: { children: ReactNode }) {
  return (
    <TooltipPrimitiveProvider delayDuration={300} skipDelayDuration={100}>
      {children}
    </TooltipPrimitiveProvider>
  );
}
