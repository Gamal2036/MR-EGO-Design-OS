"use client";

import { Eye, EyeOff } from "lucide-react";
import { forwardRef, type ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface PasswordVisibilityToggleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  visible: boolean;
}

const PasswordVisibilityToggle = forwardRef<HTMLButtonElement, PasswordVisibilityToggleProps>(
  ({ className, visible, onClick, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "absolute right-3 top-1/2 -translate-y-1/2 text-tertiary hover:text-secondary transition-colors rounded-md p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          className
        )}
        onClick={onClick}
        tabIndex={-1}
        aria-label={visible ? "Hide password" : "Show password"}
        {...props}
      >
        {visible ? (
          <EyeOff className="h-4 w-4" aria-hidden="true" />
        ) : (
          <Eye className="h-4 w-4" aria-hidden="true" />
        )}
      </button>
    );
  }
);
PasswordVisibilityToggle.displayName = "PasswordVisibilityToggle";

export { PasswordVisibilityToggle };
export type { PasswordVisibilityToggleProps };
