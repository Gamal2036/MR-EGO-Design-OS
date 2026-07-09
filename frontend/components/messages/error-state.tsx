"use client";

import { AlertCircle, RefreshCw } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { Button } from "@/components/foundation/button";
import { cn } from "@/lib/utils";

interface MessagesErrorStateProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

const MessagesErrorState = forwardRef<HTMLDivElement, MessagesErrorStateProps>(
  (
    { className, title = "Something went wrong", message = "Failed to load messages.", onRetry, ...props },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-col items-center justify-center gap-4 py-16 px-6 text-center", className)}
        role="alert"
        {...props}
      >
        <div className="rounded-full bg-danger/10 p-4">
          <AlertCircle className="h-8 w-8 text-danger" aria-hidden="true" />
        </div>
        <div className="space-y-1 text-center">
          <h3 className="text-heading-4 text-primary">{title}</h3>
          <p className="text-body text-secondary max-w-md">{message}</p>
        </div>
        {onRetry && (
          <Button variant="outline" size="sm" onClick={onRetry} leftIcon={<RefreshCw className="h-4 w-4" />}>
            Try Again
          </Button>
        )}
      </div>
    );
  },
);
MessagesErrorState.displayName = "MessagesErrorState";

export { MessagesErrorState };
export type { MessagesErrorStateProps };
