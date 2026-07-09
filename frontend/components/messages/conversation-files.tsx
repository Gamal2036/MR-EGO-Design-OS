"use client";

import { FileText, Image } from "lucide-react";
import { forwardRef } from "react";

interface ConversationFilesProps {
  files?: { id: string; name: string; type: "file" | "image"; size?: string }[];
}

const ConversationFiles = forwardRef<HTMLDivElement, ConversationFilesProps>(
  ({ files }, ref) => {
    if (!files || files.length === 0) {
      return (
        <div ref={ref} className="flex flex-col gap-2">
          <h4 className="text-caption font-medium text-secondary px-3">Files</h4>
          <p className="text-smallest text-tertiary px-3">No shared files</p>
        </div>
      );
    }

    return (
      <div ref={ref} className="flex flex-col gap-2">
        <h4 className="text-caption font-medium text-secondary px-3">Files</h4>
        <div className="flex flex-col gap-1 px-2">
          {files.map((file) => (
            <div
              key={file.id}
              className="flex items-center gap-2.5 rounded-lg px-2 py-2 hover:bg-surface-1 transition-colors cursor-pointer"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-1">
                {file.type === "image" ? (
                  <Image className="h-4 w-4 text-info" aria-label="Image file" />
                ) : (
                  <FileText className="h-4 w-4 text-primary/60" aria-label="File" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-caption text-primary">{file.name}</p>
                {file.size && (
                  <p className="text-smallest text-tertiary">{file.size}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
);
ConversationFiles.displayName = "ConversationFiles";

export { ConversationFiles };
export type { ConversationFilesProps };
