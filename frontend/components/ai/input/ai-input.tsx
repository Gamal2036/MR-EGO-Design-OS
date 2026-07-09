"use client";

import {
  Image,
  Mic,
  Paperclip,
  SendHorizonal,
  Square,
  Zap,
} from "lucide-react";
import {
  type KeyboardEvent,
  type DragEvent,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { CharacterCounter } from "./character-counter";
import { PromptTemplates } from "./prompt-templates";

import { IconButton } from "@/components/foundation/icon-button";
import { cn } from "@/lib/utils";
import { useAIWorkspaceStore } from "@/stores/ai-workspace-store";

interface AIInputProps {
  onSend?: (content: string) => void;
  onStop?: () => void;
  placeholder?: string;
  maxLength?: number;
}

const AIInput = forwardRef<HTMLTextAreaElement, AIInputProps>(
  ({ onSend, onStop, placeholder = "Ask MR:EGO AI anything...", maxLength = 32000 }, ref) => {
    const { isGenerating } = useAIWorkspaceStore();
    const [value, setValue] = useState("");
    const [isDragging, setIsDragging] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const inputRef = ref || textareaRef;

    const adjustHeight = useCallback(() => {
      const el = typeof inputRef === "function" ? null : (inputRef?.current ?? textareaRef.current);
      if (!el) return;
      el.style.height = "auto";
      const scrollHeight = el.scrollHeight;
      el.style.height = `${Math.min(Math.max(scrollHeight, 44), 200)}px`;
    }, [inputRef]);

    useEffect(() => {
      adjustHeight();
    }, [value, adjustHeight]);

    const handleSubmit = useCallback(() => {
      const trimmed = value.trim();
      if (!trimmed || isGenerating) return;
      onSend?.(trimmed);
      setValue("");
    }, [value, isGenerating, onSend]);

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

    const handlePaste = useCallback(
      async (e: React.ClipboardEvent) => {
        const items = Array.from(e.clipboardData.items);
        const hasFiles = items.some(
          (item) => item.kind === "file",
        );
        if (hasFiles) {
          e.preventDefault();
        }
      },
      [],
    );

    const handleDragOver = useCallback((e: DragEvent) => {
      e.preventDefault();
      setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback(() => {
      setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e: DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
      }
    }, []);

    const handlePromptSelect = useCallback(
      (prompt: string) => {
        setValue(prompt);
        if (textareaRef.current) {
          textareaRef.current.focus();
        }
      },
      [],
    );

    const handleSlashCommand = useCallback(
      (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "/" && !e.shiftKey && !e.ctrlKey && !e.metaKey && value === "") {
          e.preventDefault();
        }
      },
      [value],
    );

    return (
      <div
        className={cn(
          "relative border-t border-border bg-surface-0 px-4 pb-3 pt-2",
        )}
      >
        <div
          className={cn(
            "relative mx-auto flex max-w-3xl flex-col rounded-xl border bg-surface-1 transition-colors duration-fast",
            "focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/20",
            isDragging && "border-primary border-dashed bg-primary/5",
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <textarea
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              handleKeyDown(e);
              handleSlashCommand(e);
            }}
            onPaste={handlePaste}
            placeholder={placeholder}
            maxLength={maxLength}
            disabled={isGenerating}
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

          {isDragging && (
            <div
              className="absolute inset-0 flex items-center justify-center rounded-xl bg-primary/5"
              aria-hidden="true"
            >
              <span className="text-label font-medium text-primary">
                Drop files here
              </span>
            </div>
          )}
        </div>

        <div className="mx-auto mt-2 flex max-w-3xl items-center justify-between">
          <div className="flex items-center gap-1">
            <IconButton
              icon={Paperclip}
              variant="ghost"
              size="sm"
              label="Attach file"
              disabled={isGenerating}
            />
            <IconButton
              icon={Image}
              variant="ghost"
              size="sm"
              label="Attach image"
              disabled={isGenerating}
            />
            <IconButton
              icon={Mic}
              variant="ghost"
              size="sm"
              label="Voice input (coming soon)"
              disabled
              aria-disabled="true"
            />

            <div className="ml-2 flex items-center gap-1">
              <PromptTemplates onSelect={handlePromptSelect} />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <CharacterCounter current={value.length} max={maxLength} />
            {isGenerating ? (
              <button
                type="button"
                onClick={onStop}
                className="inline-flex items-center gap-1.5 rounded-lg bg-danger/10 px-3 py-1.5 text-label font-medium text-danger transition-colors hover:bg-danger/20"
                aria-label="Stop generation"
              >
                <Square className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                Stop
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!value.trim()}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-label font-medium transition-all duration-fast",
                  value.trim()
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-neutral-100 text-tertiary dark:bg-neutral-800",
                )}
                aria-label="Send message"
              >
                <SendHorizonal className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="hidden sm:inline">Send</span>
              </button>
            )}
          </div>
        </div>

        <div className="mx-auto flex max-w-3xl items-center justify-between px-1 pt-1">
          <div className="flex items-center gap-1">
            <kbd
              className="hidden items-center gap-0.5 rounded border border-border bg-background px-1.5 py-0.5 text-smallest text-tertiary md:inline-flex"
              aria-hidden="true"
            >
              <Zap className="h-3 w-3" />
              <span>/</span>
            </kbd>
            <span className="hidden text-smallest text-tertiary md:inline">Slash commands</span>
          </div>
          <span className="text-smallest text-tertiary">
            <kbd className="rounded border border-border px-1 py-0.5 text-smallest" aria-hidden="true">
              Enter
            </kbd>
            <span className="mx-1">to send,</span>
            <kbd className="rounded border border-border px-1 py-0.5 text-smallest" aria-hidden="true">
              Shift+Enter
            </kbd>
            <span className="mx-1">for new line</span>
          </span>
        </div>
      </div>
    );
  },
);
AIInput.displayName = "AIInput";

export { AIInput };
export type { AIInputProps };
