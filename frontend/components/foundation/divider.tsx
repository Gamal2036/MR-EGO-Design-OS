"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { type HTMLAttributes, forwardRef } from "react";

import { cn } from "@/lib/utils";

const dividerVariants = cva(
  "shrink-0 bg-border",
  {
    variants: {
      orientation: {
        horizontal: "w-full",
        vertical: "h-full self-stretch",
      },
      thickness: {
        thin: "",
        medium: "",
        thick: "",
      },
    },
    compoundVariants: [
      { orientation: "horizontal", thickness: "thin", className: "h-px" },
      { orientation: "horizontal", thickness: "medium", className: "h-0.5" },
      { orientation: "horizontal", thickness: "thick", className: "h-1" },
      { orientation: "vertical", thickness: "thin", className: "w-px" },
      { orientation: "vertical", thickness: "medium", className: "w-0.5" },
      { orientation: "vertical", thickness: "thick", className: "w-1" },
    ],
    defaultVariants: {
      orientation: "horizontal",
      thickness: "thin",
    },
  }
);

interface DividerProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dividerVariants> {
  label?: string;
}

const Divider = forwardRef<HTMLDivElement, DividerProps>(
  ({ className, orientation, thickness, label, ...props }, ref) => {
    if (label && orientation !== "vertical") {
      return (
        <div
          ref={ref}
          className={cn("flex items-center gap-3 w-full", className)}
          role="separator"
          aria-orientation="horizontal"
          {...props}
        >
          <div className={cn(dividerVariants({ orientation: "horizontal", thickness }), "flex-1")} />
          <span className="text-caption text-tertiary whitespace-nowrap">{label}</span>
          <div className={cn(dividerVariants({ orientation: "horizontal", thickness }), "flex-1")} />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(dividerVariants({ orientation, thickness, className }))}
        role="separator"
        aria-orientation={orientation === "vertical" ? "vertical" : "horizontal"}
        {...props}
      />
    );
  }
);
Divider.displayName = "Divider";

export { Divider, dividerVariants };
export type { DividerProps };
