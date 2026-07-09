import type { Metadata } from "next";

import { UnderConstruction } from "@/components/feedback/under-construction";

export const metadata: Metadata = {
  title: "Career",
  description: "Career path planning and growth tracking",
};

export default function CareerPage() {
  return (
    <UnderConstruction
      title="Career"
      description="Career path planning, skill development tracking, and growth insights are coming soon."
    />
  );
}
