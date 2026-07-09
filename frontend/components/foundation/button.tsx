"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { type ButtonHTMLAttributes, type ReactNode, forwardRef } from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-button font-semibold transition-all duration-normal ease-out-custom focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow-soft hover:bg-primary/90 hover:shadow-medium active:bg-primary/80",
        secondary:
          "bg-secondary text-secondary-foreground shadow-soft hover:bg-secondary/80 hover:shadow-medium active:bg-secondary/70",
        outline:
          "border border-border bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground active:bg-accent/80",
        ghost:
          "bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground active:bg-accent/80",
        danger:
          "bg-danger text-danger-foreground shadow-soft hover:bg-danger/90 hover:shadow-medium active:bg-danger/80",
        success:
          "bg-success text-success-foreground shadow-soft hover:bg-success/90 hover:shadow-medium active:bg-success/80",
        link: "bg-transparent text-link underline-offset-4 hover:underline hover:text-link-hover",
        "outline-danger":
          "border border-danger/30 bg-transparent text-danger hover:bg-danger/10 active:bg-danger/15",
      },
      size: {
        xs: "h-button-xs min-w-button-xs px-3 text-xs rounded-md",
        sm: "h-button-sm min-w-button-sm px-4 text-sm rounded-md",
        md: "h-button-md min-w-button-md px-5 text-sm rounded-lg",
        lg: "h-button-lg min-w-button-lg px-6 text-sm rounded-lg",
        xl: "h-button-xl min-w-button-xl px-8 text-base rounded-xl",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      disabled,
      leftIcon,
      rightIcon,
      children,
      ...props
    },
    ref
  ) => {
    if (asChild) {
      return (
        <Slot
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...(disabled || loading ? { disabled: true, "aria-disabled": true } : {})}
          {...props}
        >
          {children}
        </Slot>
      );
    }

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : leftIcon ? (
          <span className="inline-flex" aria-hidden="true">
            {leftIcon}
          </span>
        ) : null}
        {children}
        {rightIcon && !loading ? (
          <span className="inline-flex" aria-hidden="true">
            {rightIcon}
          </span>
        ) : null}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
export type { ButtonProps };
