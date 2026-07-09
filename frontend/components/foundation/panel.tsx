"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { type HTMLAttributes, type ReactNode, forwardRef } from "react";

import { cn } from "@/lib/utils";

const panelVariants = cva(
  "rounded-xl border bg-surface-1 shadow-soft",
  {
    variants: {
      variant: {
        default: "border-border",
        elevated: "border-border shadow-medium",
        glass: "glass border-glass-border",
        outline: "border-2 border-border bg-transparent shadow-none",
      },
      padding: {
        none: "p-0",
        sm: "p-4",
        md: "p-5",
        lg: "p-6",
        xl: "p-8",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "md",
    },
  }
);

interface PanelProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof panelVariants> {}

const Panel = forwardRef<HTMLDivElement, PanelProps>(
  ({ className, variant, padding, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(panelVariants({ variant, padding, className }))}
        {...props}
      />
    );
  }
);
Panel.displayName = "Panel";

interface PanelHeaderProps extends HTMLAttributes<HTMLDivElement> {
  action?: ReactNode;
}

const PanelHeader = forwardRef<HTMLDivElement, PanelHeaderProps>(
  ({ className, action, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-between gap-4 pb-4 border-b border-border mb-4",
          className
        )}
        {...props}
      >
        <div className="flex-1 min-w-0">
          {typeof children === "string" ? (
            <h4 className="text-heading-4 text-primary">{children}</h4>
          ) : (
            children
          )}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    );
  }
);
PanelHeader.displayName = "PanelHeader";

const PanelBody = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn("", className)} {...props} />;
  }
);
PanelBody.displayName = "PanelBody";

const PanelFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-end gap-3 pt-4 mt-4 border-t border-border",
          className
        )}
        {...props}
      />
    );
  }
);
PanelFooter.displayName = "PanelFooter";

export { Panel, PanelHeader, PanelBody, PanelFooter, panelVariants };
export type { PanelProps, PanelHeaderProps };
