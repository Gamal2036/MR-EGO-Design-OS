"use client";

import { useCallback, useEffect, useMemo } from "react";

import {
  CVAnalysisLayout,
  AnalysisScoreCard,
  ATSCard,
  SkillGapCard,
  KeywordCard,
  ExperienceCard,
  EducationCard,
  RecommendationCard,
  StrengthCard,
  WeaknessCard,
  CareerSuggestionCard,
  ImprovementChecklist,
  PriorityFixCard,
  AnalysisTimeline,
  AnalysisSummary,
  AnalysisProgress,
  ActionCenter,
  AnalysisLoadingState,
} from "@/components/cv-analysis";
import { demoAnalysisData } from "@/data/cv-analysis";
import { useCVAnalysisStore } from "@/stores/cv-analysis-store";

export default function CVAnalysisPage() {
  const {
    analysisData,
    activeSection,
    isAnalyzing,
    setActiveSection,
    startAnalysis,
    completeAnalysis,
    toggleImprovement,
  } = useCVAnalysisStore();

  const data = analysisData ?? demoAnalysisData;

  const handleReanalyze = useCallback(() => {
    startAnalysis();
    setTimeout(() => {
      useCVAnalysisStore.setState({ analysisData: demoAnalysisData });
      completeAnalysis();
    }, 1500);
  }, [startAnalysis, completeAnalysis]);

  useEffect(() => {
    if (!analysisData && !isAnalyzing) {
      handleReanalyze();
    }
  }, [analysisData, isAnalyzing, handleReanalyze]);

  const handleSectionChange = useCallback(
    (section: string) => {
      setActiveSection(section as "overview");
    },
    [setActiveSection]
  );

  const handleToggleImprovement = useCallback(
    (id: string) => {
      toggleImprovement(id);
    },
    [toggleImprovement]
  );

  const overviewContent = useMemo(
    () => (
      <>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          <AnalysisScoreCard
            overallScore={data.overallScore.overall}
            status={data.status}
            riskLevel={data.riskLevel}
            jobReadiness={data.jobReadiness}
            interviewReadiness={data.interviewReadiness}
            careerLevel={data.careerLevel}
          />
          <div className="md:col-span-1 xl:col-span-2">
            <AnalysisProgress overallScore={data.overallScore} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <StrengthCard strengths={data.strengths} />
          <WeaknessCard weaknesses={data.weaknesses} />
        </div>

        <PriorityFixCard weaknesses={data.weaknesses} />

        <AnalysisSummary />

        <ActionCenter onReanalyze={handleReanalyze} />
      </>
    ),
    [data, handleReanalyze]
  );

  const atsContent = useMemo(
    () => (
      <>
        <ATSCard ats={data.ats} />
        <KeywordCard keywords={data.keywords} />
      </>
    ),
    [data]
  );

  const skillsContent = useMemo(
    () => (
      <>
        <SkillGapCard skillGaps={data.skillGaps} />
        <AnalysisProgress overallScore={data.overallScore} />
      </>
    ),
    [data]
  );

  const experienceContent = useMemo(
    () => (
      <>
        <ExperienceCard experience={data.experience} />
        <StrengthCard strengths={data.strengths} />
      </>
    ),
    [data]
  );

  const educationContent = useMemo(
    () => (
      <>
        <EducationCard education={data.education} />
      </>
    ),
    [data]
  );

  const projectsContent = useMemo(
    () => (
      <>
        <div className="rounded-xl border border-border bg-surface-1 p-8 text-center">
          <p className="text-body text-secondary">
            Project analysis will be available once projects are added to your
            CV.
          </p>
        </div>
      </>
    ),
    []
  );

  const languagesContent = useMemo(
    () => (
      <>
        <div className="rounded-xl border border-border bg-surface-1 p-8 text-center">
          <p className="text-body text-secondary">
            Language proficiency analysis will be available once languages are
            added to your CV.
          </p>
        </div>
      </>
    ),
    []
  );

  const keywordsContent = useMemo(
    () => (
      <>
        <KeywordCard keywords={data.keywords} />
      </>
    ),
    [data]
  );

  const recommendationsContent = useMemo(
    () => (
      <>
        <RecommendationCard recommendations={data.recommendations} />
        <CareerSuggestionCard suggestions={data.careerSuggestions} />
        <ImprovementChecklist
          improvements={data.improvements}
          onToggle={handleToggleImprovement}
        />
        <AnalysisTimeline timeline={data.timeline} />
      </>
    ),
    [data, handleToggleImprovement]
  );

  if (isAnalyzing) {
    return <AnalysisLoadingState />;
  }

  return (
    <CVAnalysisLayout
      activeSection={activeSection}
      onSectionChange={handleSectionChange}
    >
      {activeSection === "overview" && overviewContent}
      {activeSection === "ats" && atsContent}
      {activeSection === "skills" && skillsContent}
      {activeSection === "experience" && experienceContent}
      {activeSection === "education" && educationContent}
      {activeSection === "projects" && projectsContent}
      {activeSection === "languages" && languagesContent}
      {activeSection === "keywords" && keywordsContent}
      {activeSection === "recommendations" && recommendationsContent}
      {activeSection === "history" && (
        <div className="rounded-xl border border-border bg-surface-1 p-8 text-center">
          <p className="text-body text-secondary">
            Analysis history will be available in a future update.
          </p>
        </div>
      )}
    </CVAnalysisLayout>
  );
}
