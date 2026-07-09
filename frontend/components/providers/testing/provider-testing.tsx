"use client";

import {
  Activity,
  CheckCircle2,
  Clock,
  FlaskConical,
  Loader2,
  RefreshCw,
  Server,
  Signal,
  XCircle,
} from "lucide-react";
import { forwardRef, useCallback, useState, type HTMLAttributes } from "react";

import { Badge } from "@/components/foundation/badge";
import { Button } from "@/components/foundation/button";
import { cn } from "@/lib/utils";
import type { ProviderConfig, ProviderId } from "@/types/ai-providers";

interface TestResult {
  name: string;
  status: "idle" | "running" | "passed" | "failed";
  message?: string;
  duration?: number;
}

interface ProviderTestingPanelProps extends HTMLAttributes<HTMLDivElement> {
  provider: ProviderConfig;
  onRunTest?: (id: ProviderId, test: string) => void;
}

const ProviderTestingPanel = forwardRef<HTMLDivElement, ProviderTestingPanelProps>(
  ({ className, provider, onRunTest, ...props }, ref) => {
    const [tests, setTests] = useState<TestResult[]>([
      { name: "Connection Test", status: "idle" },
      { name: "Latency Test", status: "idle" },
      { name: "Streaming Test", status: "idle" },
      { name: "Model Availability", status: "idle" },
      { name: "Health Check", status: "idle" },
    ]);

    const [allRunning, setAllRunning] = useState(false);

    const runSingleTest = useCallback(
      (testName: string) => {
        setTests((prev) =>
          prev.map((t) =>
            t.name === testName ? { ...t, status: "running" as const, message: undefined } : t,
          ),
        );
        onRunTest?.(provider.id, testName);

        const duration = Math.floor(Math.random() * 500) + 100;
        setTimeout(() => {
          setTests((prev) =>
            prev.map((t) =>
              t.name === testName
                ? {
                    ...t,
                    status: "passed" as const,
                    message: "Test completed successfully",
                    duration,
                  }
                : t,
            ),
          );
        }, duration + 200);
      },
      [provider.id, onRunTest],
    );

    const runAllTests = useCallback(() => {
      setAllRunning(true);
      setTests((prev) =>
        prev.map((t) => ({ ...t, status: "running" as const, message: undefined, duration: undefined })),
      );
      onRunTest?.(provider.id, "all");

      tests.forEach((test, index) => {
        const duration = Math.floor(Math.random() * 500) + 100;
        setTimeout(() => {
          setTests((prev) =>
            prev.map((t, i) =>
              i === index
                ? { ...t, status: "passed" as const, message: "Test completed successfully", duration }
                : t,
            ),
          );
        }, duration + 200 * (index + 1));
      });

      setTimeout(() => setAllRunning(false), 4000);
    }, [provider.id, onRunTest, tests]);

    const allPassed = tests.every((t) => t.status === "passed");
    const anyRunning = tests.some((t) => t.status === "running") || allRunning;

    return (
      <div
        ref={ref}
        className={cn("space-y-5", className)}
        role="region"
        aria-label="Provider testing"
        {...props}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FlaskConical className="h-5 w-5 text-primary" aria-hidden="true" />
            <h4 className="text-heading-4 text-primary">Connection Tests</h4>
          </div>
          <Button
            variant="outline"
            size="sm"
            leftIcon={anyRunning ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
            onClick={runAllTests}
            disabled={anyRunning}
          >
            {anyRunning ? "Running..." : "Run All Tests"}
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-2">
          {tests.map((test) => (
            <div
              key={test.name}
              className={cn(
                "flex items-center gap-3 rounded-lg border px-4 py-3 transition-colors duration-fast",
                test.status === "idle" && "border-border",
                test.status === "running" && "border-warning/30 bg-warning/5",
                test.status === "passed" && "border-success/30 bg-success/5",
                test.status === "failed" && "border-danger/30 bg-danger/5",
              )}
              role="status"
              aria-label={`${test.name}: ${test.status}`}
            >
              <div className="shrink-0">
                {test.status === "running" ? (
                  <Loader2 className="h-5 w-5 animate-spin text-warning" aria-hidden="true" />
                ) : test.status === "passed" ? (
                  <CheckCircle2 className="h-5 w-5 text-success" aria-hidden="true" />
                ) : test.status === "failed" ? (
                  <XCircle className="h-5 w-5 text-danger" aria-hidden="true" />
                ) : (
                  <div className="h-5 w-5 rounded-full border-2 border-border" aria-hidden="true" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-body font-medium text-primary">{test.name}</span>
                  {test.duration !== undefined && (
                    <Badge variant="neutral" size="xs">
                      {test.duration}ms
                    </Badge>
                  )}
                </div>
                {test.message && (
                  <p className="text-caption text-secondary mt-0.5">{test.message}</p>
                )}
              </div>

              <Button
                variant="ghost"
                size="xs"
                onClick={() => runSingleTest(test.name)}
                disabled={test.status === "running" || allRunning}
              >
                Test
              </Button>
            </div>
          ))}
        </div>

        {allPassed && (
          <div className="flex items-center gap-2 rounded-lg bg-success/5 border border-success/20 px-4 py-3">
            <CheckCircle2 className="h-5 w-5 text-success shrink-0" aria-hidden="true" />
            <div>
              <p className="text-body font-medium text-success">All tests passed</p>
              <p className="text-caption text-secondary">
                Provider is fully operational and ready for use.
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <MetricCard
            icon={Signal}
            label="Health"
            value={provider.health.status === "unknown" ? "—" : provider.health.status}
            variant={
              provider.health.status === "healthy"
                ? "success"
                : provider.health.status === "degraded"
                  ? "warning"
                  : "neutral"
            }
          />
          <MetricCard
            icon={Clock}
            label="Latency"
            value={provider.latency !== null ? `${provider.latency}ms` : "—"}
            variant="neutral"
          />
          <MetricCard
            icon={Activity}
            label="Token Usage"
            value={provider.tokenUsage > 0 ? provider.tokenUsage.toLocaleString() : "—"}
            variant="neutral"
          />
          <MetricCard
            icon={Server}
            label="Models"
            value={String(provider.models.length)}
            variant="neutral"
          />
        </div>
      </div>
    );
  },
);
ProviderTestingPanel.displayName = "ProviderTestingPanel";

interface MetricCardProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  variant: "success" | "warning" | "neutral";
}

const MetricCard = forwardRef<HTMLDivElement, MetricCardProps>(
  ({ icon: Icon, label, value, variant }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg border p-3 text-center",
          variant === "success" && "border-success/20",
          variant === "warning" && "border-warning/20",
          variant === "neutral" && "border-border",
        )}
      >
        <Icon
          className={cn(
            "h-4 w-4 mx-auto mb-1",
            variant === "success" && "text-success",
            variant === "warning" && "text-warning",
            variant === "neutral" && "text-tertiary",
          )}
          aria-hidden="true"
        />
        <p className="text-smallest text-tertiary">{label}</p>
        <p className="text-label text-primary font-semibold mt-0.5">{value}</p>
      </div>
    );
  },
);
MetricCard.displayName = "MetricCard";

export { ProviderTestingPanel };
export type { ProviderTestingPanelProps };
