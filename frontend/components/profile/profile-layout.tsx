"use client";

import { useCallback, useEffect } from "react";

import { CareerIdentityPanel } from "./career-identity-panel";
import { EducationCertificationPanel } from "./education-certification-panel";
import { ExperienceSnapshot } from "./experience-snapshot";
import { PersonalInfoPanel } from "./personal-info-panel";
import { ProfessionalSummaryPanel } from "./professional-summary-panel";
import { ProfileCompletionCard } from "./profile-completion-card";
import { ProfileDocumentLinks } from "./profile-document-links";
import { ProfileEmptyState } from "./profile-empty-state";
import { ProfileErrorState } from "./profile-error-state";
import { ProfileHeader } from "./profile-header";
import { ProfileLoadingState } from "./profile-loading-state";
import { ProfilePrivacyPanel } from "./profile-privacy-panel";
import { ProfileReadinessPanel } from "./profile-readiness-panel";
import { ProfileSuggestionPanel } from "./profile-suggestion-panel";
import { SkillsLanguagesPanel } from "./skills-languages-panel";

import { demoProfileData } from "@/data/profile";
import { useProfileStore } from "@/stores/profile-store";

export function ProfileLayout() {
  const {
    data,
    viewState,
    isEditing,
    setViewState,
    setData,
    setEditing,
    updatePersonalInfo,
    updateCareerIdentity,
    updateProfessionalSummary,
    updatePreferences,
  } = useProfileStore();

  useEffect(() => {
    setViewState("loading");
    const timer = setTimeout(() => {
      setData(demoProfileData);
    }, 400);
    return () => clearTimeout(timer);
  }, [setViewState, setData]);

  const handleEdit = useCallback(() => {
    setEditing(!isEditing);
  }, [isEditing, setEditing]);

  const handleRetry = useCallback(() => {
    setViewState("loading");
    setTimeout(() => {
      setData(demoProfileData);
    }, 400);
  }, [setViewState, setData]);

  const handleCreateProfile = useCallback(() => {
    setData(demoProfileData);
  }, [setData]);

  if (viewState === "loading") {
    return <ProfileLoadingState />;
  }

  if (viewState === "error") {
    return <ProfileErrorState onRetry={handleRetry} />;
  }

  if (viewState === "empty" || !data) {
    return <ProfileEmptyState onCreateProfile={handleCreateProfile} />;
  }

  return (
    <div className="min-h-0 flex-1">
      <div className="mx-auto w-full max-w-screen-2xl px-5 py-6 md:px-7 md:py-8 lg:px-8 lg:py-10 space-y-6">
        <ProfileHeader
          personalInfo={data.personalInfo}
          careerIdentity={data.careerIdentity}
          completionScore={data.completionScore}
          onEdit={handleEdit}
          isEditing={isEditing}
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <PersonalInfoPanel
              personalInfo={data.personalInfo}
              isEditing={isEditing}
              onUpdate={updatePersonalInfo}
            />
            <CareerIdentityPanel
              careerIdentity={data.careerIdentity}
              isEditing={isEditing}
              onUpdate={updateCareerIdentity}
            />
            <ProfessionalSummaryPanel
              summary={data.professionalSummary}
              isEditing={isEditing}
              onUpdate={updateProfessionalSummary}
            />
            <SkillsLanguagesPanel skillsLanguages={data.skillsLanguages} />
            <ExperienceSnapshot experience={data.experienceSnapshot} />
            <EducationCertificationPanel
              educationCertifications={data.educationCertifications}
            />
            <ProfileDocumentLinks documents={data.documents} />
          </div>

          <div className="space-y-6">
            <ProfileCompletionCard
              completionScore={data.completionScore}
              checklist={data.completionChecklist}
            />
            <ProfileReadinessPanel checklist={data.completionChecklist} />
            <ProfileSuggestionPanel />
            <ProfilePrivacyPanel
              preferences={data.preferences}
              isEditing={isEditing}
              onUpdate={updatePreferences}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
