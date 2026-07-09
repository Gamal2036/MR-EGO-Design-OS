"use client";

import { Brain, FileText, Briefcase, Sparkles, Lightbulb, ArrowRight, Route } from "lucide-react";
import Link from "next/link";
import { type HTMLAttributes, forwardRef } from "react";

import { Button } from "@/components/foundation/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/foundation/card";
import { cn } from "@/lib/utils";

const RightPanel = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("space-y-4", className)}
        aria-label="Suggestions and actions"
        {...props}
      >
        <Card variant="default" padding="md">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-ai" aria-hidden="true" />
              <CardTitle>AI Actions</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button variant="ghost" size="sm" className="w-full justify-start" disabled>
                <FileText className="h-4 w-4" />
                Improve CV
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start" disabled>
                <FileText className="h-4 w-4" />
                Rewrite Summary
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start" disabled>
                <Briefcase className="h-4 w-4" />
                Improve Experience
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start" disabled>
                <WrenchIcon className="h-4 w-4" />
                Rewrite Skills
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start" disabled>
                <FileSearchIcon className="h-4 w-4" />
                Optimize ATS
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start" disabled>
                <FileText className="h-4 w-4" />
                Generate Cover Letter
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card variant="default" padding="md">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-warning" aria-hidden="true" />
              <CardTitle>Quick Actions</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-between" disabled>
                <span className="flex items-center gap-2">
                  <Brain className="h-4 w-4" />
                  Job Match
                </span>
                <ArrowRight className="h-3 w-3" />
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-between" disabled>
                <span className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  Target Role
                </span>
                <ArrowRight className="h-3 w-3" />
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-between" disabled>
                <span className="flex items-center gap-2">
                  <BuildingIcon className="h-4 w-4" />
                  Industry Match
                </span>
                <ArrowRight className="h-3 w-3" />
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-between" asChild>
                <Link href="/dashboard/career-progress">
                  <span className="flex items-center gap-2">
                    <Route className="h-4 w-4" />
                    Career Progress
                  </span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card variant="default" padding="md">
          <CardHeader>
            <CardTitle>Recommended Technologies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <TechItem name="Kubernetes" level={90} />
              <TechItem name="Docker" level={85} />
              <TechItem name="Machine Learning" level={80} />
              <TechItem name="GraphQL" level={65} />
              <TechItem name="Terraform" level={60} />
            </div>
          </CardContent>
        </Card>

        <Card variant="default" padding="md">
          <CardHeader>
            <CardTitle>Certifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <CertItem name="AWS Developer - Associate" />
              <CertItem name="Google Cloud Developer" />
              <CertItem name="Meta Front-End Developer" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
);
RightPanel.displayName = "RightPanel";

function TechItem({ name, level }: { name: string; level: number }) {
  const color =
    level >= 80 ? "text-success" : level >= 60 ? "text-warning" : "text-tertiary";
  return (
    <div className="flex items-center justify-between">
      <span className="text-caption text-secondary">{name}</span>
      <span className={cn("text-smallest font-medium", color)}>
        {level}% match
      </span>
    </div>
  );
}

function CertItem({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-1.5 rounded-full bg-ai" />
      <span className="text-caption text-secondary">{name}</span>
    </div>
  );
}

function WrenchIcon(props: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}

function FileSearchIcon(props: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <circle cx="11.5" cy="14.5" r="2.5" />
      <path d="M13.25 16.25 15 18" />
    </svg>
  );
}

function BuildingIcon(props: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  );
}

export { RightPanel };
