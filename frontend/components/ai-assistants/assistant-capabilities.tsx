"use client";

import {
  BarChart3,
  BookOpen,
  Brain,
  Briefcase,
  Building2,
  CheckSquare,
  ClipboardCheck,
  ClipboardList,
  DollarSign,
  Edit3,
  FileEdit,
  FilePlus,
  FileText,
  Files,
  Filter,
  Flag,
  Handshake,
  HelpCircle,
  Layout,
  Library,
  Lightbulb,
  ListChecks,
  MessageSquare,
  Mic,
  Paintbrush,
  PenTool,
  PieChart,
  Scale,
  ScrollText,
  Search,
  Sliders,
  SpellCheck,
  Target,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { type HTMLAttributes } from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/foundation/card";
import { cn } from "@/lib/utils";
import type { AssistantCapability } from "@/types/assistant";

const iconMap: Record<string, LucideIcon> = {
  Target,
  TrendingUp,
  BarChart3,
  Flag,
  FileText,
  Edit3,
  Layout,
  Search,
  Briefcase,
  ClipboardList,
  Building2,
  DollarSign,
  Mic,
  HelpCircle,
  MessageSquare,
  UserCheck,
  BookOpen,
  Library,
  ClipboardCheck,
  CheckSquare,
  Lightbulb,
  Handshake,
  PieChart,
  Scale,
  FileEdit,
  Filter,
  ListChecks,
  ScrollText,
  FilePlus,
  Paintbrush,
  Files,
  Users,
  PenTool,
  SpellCheck,
  Sliders,
  Brain,
};

interface AssistantCapabilitiesProps extends HTMLAttributes<HTMLDivElement> {
  capabilities: AssistantCapability[];
  compact?: boolean;
}

export function AssistantCapabilities({
  className,
  capabilities,
  compact = false,
  ...props
}: AssistantCapabilitiesProps) {
  if (capabilities.length === 0) return null;

  return (
    <Card variant="default" padding="md" className={className} {...props}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-body-small">
          <Brain className="h-4 w-4 text-ai" aria-hidden="true" />
          Capabilities
        </CardTitle>
        {!compact && <CardDescription>What this assistant can do</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className={cn("grid gap-2", compact ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1")}>
          {capabilities.map((cap) => {
            const Icon = iconMap[cap.icon] ?? Brain;
            return (
              <div
                key={cap.id}
                className="flex items-start gap-3 rounded-lg border border-border bg-surface-1 p-3 transition-colors hover:border-ai/30"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ai/10 text-ai">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <p className="text-caption font-medium text-primary">{cap.name}</p>
                  <p className="text-smallest text-tertiary">{cap.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
