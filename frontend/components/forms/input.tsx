"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const inputVariants = cva(
  "flex w-full rounded-lg border border-input bg-background px-3 text-body ring-offset-background transition-all duration-normal file:border-0 file:bg-transparent file:text-body file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:border-input disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "h-input-sm text-caption",
        md: "h-input-md text-body",
        lg: "h-input-lg text-body",
      },
      hasError: {
        true: "border-danger focus-visible:ring-danger/30 focus-visible:border-danger",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      hasError: false,
    },
  }
);

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  hasError?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, size, hasError, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ size, hasError, className }))}
        ref={ref}
        aria-invalid={hasError ? "true" : undefined}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input, inputVariants };
export type { InputProps };
