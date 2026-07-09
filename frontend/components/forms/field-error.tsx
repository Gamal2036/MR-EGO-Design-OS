"use client";

import { AlertCircle } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { cn } from "@/lib/utils";

interface FieldErrorProps extends HTMLAttributes<HTMLParagraphElement> {
  message?: string;
}

const FieldError = forwardRef<HTMLParagraphElement, FieldErrorProps>(
  ({ className, message, children, ...props }, ref) => {
    if (!message && !children) return null;

    return (
      <p
        ref={ref}
        className={cn(
          "text-caption text-danger flex items-center gap-1 mt-1",
          className
        )}
        role="alert"
        {...props}
      >
        <AlertCircle className="h-3 w-3 shrink-0" aria-hidden="true" />
        <span>{message || children}</span>
      </p>
    );
  }
);
FieldError.displayName = "FieldError";

export { FieldError };
export type { FieldErrorProps };
