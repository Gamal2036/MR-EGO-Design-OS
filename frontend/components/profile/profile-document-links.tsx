"use client";

import { FileText, FolderOpen, Plus } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { Button } from "@/components/foundation/button";
import { Panel, PanelBody, PanelHeader } from "@/components/foundation/panel";
import { cn } from "@/lib/utils";
import type { ProfileDocument } from "@/types/profile";

interface ProfileDocumentLinksProps extends HTMLAttributes<HTMLDivElement> {
  documents: ProfileDocument[];
}

const typeIcon: Record<string, string> = {
  pdf: "text-danger",
  docx: "text-info",
  doc: "text-info",
};

const ProfileDocumentLinks = forwardRef<HTMLDivElement, ProfileDocumentLinksProps>(
  ({ className, documents, ...props }, ref) => {
    return (
      <Panel
        ref={ref}
        variant="default"
        padding="md"
        className={cn("", className)}
        role="region"
        aria-label="Linked Documents"
        {...props}
      >
        <PanelHeader
          action={
            <Button
              variant="ghost"
              size="xs"
              leftIcon={<Plus className="h-3 w-3" />}
              disabled
              title="Coming Soon"
            >
              Add
            </Button>
          }
        >
          <h2 className="text-heading-4 text-primary">Linked Documents</h2>
        </PanelHeader>
        <PanelBody>
          {documents.length > 0 ? (
            <div className="space-y-2">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center gap-3 rounded-lg border border-border bg-surface-0 p-3"
                >
                  <div
                    className={cn(
                      "rounded-lg p-2",
                      typeIcon[doc.type] || "text-primary"
                    )}
                    aria-hidden="true"
                  >
                    <FileText className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-body-small font-medium text-primary truncate">
                      {doc.name}
                    </p>
                    <p className="text-smallest text-tertiary">
                      {doc.type.toUpperCase()} · Updated {doc.lastUpdated}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center py-6 text-center">
              <FolderOpen className="h-8 w-8 text-tertiary mb-2" aria-hidden="true" />
              <p className="text-body-small text-tertiary">No documents linked</p>
              <p className="text-smallest text-tertiary mt-1">
                Link documents from the Documents Center
              </p>
            </div>
          )}
        </PanelBody>
      </Panel>
    );
  }
);
ProfileDocumentLinks.displayName = "ProfileDocumentLinks";

export { ProfileDocumentLinks };
export type { ProfileDocumentLinksProps };
