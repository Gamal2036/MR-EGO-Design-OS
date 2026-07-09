import type { Metadata } from "next";

import { UnderConstruction } from "@/components/feedback/under-construction";

export const metadata: Metadata = {
  title: "AI Workspace",
  description: "AI-powered career tools and agents",
};

export default function AIWorkspacePage() {
  return (
    <UnderConstruction
      title="AI Workspace"
      description="Your AI-powered workspace for career optimization, intelligent job matching, and personalized career coaching is coming soon."
    />
  );
}
