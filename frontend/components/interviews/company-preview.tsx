"use client";

import { Building2, ExternalLink } from "lucide-react";
import { forwardRef, type HTMLAttributes } from "react";

import { Badge, Card, CardHeader, CardTitle } from "@/components/foundation";
import { cn } from "@/lib/utils";
import type { InterviewCompany } from "@/types/interview";

interface CompanyPreviewProps extends HTMLAttributes<HTMLDivElement> {
  company: InterviewCompany;
}

const CompanyPreview = forwardRef<HTMLDivElement, CompanyPreviewProps>(
  ({ className, company, ...props }, ref) => {
    return (
      <Card ref={ref} className={cn("w-full", className)} {...props}>
        <CardHeader>
          <CardTitle className="text-body font-medium">Company Info</CardTitle>
        </CardHeader>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-2">
              <Building2 className="h-5 w-5 text-tertiary" aria-hidden="true" />
            </div>
            <div>
              <p className="text-body-small text-primary font-medium">{company.name}</p>
              <p className="text-caption text-tertiary">{company.industry}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="neutral" size="sm">
              {company.size} employees
            </Badge>
            <Badge variant="neutral" size="sm">
              {company.industry}
            </Badge>
          </div>

          {company.description && (
            <p className="text-caption text-tertiary line-clamp-3">
              {company.description}
            </p>
          )}

          {company.website && (
            <a
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-caption text-primary hover:underline"
            >
              <ExternalLink className="h-3 w-3" aria-hidden="true" />
              Visit website
            </a>
          )}
        </div>
      </Card>
    );
  },
);
CompanyPreview.displayName = "CompanyPreview";

export { CompanyPreview };
export type { CompanyPreviewProps };
