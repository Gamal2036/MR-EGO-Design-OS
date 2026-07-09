"use client";

import { Loader2 } from "lucide-react";

import { Card, CardContent } from "@/components/foundation/card";

export function AnalyticsLoadingState() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-5 py-10" role="status" aria-live="polite">
      <Card variant="glass" padding="lg" className="max-w-md text-center">
        <CardContent>
          <Loader2 className="mx-auto h-10 w-10 animate-spin text-analytics" aria-hidden="true" />
          <h2 className="text-heading-3 text-primary mt-4">Loading analytics</h2>
          <p className="text-body-small text-secondary mt-2">
            Crunching your career data and AI insights...
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
