"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";

import { Button } from "@/components/foundation/button";
import { Card, CardContent } from "@/components/foundation/card";

interface AnalyticsErrorStateProps {
  onRetry: () => void;
}

export function AnalyticsErrorState({ onRetry }: AnalyticsErrorStateProps) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-5 py-10" role="alert">
      <Card variant="danger" padding="lg" className="max-w-md text-center">
        <CardContent>
          <AlertTriangle className="mx-auto h-10 w-10 text-danger" aria-hidden="true" />
          <h2 className="text-heading-3 text-primary mt-4">Analytics unavailable</h2>
          <p className="text-body-small text-secondary mt-2">
            We could not load your analytics dashboard. Please try again.
          </p>
          <Button
            variant="primary"
            size="md"
            className="mt-5"
            leftIcon={<RefreshCw className="h-4 w-4" />}
            onClick={onRetry}
          >
            Retry
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
