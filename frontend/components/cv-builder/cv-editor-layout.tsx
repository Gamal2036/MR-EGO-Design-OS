"use client";

import { useState, useCallback } from "react";

import { AISuggestionPanel } from "./ai-suggestion-panel";
import { CertificationsSection } from "./certifications-section";
import { CVActionBar } from "./cv-action-bar";
import { CVBuilderHeader } from "./cv-builder-header";
import { CVEmptyState } from "./cv-empty-state";
import { CVErrorState } from "./cv-error-state";
import { CVLoadingState } from "./cv-loading-state";
import { CVMissingChecklist } from "./cv-missing-checklist";
import { CVPreview } from "./cv-preview";
import { CVSectionNavigator } from "./cv-section-navigator";
import { CVTemplateSelector } from "./cv-template-selector";
import { EducationSection } from "./education-section";
import { ExperienceSection } from "./experience-section";
import { LanguagesSection } from "./languages-section";
import { PersonalInfoSection } from "./personal-info-section";
import { ProjectsSection } from "./projects-section";
import { SkillsSection } from "./skills-section";
import { SummarySection } from "./summary-section";

import { useCVBuilderStore } from "@/stores/cv-builder-store";

type CVBuilderState = "loading" | "ready" | "error";

export function CVEditorLayout() {
  const [state, setState] = useState<CVBuilderState>("ready");
  const activeSection = useCVBuilderStore((s) => s.activeSection);
  const cvData = useCVBuilderStore((s) => s.cvData);

  const handleRetry = useCallback(() => {
    setState("loading");
    setTimeout(() => setState("ready"), 800);
  }, []);

  if (state === "loading") return <CVLoadingState />;
  if (state === "error") return <CVErrorState onRetry={handleRetry} />;

  const hasAnyContent =
    cvData.personalInfo.fullName ||
    cvData.summary ||
    cvData.experience.length > 0 ||
    cvData.education.length > 0 ||
    cvData.skills.length > 0 ||
    cvData.languages.length > 0 ||
    cvData.projects.length > 0 ||
    cvData.certifications.length > 0;

  const renderActiveSection = () => {
    if (!hasAnyContent) return <CVEmptyState />;

    switch (activeSection) {
      case "personal-info":
        return <PersonalInfoSection />;
      case "summary":
        return <SummarySection />;
      case "experience":
        return <ExperienceSection />;
      case "education":
        return <EducationSection />;
      case "skills":
        return <SkillsSection />;
      case "languages":
        return <LanguagesSection />;
      case "projects":
        return <ProjectsSection />;
      case "certifications":
        return <CertificationsSection />;
    }
  };

  return (
    <div className="min-h-0 flex-1">
      <div className="mx-auto w-full max-w-screen-2xl px-5 py-6 md:px-7 md:py-8 lg:px-8 lg:py-10 space-y-8">
        <CVBuilderHeader />

        <div className="flex gap-6 lg:gap-8 relative">
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="space-y-6 sticky top-24">
              <CVSectionNavigator />
              <hr className="border-border" />
              <CVMissingChecklist />
              <hr className="border-border" />
              <CVTemplateSelector />
            </div>
          </aside>

          <div className="lg:hidden w-full mb-4">
            <details className="group">
              <summary className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card text-body font-medium cursor-pointer hover:bg-accent transition-colors">
                <span className="flex-1">Navigate Sections</span>
                <span className="text-caption text-tertiary group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <div className="mt-2">
                <CVSectionNavigator />
              </div>
            </details>
          </div>

          <main className="flex-1 min-w-0">
            <div className="rounded-xl border border-border bg-card p-5 md:p-6 lg:p-7 shadow-soft">
              {renderActiveSection()}
            </div>
          </main>

          <aside className="hidden xl:block w-96 shrink-0">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-xl border border-border bg-card shadow-soft overflow-hidden">
                <div className="px-4 py-3 border-b border-border bg-accent/50">
                  <h2 className="text-caption font-medium text-primary">Live Preview</h2>
                </div>
                <CVPreview className="border-0 rounded-none shadow-none" />
              </div>
              <AISuggestionPanel />
            </div>
          </aside>

          <aside className="hidden lg:block xl:hidden w-72 shrink-0">
            <div className="sticky top-24 space-y-6">
              <AISuggestionPanel />
            </div>
          </aside>
        </div>
      </div>

      <CVActionBar />
    </div>
  );
}
