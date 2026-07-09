"use client";

import { ExternalLink } from "lucide-react";
import { forwardRef } from "react";

interface ConversationLinksProps {
  links?: { id: string; title: string; url: string }[];
}

const ConversationLinks = forwardRef<HTMLDivElement, ConversationLinksProps>(
  ({ links }, ref) => {
    if (!links || links.length === 0) {
      return (
        <div ref={ref} className="flex flex-col gap-2">
          <h4 className="text-caption font-medium text-secondary px-3">Shared Links</h4>
          <p className="text-smallest text-tertiary px-3">No shared links</p>
        </div>
      );
    }

    return (
      <div ref={ref} className="flex flex-col gap-2">
        <h4 className="text-caption font-medium text-secondary px-3">Shared Links</h4>
        <div className="flex flex-col gap-1 px-2">
          {links.map((link) => (
            <div
              key={link.id}
              className="flex items-center gap-2.5 rounded-lg px-2 py-2 hover:bg-surface-1 transition-colors cursor-pointer"
            >
              <ExternalLink className="h-4 w-4 shrink-0 text-info" />
              <span className="truncate text-caption text-primary">{link.title}</span>
            </div>
          ))}
        </div>
      </div>
    );
  },
);
ConversationLinks.displayName = "ConversationLinks";

export { ConversationLinks };
export type { ConversationLinksProps };
