"use client";

import { createContext, useContext, type ReactNode } from "react";

interface AIContextValue {
  isReady: boolean;
}

const AIContext = createContext<AIContextValue>({ isReady: false });

export function useAI() {
  return useContext(AIContext);
}

export function AIProvider({ children }: { children: ReactNode }) {
  return (
    <AIContext.Provider value={{ isReady: false }}>
      {children}
    </AIContext.Provider>
  );
}
