"use client";

import { CommandMenu } from "@/components/ui/command-menu";
import { type ReactNode } from "react";

export function CommandProvider({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <CommandMenu />
    </>
  );
}
