"use client";

import { Search } from "lucide-react";
import { forwardRef, type HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface InterviewSearchProps extends Omit<HTMLAttributes<HTMLInputElement>, "onChange"> {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
}

const InterviewSearch = forwardRef<HTMLInputElement, InterviewSearchProps>(
  ({ className, value, onValueChange, placeholder = "Search interviews...", ...props }, ref) => {
    return (
      <div className={cn("relative", className)}>
        <Search
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-tertiary"
          aria-hidden="true"
        />
        <input
          ref={ref}
          type="search"
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          placeholder={placeholder}
          className="h-9 w-full rounded-lg border border-border bg-surface-1 pl-9 pr-3 text-body-small text-primary placeholder:text-tertiary transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          aria-label="Search interviews"
          {...props}
        />
      </div>
    );
  },
);
InterviewSearch.displayName = "InterviewSearch";

export { InterviewSearch };
export type { InterviewSearchProps };
