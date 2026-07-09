"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { Button } from "@/components/foundation/button";
import { cn } from "@/lib/utils";

interface JobErrorStateProps extends HTMLAttributes<HTMLDivElement> {
  message?: string;
  onRetry?: () => void;
}

const JobErrorState = forwardRef<HTMLDivElement, JobErrorStateProps>(
  ({ className, message = "Something went wrong while loading jobs. Please try again.", onRetry, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center py-16 px-6 text-center",
          className
        )}
        role="alert"
        {...props}
      >
        <div
          className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-danger/10"
          aria-hidden="true"
        >
          <AlertTriangle className="h-8 w-8 text-danger" />
        </div>

        <h3 className="text-heading-4 text-primary mb-2">Error Loading Jobs</h3>

        <p className="text-body text-secondary max-w-md mb-6">{message}</p>

        {onRetry && (
          <Button
            variant="outline"
            size="sm"
            onClick={onRetry}
            leftIcon={<RefreshCw className="h-4 w-4" />}
          >
            Try Again
          </Button>
        )}
      </div>
    );
  }
);
JobErrorState.displayName = "JobErrorState";

export { JobErrorState };
export type { JobErrorStateProps };
