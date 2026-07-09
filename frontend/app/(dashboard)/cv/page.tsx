import type { Metadata } from "next";

import { UnderConstruction } from "@/components/feedback/under-construction";

export const metadata: Metadata = {
  title: "CV Intelligence",
  description: "AI-powered CV analysis and optimization",
};

export default function CVPage() {
  return (
    <UnderConstruction
      title="CV Intelligence"
      description="CV analysis, optimization, and intelligence tools are coming soon. You'll be able to analyze, compare, and optimize your CVs with AI-powered insights."
    />
  );
}
