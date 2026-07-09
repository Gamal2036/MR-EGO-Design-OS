"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useCallback, useState } from "react";

import {
  AIAnalysisPreview,
  CompletionCard,
  CVUploadCard,
  ExperienceSelector,
  GoalSelector,
  JobPreferenceForm,
  OnboardingNavigation,
  OnboardingProgress,
  OnboardingStepper,
  ProfileBasicsForm,
  SkillsSelector,
} from "@/components/onboarding";
import type {
  JobPreferenceFormData,
  ProfileBasicsFormData,
} from "@/components/onboarding";

const TOTAL_STEPS = 8;

interface OnboardingState {
  goal: string;
  profile: ProfileBasicsFormData;
  skills: string[];
  experience: string;
  cv: File | null;
  preferences: JobPreferenceFormData;
}

const INITIAL_STATE: OnboardingState = {
  goal: "",
  profile: {
    fullName: "",
    professionalTitle: "",
    location: "",
  },
  skills: [],
  experience: "",
  cv: null,
  preferences: {
    jobType: "",
    workLocation: "",
    salaryMin: "",
    salaryMax: "",
    industry: "",
  },
};

const STEP_HEADINGS = [
  {
    title: "Welcome to MR:EGO",
    description: "Your AI-powered career companion. Let's set up your profile in just a few steps.",
  },
  {
    title: "What brings you here?",
    description: "Choose your primary career goal so we can tailor the experience for you.",
  },
  {
    title: "Tell us about yourself",
    description: "Start building your professional profile with the basics.",
  },
  {
    title: "Skills & Experience",
    description: "Add your key skills and let us know your experience level.",
  },
  {
    title: "Upload your CV",
    description: "Upload your existing CV and we'll extract the details automatically.",
  },
  {
    title: "AI Profile Analysis",
    description: "Watch as MR:EGO AI analyzes your profile and generates insights.",
  },
  {
    title: "Job Preferences",
    description: "Tell us what you're looking for so we can find the right matches.",
  },
  {
    title: "You're all set!",
    description: "",
  },
];

const pageVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

