import type { Metadata } from "next";

import { UnderConstruction } from "@/components/feedback/under-construction";

export const metadata: Metadata = {
  title: "Analytics",
  description: "Career analytics and insights",
};

export default function AnalyticsPage() {
  return (
    <UnderConstruction
      title="Analytics"
      description="Career analytics, market insights, and performance metrics are coming soon."
    />
  );
}
