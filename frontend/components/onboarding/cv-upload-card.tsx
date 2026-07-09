"use client";

import { motion } from "framer-motion";
import { FileText, Upload } from "lucide-react";
import { useId, useRef, useState } from "react";

import { Badge } from "@/components/foundation/badge";
import { cn } from "@/lib/utils";

interface CVUploadCardProps {
  value: File | null;
  onChange: (file: File | null) => void;
  className?: string;
}

export function CVUploadCard({
  value,
  onChange,
  className,
}: CVUploadCardProps) {
  const formId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file && isValidFile(file)) {
      onChange(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(file);
    }
  };

  const isValidFile = (file: File) => {
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    return validTypes.includes(file.type);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(0)} KB`;
    }
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className={cn("space-y-4", className)}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          role="button"
          tabIndex={0}
          aria-label="Upload your CV"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              inputRef.current?.click();
            }
          }}
          className={cn(
            "relative flex flex-col items-center justify-center gap-3 p-8 md:p-12 rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-normal",
            isDragging
              ? "border-primary bg-primary/5 scale-[1.02]"
              : value
                ? "border-success bg-success/5"
                : "border-border hover:border-primary/50 hover:bg-primary/5"
          )}
        >
          <input
            ref={inputRef}
            id={`${formId}-cv`}
            type="file"
            accept=".pdf,.doc,.docx"
            className="sr-only"
            onChange={handleFileSelect}
            aria-hidden="true"
          />

          {value ? (
            <>
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-success/10">
                <FileText className="h-7 w-7 text-success" aria-hidden="true" />
              </div>
              <div className="text-center">
                <p className="text-label font-semibold text-primary">
                  {value.name}
                </p>
                <p className="text-caption text-secondary mt-0.5">
                  {formatFileSize(value.size)}
                </p>
              </div>
              <Badge variant="success" size="sm">
                Uploaded
              </Badge>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange(null);
                  if (inputRef.current) inputRef.current.value = "";
                }}
                className="text-caption text-danger hover:text-danger-600 underline transition-colors"
              >
                Remove and re-upload
              </button>
            </>
          ) : (
            <>
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <Upload className="h-7 w-7 text-primary" aria-hidden="true" />
              </div>
              <div className="text-center">
                <p className="text-label font-semibold text-primary">
                  Drop your CV here or click to browse
                </p>
                <p className="text-caption text-secondary mt-1">
                  Supports PDF, DOC, DOCX &mdash; Max 10MB
                </p>
              </div>
              <Badge variant="outline" size="sm">
                Optional
              </Badge>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
