"use client";

import { Construction, ArrowLeft, LayoutDashboard } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/foundation/button";
import { Container } from "@/components/layout-primitives/container";

export interface UnderConstructionProps {
  title?: string;
  description?: string;
}

export function UnderConstruction({
  title = "Coming Soon",
  description = "This feature is currently under development and will be available soon.",
}: UnderConstructionProps) {
  return (
    <Container size="sm" className="py-16 md:py-24">
      <div className="flex flex-col items-center text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 mb-6">
          <Construction className="h-10 w-10 text-primary" aria-hidden="true" />
        </div>

        <h1 className="text-heading-2 text-primary font-bold mb-3">
          {title}
        </h1>

        <p className="text-body text-secondary max-w-md mb-8">
          {description}
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button asChild variant="primary" size="lg">
            <Link href="/dashboard">
              <LayoutDashboard className="h-4 w-4" />
              Go to Dashboard
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </Container>
  );
}