const pageTransition = {
  duration: 0.3,
  ease: [0.16, 1, 0.3, 1],
};

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [state, setState] = useState<OnboardingState>(INITIAL_STATE);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [loading, setLoading] = useState(false);

  const canContinue = useCallback((): boolean => {
    switch (currentStep) {
      case 1:
        return true;
      case 2:
        return state.goal !== "";
      case 3:
        return state.profile.fullName.trim().length > 0;
      case 4:
        return state.skills.length > 0 && state.experience !== "";
      case 5:
        return true;
      case 6:
        return analysisComplete;
      case 7:
        return state.preferences.jobType !== "" && state.preferences.workLocation !== "";
      case 8:
        return true;
      default:
        return false;
    }
  }, [currentStep, state, analysisComplete]);

  const handleContinue = useCallback(() => {
    if (currentStep === 5 && state.cv) {
      setIsAnalyzing(true);
      setCurrentStep(6);
      return;
    }

    if (currentStep === 8) return;

    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);
    }
  }, [currentStep, state.cv]);

  const handleBack = useCallback(() => {
    if (currentStep > 1) {
      if (currentStep === 6 && analysisComplete) {
        setAnalysisComplete(false);
        setIsAnalyzing(false);
      }
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep, analysisComplete]);

  const handleAnalysisComplete = useCallback(() => {
    setAnalysisComplete(true);
  }, []);

  const handleFinish = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setCurrentStep(8);
      setLoading(false);
    }, 300);
  }, []);

  const stepLabel = currentStep <= TOTAL_STEPS ? STEP_HEADINGS[currentStep - 1] : null;

  const renderStep = () => {
    const stepContent = (() => {
      switch (currentStep) {
        case 1:
          return <WelcomeStep />;
        case 2:
          return (
            <GoalSelector
              value={state.goal}
              onChange={(goal) => setState((s) => ({ ...s, goal }))}
            />
          );
        case 3:
          return (
            <ProfileBasicsForm
              value={state.profile}
              onChange={(profile) => setState((s) => ({ ...s, profile }))}
            />
          );
        case 4:
          return (
            <div className="space-y-6">
              <SkillsSelector
                value={state.skills}
                onChange={(skills) => setState((s) => ({ ...s, skills }))}
              />
              <hr className="border-border" />
              <div>
                <h3 className="text-label font-semibold text-primary mb-3">
                  Experience Level
                </h3>
                <ExperienceSelector
                  value={state.experience}
                  onChange={(exp) => setState((s) => ({ ...s, experience: exp }))}
                />
              </div>
            </div>
          );
        case 5:
          return (
            <CVUploadCard
              value={state.cv}
              onChange={(cv) => setState((s) => ({ ...s, cv }))}
            />
          );
        case 6:
          return (
            <AIAnalysisPreview
              isAnalyzing={isAnalyzing}
              onComplete={handleAnalysisComplete}
            />
          );
        case 7:
          return (
            <JobPreferenceForm
              value={state.preferences}
              onChange={(preferences) => setState((s) => ({ ...s, preferences }))}
            />
          );
        case 8:
          return <CompletionCard />;
        default:
          return null;
      }
    })();

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={pageTransition}
        >
          {stepContent}
        </motion.div>
      </AnimatePresence>
    );
  };

  const getContinueLabel = () => {
    if (currentStep === 5 && state.cv) return "Analyze my CV";
    if (currentStep === 6 && analysisComplete) return "Continue";
    if (currentStep === 7) return "Complete Setup";
    if (currentStep === 8) return "";
    return "Continue";
  };

  return (
    <div className="flex flex-col flex-1 gap-5 md:gap-6">
      <OnboardingStepper
        currentStep={currentStep}
        totalSteps={TOTAL_STEPS}
        className="hidden md:block"
      />

      <OnboardingProgress
        currentStep={currentStep}
        totalSteps={TOTAL_STEPS}
        className="md:hidden"
      />

      <div className="flex-1 flex flex-col">
        {stepLabel && currentStep !== 8 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mb-5 md:mb-6"
          >
            <h1 className="text-heading-2 md:text-heading-1 text-primary font-semibold">
              {stepLabel.title}
            </h1>
            {stepLabel.description && (
              <p className="text-body text-secondary mt-1.5">
                {stepLabel.description}
              </p>
            )}
          </motion.div>
        )}

        <div className="flex-1">{renderStep()}</div>

        {currentStep < 8 && (
          <OnboardingNavigation
            onBack={currentStep > 1 ? handleBack : undefined}
            onContinue={
              currentStep === 7
                ? handleFinish
                : currentStep === 6 && !analysisComplete
                  ? () => {}
                  : handleContinue
            }
            continueLabel={getContinueLabel()}
            loading={loading}
            disabled={
              currentStep === 6
                ? !analysisComplete
                : loading || !canContinue()
            }
            hideBack={currentStep === 1}
          />
        )}
      </div>
    </div>
  );
}

function WelcomeStep() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center text-center py-6 md:py-10"
    >
      <div className="flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-2xl bg-ai/10 mb-5">
        <Sparkles className="h-8 w-8 md:h-10 md:w-10 text-ai" aria-hidden="true" />
      </div>
      <p className="text-body text-secondary max-w-md">
        We&apos;ll guide you through setting up your career profile. It takes
        just a few minutes and you can always update later.
      </p>
      <div className="grid grid-cols-2 gap-3 w-full max-w-sm mt-8">
        <div className="text-center p-4 rounded-xl bg-surface-2">
          <p className="text-heading-3 font-bold text-primary">3</p>
          <p className="text-caption text-secondary">minutes</p>
        </div>
        <div className="text-center p-4 rounded-xl bg-surface-2">
          <p className="text-heading-3 font-bold text-primary">8</p>
          <p className="text-caption text-secondary">simple steps</p>
        </div>
      </div>
    </motion.div>
  );
}
