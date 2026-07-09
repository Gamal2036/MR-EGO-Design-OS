"use client";

import { Edit, Eye, MapPin, Target } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { Avatar } from "@/components/foundation/avatar";
import { Badge } from "@/components/foundation/badge";
import { Button } from "@/components/foundation/button";
import { Card } from "@/components/foundation/card";
import { cn } from "@/lib/utils";
import type { PersonalInfo, CareerIdentity } from "@/types/profile";

interface ProfileHeaderProps extends HTMLAttributes<HTMLElement> {
  personalInfo: PersonalInfo;
  careerIdentity: CareerIdentity;
  completionScore: number;
  onEdit?: () => void;
  isEditing?: boolean;
}

const ProfileHeader = forwardRef<HTMLElement, ProfileHeaderProps>(
  (
    {
      className,
      personalInfo,
      careerIdentity,
      completionScore,
      onEdit,
      isEditing,
      ...props
    },
    ref
  ) => {
    const initials = personalInfo.fullName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

    const scoreColor =
      completionScore >= 80
        ? "text-success"
        : completionScore >= 50
          ? "text-warning"
          : "text-danger";

    return (
      <header
        ref={ref}
        className={cn("", className)}
        {...props}
      >
        <Card variant="default" padding="lg">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-5">
              <Avatar
                size="xl"
                initials={initials}
                alt={personalInfo.fullName}
                className="shrink-0"
              />
              <div className="space-y-2 min-w-0">
                <h1 className="text-heading-2 text-primary truncate">
                  {personalInfo.fullName}
                </h1>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="primary" size="sm">
                    <Target className="h-3 w-3 mr-1" aria-hidden="true" />
                    {careerIdentity.targetRole}
                  </Badge>
                  <span className="flex items-center gap-1 text-caption text-secondary">
                    <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                    {personalInfo.location}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <div className="flex flex-col items-center">
                <div className="relative flex items-center justify-center h-14 w-14">
                  <svg className="h-14 w-14 -rotate-90" viewBox="0 0 36 36" aria-hidden="true">
                    <circle
                      cx="18"
                      cy="18"
                      r="15.5"
                      fill="none"
                      className="stroke-neutral-200 dark:stroke-neutral-700"
                      strokeWidth="3"
                    />
                    <circle
                      cx="18"
                      cy="18"
                      r="15.5"
                      fill="none"
                      className={scoreColor}
                      strokeWidth="3"
                      strokeDasharray={`${completionScore * 0.97} 100`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className={cn("absolute text-label font-semibold", scoreColor)}>
                    {completionScore}%
                  </span>
                </div>
                <span className="text-smallest text-tertiary mt-1">Profile</span>
              </div>

              <div className="flex flex-col gap-2">
                {isEditing ? (
                  <Button variant="primary" size="sm" onClick={onEdit}>
                    Save Changes
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    size="sm"
                    leftIcon={<Edit className="h-4 w-4" />}
                    onClick={onEdit}
                  >
                    Edit Profile
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<Eye className="h-4 w-4" />}
                  disabled
                  title="Coming Soon"
                >
                  Preview
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </header>
    );
  }
);
ProfileHeader.displayName = "ProfileHeader";

export { ProfileHeader };
export type { ProfileHeaderProps };
