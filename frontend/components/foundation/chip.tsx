"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import { type ButtonHTMLAttributes, type ReactNode, forwardRef } from "react";

import { cn } from "@/lib/utils";

const chipVariants = cva(
  "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full font-medium transition-all duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        primary: "bg-primary/10 text-primary border border-primary/20 hover:bg-primary/15",
        secondary: "bg-secondary text-secondary-foreground border border-border hover:bg-secondary/80",
        success: "bg-success/10 text-success border border-success/20 hover:bg-success/15",
        warning: "bg-warning/10 text-warning border border-warning/20 hover:bg-warning/15",
        danger: "bg-danger/10 text-danger border border-danger/20 hover:bg-danger/15",
        info: "bg-info/10 text-info border border-info/20 hover:bg-info/15",
        neutral: "bg-neutral-100 text-neutral-700 border border-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-700",
        outline: "bg-transparent text-foreground border border-border hover:bg-accent",
        ai: "bg-ai/10 text-ai border border-ai/20 hover:bg-ai/15",
      },
      size: {
        sm: "px-2 py-0.5 text-caption",
        md: "px-3 py-1 text-label",
        lg: "px-4 py-1.5 text-body-small",
      },
    },
    defaultVariants: {
      variant: "neutral",
      size: "md",
    },
  }
);

interface ChipProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof chipVariants> {
  onRemove?: () => void;
  icon?: ReactNode;
  removable?: boolean;
}

const Chip = forwardRef<HTMLButtonElement, ChipProps>(
  ({ className, variant, size, onRemove, icon, removable, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(chipVariants({ variant, size, className }))}
        type="button"
        {...props}
      >
        {icon && <span className="inline-flex" aria-hidden="true">{icon}</span>}
        <span>{children}</span>
        {removable && (
          <span
            role="button"
            tabIndex={0}
            className="inline-flex ml-0.5 rounded-full p-0.5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onRemove?.();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onRemove?.();
              }
            }}
            aria-label="Remove"
          >
            <X className="h-3 w-3" aria-hidden="true" />
          </span>
        )}
      </button>
    );
  }
);
Chip.displayName = "Chip";

export { Chip, chipVariants };
export type { ChipProps };
