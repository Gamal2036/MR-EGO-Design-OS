"use client";

import { Send, Download, Share2, RefreshCw } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { Button } from "@/components/foundation/button";
import { Card, CardContent } from "@/components/foundation/card";
import { cn } from "@/lib/utils";

export interface ActionCenterProps extends HTMLAttributes<HTMLDivElement> {
  onReanalyze?: () => void;
}

const ActionCenter = forwardRef<HTMLDivElement, ActionCenterProps>(
  ({ className, onReanalyze, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        variant="default"
        padding="md"
        className={cn("", className)}
        role="region"
        aria-label="Action center"
        {...props}
      >
        <CardContent>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary" size="sm" leftIcon={<Send className="h-4 w-4" />}>
              Export Report
            </Button>
            <Button variant="outline" size="sm" leftIcon={<Download className="h-4 w-4" />}>
              Download PDF
            </Button>
            <Button variant="outline" size="sm" leftIcon={<Share2 className="h-4 w-4" />}>
              Share
            </Button>
            <Button
              variant="ghost"
              size="sm"
              leftIcon={<RefreshCw className="h-4 w-4" />}
              onClick={onReanalyze}
            >
              Reanalyze
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
);
ActionCenter.displayName = "ActionCenter";

export { ActionCenter };
