"use client";

import { Image, Mic, Paperclip, SendHorizonal, Smile, Zap } from "lucide-react";
import {
  type HTMLAttributes,
  type KeyboardEvent,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { IconButton } from "@/components/foundation/icon-button";
import { cn } from "@/lib/utils";

interface MessageComposerProps extends HTMLAttributes<HTMLDivElement> {
  onSend?: (content: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

const MessageComposer = forwardRef<HTMLDivElement, MessageComposerProps>(
  ({ className, onSend, placeholder = "Type a message...", disabled = false, ...props }, ref) => {
    const [value, setValue] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const adjustHeight = useCallback(() => {
      const el = textareaRef.current;
      if (!el) return;
      el.style.height = "auto";
      const scrollHeight = el.scrollHeight;
      el.style.height = `${Math.min(Math.max(scrollHeight, 44), 200)}px`;
    }, []);

    useEffect(() => {
      adjustHeight();
    }, [value, adjustHeight]);

    const handleSubmit = useCallback(() => {
      const trimmed = value.trim();
      if (!trimmed || disabled) return;
      onSend?.(trimmed);
      setValue("");
    }, [value, disabled, onSend]);

    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          handleSubmit();
        }
        if (e.key === "Escape") {
          e.preventDefault();
          (e.target as HTMLTextAreaElement).blur();
        }
      },
      [handleSubmit],
    );

    return (
      <div
        ref={ref}
        className={cn("border-t border-border bg-surface-0 px-4 pb-3 pt-2", className)}
        {...props}
      >
        <div
          className={cn(
            "relative mx-auto flex max-w-3xl flex-col rounded-xl border bg-surface-1 transition-colors duration-fast",
            "focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/20",
            disabled && "opacity-50",
          )}
        >
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className={cn(
              "w-full resize-none bg-transparent px-4 py-3 text-body text-primary",
              "placeholder:text-tertiary",
              "outline-none",
              "disabled:opacity-50",
            )}
            aria-label="Message input"
            aria-multiline="true"
          />
        </div>

        <div className="mx-auto mt-2 flex max-w-3xl items-center justify-between">
          <div className="flex items-center gap-1">
            <IconButton
              icon={Paperclip}
              variant="ghost"
              size="sm"
              label="Attach file"
              disabled={disabled}
            />
            <IconButton
              icon={Image}
              variant="ghost"
              size="sm"
              label="Attach image"
              disabled={disabled}
            />
            <IconButton
              icon={Smile}
              variant="ghost"
              size="sm"
              label="Add emoji"
              disabled={disabled}
            />
            <IconButton
              icon={Mic}
              variant="ghost"
              size="sm"
              label="Voice message"
              disabled
              aria-disabled="true"
            />
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!value.trim() || disabled}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg px-4 py-1.5 text-label font-medium transition-all duration-fast",
              value.trim() && !disabled
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "bg-neutral-100 text-tertiary dark:bg-neutral-800",
            )}
            aria-label="Send message"
          >
            <SendHorizonal className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Send</span>
          </button>
        </div>

        <div className="mx-auto mt-1 flex max-w-3xl items-center justify-between px-1">
          <div className="flex items-center gap-1">
            <kbd
              className="hidden items-center gap-0.5 rounded border border-border bg-background px-1.5 py-0.5 text-smallest text-tertiary md:inline-flex"
              aria-hidden="true"
            >
              <Zap className="h-3 w-3" />
              <span>/</span>
            </kbd>
            <span className="hidden text-smallest text-tertiary md:inline">Templates</span>
          </div>
          <span className="text-smallest text-tertiary">
            <kbd className="rounded border border-border px-1 py-0.5 text-smallest" aria-hidden="true">Enter</kbd>
            <span className="mx-1">to send,</span>
            <kbd className="rounded border border-border px-1 py-0.5 text-smallest" aria-hidden="true">Shift+Enter</kbd>
            <span className="mx-1">for new line</span>
          </span>
        </div>
      </div>
    );
  },
);
MessageComposer.displayName = "MessageComposer";

export { MessageComposer };
export type { MessageComposerProps };
