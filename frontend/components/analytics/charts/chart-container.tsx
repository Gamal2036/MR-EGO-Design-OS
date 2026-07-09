"use client";

import type { ReactNode } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/foundation/card";
import { cn } from "@/lib/utils";

interface ChartContainerProps {
  title: string;
  children: ReactNode;
  className?: string;
  action?: ReactNode;
  ariaLabel?: string;
}

export function ChartContainer({
  title,
  children,
  className,
  action,
  ariaLabel,
}: ChartContainerProps) {
  return (
    <Card
      variant="default"
      padding="md"
      className={cn("h-full", className)}
      role="region"
      aria-label={ariaLabel ?? title}
    >
      <CardHeader action={action}>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="h-[260px] min-h-[220px]">{children}</CardContent>
    </Card>
  );
}
