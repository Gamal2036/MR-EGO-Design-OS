"use client";

import { CheckCircle2 } from "lucide-react";
import { type ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SuccessMessageProps {
  title: string;
  message?: string;
  children?: ReactNode;
  icon?: ReactNode;
  className?: string;
}

export function SuccessMessage({
  title,
  message,
  children,
  icon,
  className,
}: SuccessMessageProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center text-center py-6",
        className
      )}
    >
      <div className="mb-4" aria-hidden="true">
        {icon || (
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
            <CheckCircle2 className="h-8 w-8 text-success" />
          </div>
        )}
      </div>
      <h2 className="text-heading-4 text-primary font-semibold mb-2">{title}</h2>
      {message && (
        <p className="text-body text-secondary max-w-sm">{message}</p>
      )}
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}
