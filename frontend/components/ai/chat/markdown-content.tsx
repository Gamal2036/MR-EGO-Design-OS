"use client";

import {
  Check,
  Copy,
  FileCode2,
  FileImage,
  Terminal,
} from "lucide-react";
import { useCallback, useMemo, useState } from "react";

import { cn } from "@/lib/utils";

interface MarkdownContentProps {
  content: string;
  className?: string;
}

function CodeBlock({ language, code }: { language: string; code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  return (
    <div className="my-3 overflow-hidden rounded-lg border border-border bg-surface-2">
      <div className="flex items-center justify-between border-b border-border bg-surface-1 px-3 py-1.5">
        <div className="flex items-center gap-1.5">
          <Terminal className="h-3.5 w-3.5 text-tertiary" aria-hidden="true" />
          <span className="text-smallest font-medium text-tertiary">
            {language || "code"}
          </span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-smallest text-tertiary transition-colors hover:text-secondary"
          aria-label={copied ? "Copied" : "Copy code"}
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 text-success" aria-hidden="true" />
              <span className="text-success">Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" aria-hidden="true" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="overflow-x-auto p-3">
        <code className="text-code text-primary font-mono">{code}</code>
      </pre>
    </div>
  );
}

function InlineCode({ code }: { code: string }) {
  return (
    <code className="rounded bg-surface-2 px-1.5 py-0.5 text-code font-mono text-ai">
      {code}
    </code>
  );
}

function ImagePlaceholder({ alt }: { alt: string }) {
  return (
    <div className="my-2 flex items-center gap-2 rounded-lg border border-dashed border-border bg-surface-1 px-3 py-2">
      <FileImage className="h-4 w-4 text-tertiary" aria-hidden="true" />
      <span className="text-caption text-tertiary">Image: {alt}</span>
    </div>
  );
}

function FilePlaceholder({ name }: { name: string }) {
  const ext = name.split(".").pop() ?? "";
  return (
    <div className="my-2 inline-flex items-center gap-2 rounded-lg border border-border bg-surface-1 px-3 py-2">
      <FileCode2 className="h-4 w-4 text-tertiary" aria-hidden="true" />
      <span className="text-caption text-secondary">{name}</span>
      <span className="text-smallest text-tertiary">.{ext}</span>
    </div>
  );
}

const IMAGE_PATTERN = /!\[([^\]]*)\]\(([^)]+)\)/g;
const FILE_PATTERN = /\[FILE:([^\]]+)\]/g;
const CODE_BLOCK_PATTERN = /```(\w*)\n([\s\S]*?)```/g;
const INLINE_CODE_PATTERN = /`([^`]+)`/g;

export function MarkdownContent({ content, className }: MarkdownContentProps) {
  const parts = useMemo(() => {
    const segments: Array<{ type: "text" | "code-block" | "image" | "file"; content: string; language?: string }> = [];
    let remaining = content;

    while (remaining.length > 0) {
      const codeMatch = CODE_BLOCK_PATTERN.exec(content);
      const imageMatch = IMAGE_PATTERN.exec(content);
      const fileMatch = FILE_PATTERN.exec(content);

      if (codeMatch && (codeMatch.index ?? 0) <= (imageMatch?.index ?? Infinity) && (codeMatch.index ?? 0) <= (fileMatch?.index ?? Infinity)) {
        segments.push({ type: "code-block", content: codeMatch[2] ?? "", language: codeMatch[1] ?? "" });
        remaining = remaining.slice((codeMatch.index ?? 0) + codeMatch[0].length);
      } else if (imageMatch && (imageMatch.index ?? 0) <= (fileMatch?.index ?? Infinity)) {
        segments.push({ type: "image", content: imageMatch[2] ?? "", language: imageMatch[1] ?? "" });
        remaining = remaining.slice((imageMatch.index ?? 0) + imageMatch[0].length);
      } else if (fileMatch) {
        segments.push({ type: "file", content: fileMatch[1] ?? "" });
        remaining = remaining.slice((fileMatch.index ?? 0) + fileMatch[0].length);
      } else {
        segments.push({ type: "text", content: remaining });
        break;
      }
    }

    return segments;
  }, [content]);

  return (
    <div className={cn("space-y-1", className)}>
      {parts.map((part, i) => {
        switch (part.type) {
          case "code-block":
            return <CodeBlock key={i} language={part.language ?? ""} code={part.content} />;
          case "image":
            return <ImagePlaceholder key={i} alt={part.language ?? ""} />;
          case "file":
            return <FilePlaceholder key={i} name={part.content} />;
          default:
            return <TextSegment key={i} text={part.content} />;
        }
      })}
    </div>
  );
}

function TextSegment({ text }: { text: string }) {
  const segments = useMemo(() => {
    const parts: Array<{ type: "text" | "inline-code"; content: string }> = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    const re = new RegExp(INLINE_CODE_PATTERN.source, "g");
    while ((match = re.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push({ type: "text", content: text.slice(lastIndex, match.index) });
      }
      parts.push({ type: "inline-code", content: match[1] ?? "" });
      lastIndex = match.index + match[0].length;
    }
    if (lastIndex < text.length) {
      parts.push({ type: "text", content: text.slice(lastIndex) });
    }
    return parts;
  }, [text]);

  return (
    <span className="whitespace-pre-wrap break-words">
      {segments.map((seg, i) =>
        seg.type === "inline-code" ? (
          <InlineCode key={i} code={seg.content} />
        ) : (
          <span key={i}>{seg.content}</span>
        ),
      )}
    </span>
  );
}
