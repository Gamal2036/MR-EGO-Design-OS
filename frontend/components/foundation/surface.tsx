"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { type HTMLAttributes, forwardRef } from "react";

import { cn } from "@/lib/utils";

const surfaceVariants = cva(
  "rounded-xl transition-colors duration-normal",
  {
    variants: {
      level: {
        0: "bg-surface-0",
        1: "bg-surface-1",
        2: "bg-surface-2",
        3: "bg-surface-3",
      },
      border: {
        none: "border-0",
        default: "border border-border",
        subtle: "border border-border/50",
      },
      shadow: {
        none: "shadow-none",
        soft: "shadow-soft",
        medium: "shadow-medium",
        strong: "shadow-strong",
      },
      radius: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        "2xl": "rounded-2xl",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      level: 1,
      border: "none",
      shadow: "none",
      radius: "xl",
    },
  }
);

interface SurfaceProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof surfaceVariants> {}

const Surface = forwardRef<HTMLDivElement, SurfaceProps>(
  ({ className, level, border, shadow, radius, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(surfaceVariants({ level, border, shadow, radius, className }))}
        {...props}
      />
    );
  }
);
Surface.displayName = "Surface";

export { Surface, surfaceVariants };
export type { SurfaceProps };
