"use client";

import { Sparkles } from "lucide-react";

import { IconButton } from "@/components/foundation/icon-button";

export function AIShortcutButton() {
  return (
    <IconButton
      icon={Sparkles}
      variant="ghost"
      size="md"
      label="Open AI assistant"
      className="text-ai hover:text-ai/80"
    />
  );
}
