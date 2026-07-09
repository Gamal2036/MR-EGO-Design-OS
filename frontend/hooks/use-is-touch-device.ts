"use client";

import { useMediaQuery } from "./use-media-query";

export function useIsTouchDevice(): boolean {
  return useMediaQuery("(pointer: coarse)");
}
