"use client";

import {
  Bookmark,
  BookmarkCheck,
  Briefcase,
  Building2,
  Calendar,
  ChevronLeft,
  ExternalLink,
  FileText,
  GraduationCap,
  Heart,
  ListChecks,
  MapPin,
  MessageSquare,
  Send,
  Sparkles,
  Star,
  Target,
  X,
} from "lucide-react";
import Link from "next/link";
import { type HTMLAttributes, forwardRef, useCallback } from "react";

import { Badge } from "@/components/foundation/badge";
import { Button } from "@/components/foundation/button";
import { Chip } from "@/components/foundation/chip";
import { Divider } from "@/components/foundation/divider";
import { JobMatchScore } from "@/components/jobs/job-match-score";
import { JobSkillMatch } from "@/components/jobs/job-skill-match";
import { cn } from "@/lib/utils";
import type { Job } from "@/types/job-search";

interface JobDetailPanelProps extends HTMLAttributes<HTMLDivElement> {
  job: Job;
  isSaved: boolean;
  onClose: () => void;
  onSave: (jobId: string) => void;
  fullScreen?: boolean;
}

const JobDetailPanel = forwardRef<HTMLDivElement, JobDetailPanelProps>(
  ({ className, job, isSaved, onClose, onSave, fullScreen = false, ...props }, ref) => {
    const handleSave = useCallback(() => {
      onSave(job.id);
    }, [job.id, onSave]);

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col bg-surface-1 border-l border-border overflow-y-auto",
          fullScreen ? "fixed inset-0 z-modal bg-background" : "h-full",
          className
        )}
        role="dialog"
        aria-label={`Job details: ${job.title}`}
        aria-modal={fullScreen}
        {...props}
      >
        <div className="sticky top-0 z-sticky bg-surface-1 border-b border-border">
          <div className="flex items-center justify-between px-5 py-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              leftIcon={fullScreen ? <ChevronLeft className="h-4 w-4" /> : <X className="h-4 w-4" />}
              className="text-caption text-tertiary hover:text-primary"
            >
              {fullScreen ? "Back" : "Close"}
            </Button>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={handleSave}
                aria-label={isSaved ? "Remove from saved" : "Save job"}
              >
                {isSaved ? (
                  <BookmarkCheck className="h-4 w-4 text-primary" />
                ) : (
                  <Bookmark className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-5 space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <h2 className="text-heading-3 text-primary">{job.title}</h2>
                <p className="text-body text-secondary flex items-center gap-1.5 mt-1">
                  <Building2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {job.company}
                </p>
              </div>
              <JobMatchScore score={job.matchScore} size="lg" />
            </div>

            <div className="flex flex-wrap items-center gap-3 text-caption text-tertiary">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                {job.location}
              </span>
              <span className="flex items-center gap-1.5 capitalize">
                <Briefcase className="h-3.5 w-3.5" aria-hidden="true" />
                {job.contractType.replace("-", " ")}
              </span>
              <span className="flex items-center gap-1.5 capitalize">
                <GraduationCap className="h-3.5 w-3.5" aria-hidden="true" />
                {job.experienceLevel}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                {job.postedDate}
              </span>
            </div>

            {job.salaryLabel && (
              <div className="flex items-center gap-2">
                <span className="text-heading-4 text-primary font-semibold">
                  {job.salaryLabel}
                </span>
                <Badge variant="success" size="xs">
                  <Target className="h-3 w-3 mr-1" aria-hidden="true" />
                  Estimated
                </Badge>
              </div>
            )}

            <Divider />

            <section aria-label="AI Match Analysis">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-4 w-4 text-ai" aria-hidden="true" />
                <h3 className="text-label font-semibold text-primary">AI Match Analysis</h3>
              </div>
              <div className="rounded-xl border border-ai/20 bg-ai/5 p-4">
                <p className="text-body-small text-secondary leading-relaxed">
                  {job.matchExplanation}
                </p>
              </div>
            </section>

            <section aria-label="Skills">
              <h3 className="text-label font-semibold text-primary mb-3">Skills</h3>
              <JobSkillMatch
                matchingSkills={job.matchingSkills}
                missingSkills={job.missingSkills}
              />
            </section>

            <Divider />

            <section aria-label="Description">
              <div className="flex items-center gap-2 mb-3">
                <ListChecks className="h-4 w-4 text-primary" aria-hidden="true" />
                <h3 className="text-label font-semibold text-primary">Description</h3>
              </div>
              <p className="text-body-small text-secondary leading-relaxed">
                {job.description}
              </p>
            </section>

            <section aria-label="Responsibilities">
              <div className="flex items-center gap-2 mb-3">
                <Target className="h-4 w-4 text-primary" aria-hidden="true" />
                <h3 className="text-label font-semibold text-primary">Responsibilities</h3>
              </div>
              <ul className="space-y-2">
                {job.responsibilities.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-body-small text-secondary">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section aria-label="Requirements">
              <div className="flex items-center gap-2 mb-3">
                <Star className="h-4 w-4 text-primary" aria-hidden="true" />
                <h3 className="text-label font-semibold text-primary">Requirements</h3>
              </div>
              <ul className="space-y-2">
                {job.requirements.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-body-small text-secondary">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {job.benefits.length > 0 && (
              <section aria-label="Benefits">
                <div className="flex items-center gap-2 mb-3">
                  <Heart className="h-4 w-4 text-primary" aria-hidden="true" />
                  <h3 className="text-label font-semibold text-primary">Benefits</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {job.benefits.map((benefit, i) => (
                    <Chip key={i} variant="success" size="sm">{benefit}</Chip>
                  ))}
                </div>
              </section>
            )}

            <section aria-label="Tags">
              <div className="flex items-center gap-2 mb-3">
                <ListChecks className="h-4 w-4 text-primary" aria-hidden="true" />
                <h3 className="text-label font-semibold text-primary">Tags</h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {job.tags.map((tag) => (
                  <Chip key={tag} variant="neutral" size="sm">{tag}</Chip>
                ))}
              </div>
            </section>

            <Divider />

            <section aria-label="Actions" className="space-y-3">
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                leftIcon={<ExternalLink className="h-4 w-4" />}
                asChild
              >
                <Link href="/dashboard/jobs">
                  Apply for this Job
                  <span className="text-caption opacity-70 ml-1">(Coming Soon)</span>
                </Link>
              </Button>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<FileText className="h-4 w-4" />}
                  asChild
                >
                  <Link href="/dashboard/cv-builder">
                    Optimize CV
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<Send className="h-4 w-4" />}
                  asChild
                >
                  <Link href="/dashboard/ai">
                    AI Workspace
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<MessageSquare className="h-4 w-4" />}
                  asChild
                >
                  <Link href="/dashboard/cv-analysis">
                    CV Analysis
                  </Link>
                </Button>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }
);
JobDetailPanel.displayName = "JobDetailPanel";

export { JobDetailPanel };
export type { JobDetailPanelProps };
