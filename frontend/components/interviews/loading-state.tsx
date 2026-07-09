"use client";

import { type HTMLAttributes, forwardRef } from "react";

import { LoadingState } from "@/components/feedback/loading-state";

interface InterviewLoadingStateProps extends HTMLAttributes<HTMLDivElement> {
  message?: string;
}

const InterviewLoadingState = forwardRef<HTMLDivElement, InterviewLoadingStateProps>(
  ({ className, message = "Loading interviews...", ...props }, ref) => {
    return (
      <div ref={ref} className={className} {...props}>
        <LoadingState message={message} />
      </div>
    );
  },
);
InterviewLoadingState.displayName = "InterviewLoadingState";

export { InterviewLoadingState };
export type { InterviewLoadingStateProps };
