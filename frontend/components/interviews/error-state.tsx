"use client";

import { type HTMLAttributes, forwardRef } from "react";

import { ErrorState } from "@/components/feedback/error-state";

interface InterviewErrorStateProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

const InterviewErrorState = forwardRef<HTMLDivElement, InterviewErrorStateProps>(
  ({ className, title, message, onRetry, ...props }, ref) => {
    return (
      <div ref={ref} className={className} {...props}>
        <ErrorState title={title} message={message} onRetry={onRetry} />
      </div>
    );
  },
);
InterviewErrorState.displayName = "InterviewErrorState";

export { InterviewErrorState };
export type { InterviewErrorStateProps };
