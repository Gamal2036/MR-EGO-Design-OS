"use client";

import {
  Briefcase,
  CalendarCheck,
  Clock,
  Send,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import type { HTMLAttributes } from "react";

import type { Application } from "@/types/application-tracker";

interface ApplicationStatsProps extends HTMLAttributes<HTMLDivElement> {
  applications: Application[];
}

export function ApplicationStats({ applications, className, ...props }: ApplicationStatsProps) {
  const total = applications.length;
  const active = applications.filter(
    (a) => !["rejected", "archived", "accepted"].includes(a.status)
  ).length;
  const interviews = applications.filter((a) => a.status === "interview" || a.status === "technical-test").length;
  const offers = applications.filter((a) => a.status === "offer").length;
  const accepted = applications.filter((a) => a.status === "accepted").length;
  const rejected = applications.filter((a) => a.status === "rejected").length;

  const stats = [
    { icon: Briefcase, value: total, label: "Total", color: "text-primary" },
    { icon: Send, value: active, label: "Active", color: "text-info" },
    { icon: CalendarCheck, value: interviews, label: "Interviews", color: "text-ai" },
    { icon: Clock, value: offers, label: "Offers", color: "text-success" },
    { icon: CheckCircle2, value: accepted, label: "Accepted", color: "text-success" },
    { icon: XCircle, value: rejected, label: "Rejected", color: "text-danger" },
  ];

  return (
    <div
      className={`grid grid-cols-3 gap-3 sm:grid-cols-6 ${className || ""}`}
      role="region"
      aria-label="Application Statistics"
      {...props}
    >
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex flex-col items-center gap-1 rounded-xl border border-border bg-surface-0 px-3 py-3"
        >
          <stat.icon className={`h-4 w-4 ${stat.color}`} aria-hidden="true" />
          <span className="text-heading-3 text-primary">{stat.value}</span>
          <span className="text-smallest text-tertiary">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}
