import type { Metadata } from "next";

import { UnderConstruction } from "@/components/feedback/under-construction";

export const metadata: Metadata = {
  title: "Admin",
  description: "Administration and settings",
};

export default function AdminPage() {
  return (
    <UnderConstruction
      title="Admin"
      description="Administration tools and system settings are coming soon."
    />
  );
}
