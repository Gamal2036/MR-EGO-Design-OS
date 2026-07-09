"use client";

import { motion } from "framer-motion";
import {
  type HTMLAttributes,
  type ReactNode,
  forwardRef,
} from "react";

import { cn } from "@/lib/utils";

interface AuthCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  animate?: boolean;
}

const AuthCard = forwardRef<HTMLDivElement, AuthCardProps>(
  ({ className, children, animate = true, ...props }, ref) => {
    if (!animate) {
      return (
        <div
          ref={ref}
          className={cn(
            "w-full rounded-2xl border border-border bg-card text-card-foreground shadow-medium p-6 sm:p-8",
            className
          )}
          {...props}
        >
          {children}
        </div>
      );
    }

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "w-full rounded-2xl border border-border bg-card text-card-foreground shadow-medium p-6 sm:p-8",
          className
        )}
      >
        {children}
      </motion.div>
    );
  }
);
AuthCard.displayName = "AuthCard";

interface AuthCardHeaderProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  className?: string;
}

function AuthCardHeader({ title, description, icon, className }: AuthCardHeaderProps) {
  return (
    <div className={cn("text-center mb-6", className)}>
      {icon && (
        <div className="flex justify-center mb-4" aria-hidden="true">
          {icon}
        </div>
      )}
      <h1 className="text-heading-3 text-primary font-semibold">{title}</h1>
      {description && (
        <p className="text-body text-secondary mt-2">{description}</p>
      )}
    </div>
  );
}

interface AuthCardFooterProps {
  children: ReactNode;
  className?: string;
}

function AuthCardFooter({ children, className }: AuthCardFooterProps) {
  return (
    <div className={cn("mt-6 pt-6 border-t border-border text-center", className)}>
      {children}
    </div>
  );
}

export { AuthCard, AuthCardHeader, AuthCardFooter };
export type { AuthCardProps, AuthCardHeaderProps, AuthCardFooterProps };
