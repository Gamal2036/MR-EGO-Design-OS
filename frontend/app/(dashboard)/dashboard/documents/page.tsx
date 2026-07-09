import type { Metadata } from "next";

import { UnderConstruction } from "@/components/feedback/under-construction";
import { Breadcrumb } from "@/components/shell/breadcrumb";

export const metadata: Metadata = {
  title: "Documents",
  description: "Document management",
};

export default function DocumentsPage() {
  return (
    <div className="min-h-0 flex-1">
      <div className="mx-auto w-full max-w-screen-2xl px-5 py-6 md:px-7 md:py-8 lg:px-8 lg:py-10">
        <div className="space-y-6">
          <Breadcrumb
            items={[
              { label: "Dashboard", href: "/dashboard" },
              { label: "Documents" },
            ]}
          />
          <UnderConstruction
            title="Documents"
            description="Document management and file storage are coming soon."
          />
        </div>
      </div>
    </div>
  );
}
