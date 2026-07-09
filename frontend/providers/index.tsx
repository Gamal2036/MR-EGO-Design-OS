"use client";

import { type ReactNode } from "react";
import { ThemeProvider } from "./theme-provider";
import { QueryProvider } from "./query-provider";
import { MotionProvider } from "./motion-provider";
import { TooltipProvider } from "./tooltip-provider";
import { AIProvider } from "./ai-provider";
import { CommandProvider } from "./command-provider";
import { ToastProvider } from "./toast-provider";

export { ThemeProvider } from "./theme-provider";
export { QueryProvider } from "./query-provider";
export { MotionProvider } from "./motion-provider";
export { ToastProvider } from "./toast-provider";
export { DialogProvider } from "./dialog-provider";
export { TooltipProvider } from "./tooltip-provider";
export { CommandProvider } from "./command-provider";
export { AIProvider, useAI } from "./ai-provider";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      <QueryProvider>
        <MotionProvider>
          <TooltipProvider>
            <CommandProvider>
              <ToastProvider>
                <AIProvider>
                  {children}
                </AIProvider>
              </ToastProvider>
            </CommandProvider>
          </TooltipProvider>
        </MotionProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}
