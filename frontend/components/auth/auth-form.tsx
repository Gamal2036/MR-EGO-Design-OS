"use client";

import { type FormHTMLAttributes, type ReactNode, forwardRef } from "react";

import { cn } from "@/lib/utils";

interface AuthFormProps extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
}

const AuthForm = forwardRef<HTMLFormElement, AuthFormProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <form
        ref={ref}
        className={cn("space-y-5", className)}
        noValidate
        {...props}
      >
        {children}
      </form>
    );
  }
);
AuthForm.displayName = "AuthForm";

interface AuthFormActionsProps {
  children: ReactNode;
  className?: string;
}

function AuthFormActions({ children, className }: AuthFormActionsProps) {
  return (
    <div className={cn("flex flex-col gap-3 pt-2", className)}>
      {children}
    </div>
  );
}

export { AuthForm, AuthFormActions };
export type { AuthFormProps, AuthFormActionsProps };
