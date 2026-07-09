"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type TextareaHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const textareaVariants = cva(
  "flex w-full rounded-lg border border-input bg-background px-3 py-2 text-body ring-offset-background transition-all duration-normal placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:border-input disabled:cursor-not-allowed disabled:opacity-50 resize-y min-h-[80px]",
  {
    variants: {
      size: {
        sm: "text-caption",
        md: "text-body",
        lg: "text-body",
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

interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size">,
    VariantProps<typeof textareaVariants> {
  hasError?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, size, hasError, ...props }, ref) => {
    return (
      <textarea
        className={cn(textareaVariants({ size, hasError, className }))}
        ref={ref}
        aria-invalid={hasError ? "true" : undefined}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea, textareaVariants };
export type { TextareaProps };
