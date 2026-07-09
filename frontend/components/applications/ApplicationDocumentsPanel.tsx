"use client";

import { FileText, File, Upload, FolderOpen } from "lucide-react";
import Link from "next/link";
import type { HTMLAttributes } from "react";

import type { ApplicationDocument } from "@/types/application-tracker";

interface ApplicationDocumentsPanelProps extends HTMLAttributes<HTMLDivElement> {
  documents: ApplicationDocument[];
}

const DOC_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  cv: FileText,
  "cover-letter": FileText,
  portfolio: File,
  certification: File,
  other: File,
};

const DOC_LABELS: Record<string, string> = {
  cv: "CV",
  "cover-letter": "Cover Letter",
  portfolio: "Portfolio",
  certification: "Certification",
  other: "Document",
};

export function ApplicationDocumentsPanel({
  documents,
  className,
  ...props
}: ApplicationDocumentsPanelProps) {
  return (
    <div className={`space-y-3 ${className || ""}`} {...props}>
      <h4 className="text-label text-primary">Documents</h4>

      {documents.length === 0 ? (
        <div className="rounded-lg border-2 border-dashed border-border p-6 text-center">
          <Upload className="mx-auto h-6 w-6 text-tertiary mb-2" aria-hidden="true" />
          <p className="text-caption text-tertiary">No documents uploaded</p>
          <Link
            href="/dashboard/documents"
            className="inline-flex items-center gap-1.5 text-smallest text-primary hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:rounded mt-2"
          >
            <FolderOpen className="h-3.5 w-3.5" aria-hidden="true" />
            Open Documents Center
          </Link>
        </div>
      ) : (
        <div className="space-y-2" role="list" aria-label="Application documents">
          {documents.map((doc) => {
            const Icon = DOC_ICONS[doc.type] || File;
            return (
              <div
                key={doc.id}
                className="flex items-center gap-3 rounded-lg border border-border bg-surface-0 px-3 py-2.5"
                role="listitem"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
                  <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-caption text-primary truncate">{doc.name}</p>
                  <p className="text-smallest text-tertiary">
                    {DOC_LABELS[doc.type] || "Document"} &middot; {doc.uploadedAt}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
