"use client";

import { Search, X } from "lucide-react";
import { forwardRef, useCallback, useRef } from "react";

import { cn } from "@/lib/utils";

interface ConversationSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const ConversationSearch = forwardRef<HTMLDivElement, ConversationSearchProps>(
  ({ value, onChange, placeholder = "Search conversations..." }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClear = useCallback(() => {
      onChange("");
      inputRef.current?.focus();
    }, [onChange]);

    return (
      <div ref={ref} className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-tertiary" aria-hidden="true" />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "w-full rounded-lg border border-border bg-surface-1 py-2 pl-9 pr-8",
            "text-body text-primary placeholder:text-tertiary",
            "outline-none transition-colors duration-fast",
            "focus:border-primary/50 focus:ring-1 focus:ring-primary/20",
          )}
          aria-label={placeholder}
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-0.5 text-tertiary hover:text-secondary transition-colors"
            aria-label="Clear search"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    );
  },
);
ConversationSearch.displayName = "ConversationSearch";

export { ConversationSearch };
export type { ConversationSearchProps };
