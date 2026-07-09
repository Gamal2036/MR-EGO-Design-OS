"use client";

import { SettingsIcon } from "lucide-react";
import { useCallback, useEffect } from "react";

import { AIPreferenceCard } from "./ai-preference-card";
import { AppearanceCard } from "./appearance-card";
import { CareerPreferenceCard } from "./career-preference-card";
import { DangerZoneCard } from "./danger-zone-card";
import { GeneralSettingsCard } from "./general-settings";
import { IntegrationCard } from "./integration-card";
import { NotificationCard } from "./notification-card";
import { PrivacyCard } from "./privacy-card";
import { SecurityCard } from "./security-card";
import { SettingsEmptyState } from "./settings-empty-state";
import { SettingsErrorState } from "./settings-error-state";
import { SettingsLoadingState } from "./settings-loading-state";
import { SettingsSidebar } from "./settings-sidebar";
import { StorageCard } from "./storage-card";

import { Breadcrumb } from "@/components/shell/breadcrumb";
import { defaultSettingsData } from "@/data/settings";
import { cn } from "@/lib/utils";
import { useSettingsStore } from "@/stores/settings-store";
import type { SettingsCategory } from "@/types/settings";

function sectionClass(activeCategory: SettingsCategory, sectionId: SettingsCategory): string {
  if (activeCategory === sectionId) return "";
  return "hidden lg:block";
}

export function SettingsLayout() {
  const {
    data,
    viewState,
    activeCategory,
    setViewState,
    setData,
    setActiveCategory,
    updateGeneral,
    updateAppearance,
    updateNotifications,
    updatePrivacy,
    updateAIPreferences,
    updateCareerPreferences,
    updateSecurity,
    updateIntegrations,
  } = useSettingsStore();

  useEffect(() => {
    setViewState("loading");
    const timer = setTimeout(() => {
      setData(defaultSettingsData);
    }, 400);
    return () => clearTimeout(timer);
  }, [setViewState, setData]);

  const handleRetry = useCallback(() => {
    setViewState("loading");
    setTimeout(() => {
      setData(defaultSettingsData);
    }, 400);
  }, [setViewState, setData]);

  const handleInitialize = useCallback(() => {
    setData(defaultSettingsData);
  }, [setData]);

  const handleCategoryChange = useCallback(
    (category: SettingsCategory) => {
      setActiveCategory(category);
      const el = document.getElementById(`settings-panel-${category}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    [setActiveCategory],
  );

  if (viewState === "loading") {
    return <SettingsLoadingState />;
  }

  if (viewState === "error") {
    return <SettingsErrorState onRetry={handleRetry} />;
  }

  if (viewState === "empty" || !data) {
    return <SettingsEmptyState onInitialize={handleInitialize} />;
  }

  return (
    <div className="min-h-0 flex-1">
      <div className="mx-auto w-full max-w-screen-2xl px-5 py-6 md:px-7 md:py-8 lg:px-8 lg:py-10">
        <div className="mb-8">
          <Breadcrumb
            items={[
              { label: "Dashboard", href: "/dashboard" },
              { label: "Settings", icon: SettingsIcon },
            ]}
          />
        </div>

        <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
          <aside className="shrink-0 lg:w-56 lg:sticky lg:top-24 lg:self-start">
            <div className="lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto scrollbar-thin">
              <SettingsSidebar
                activeCategory={activeCategory}
                onCategoryChange={handleCategoryChange}
              />
            </div>
          </aside>

          <div className="flex-1 min-w-0 space-y-8">
            <section
              id="settings-panel-general"
              role="tabpanel"
              aria-labelledby="settings-tab-general"
              className={cn(sectionClass(activeCategory, "general"))}
            >
              <GeneralSettingsCard settings={data.general} onUpdate={updateGeneral} />
            </section>

            <section
              id="settings-panel-appearance"
              role="tabpanel"
              aria-labelledby="settings-tab-appearance"
              className={cn(sectionClass(activeCategory, "appearance"))}
            >
              <AppearanceCard settings={data.appearance} onUpdate={updateAppearance} />
            </section>

            <section
              id="settings-panel-notifications"
              role="tabpanel"
              aria-labelledby="settings-tab-notifications"
              className={cn(sectionClass(activeCategory, "notifications"))}
            >
              <NotificationCard settings={data.notifications} onUpdate={updateNotifications} />
            </section>

            <section
              id="settings-panel-privacy"
              role="tabpanel"
              aria-labelledby="settings-tab-privacy"
              className={cn(sectionClass(activeCategory, "privacy"))}
            >
              <PrivacyCard settings={data.privacy} onUpdate={updatePrivacy} />
            </section>

            <section
              id="settings-panel-ai-preferences"
              role="tabpanel"
              aria-labelledby="settings-tab-ai-preferences"
              className={cn(sectionClass(activeCategory, "ai-preferences"))}
            >
              <AIPreferenceCard settings={data.aiPreferences} onUpdate={updateAIPreferences} />
            </section>

            <section
              id="settings-panel-career-preferences"
              role="tabpanel"
              aria-labelledby="settings-tab-career-preferences"
              className={cn(sectionClass(activeCategory, "career-preferences"))}
            >
              <CareerPreferenceCard settings={data.careerPreferences} onUpdate={updateCareerPreferences} />
            </section>

            <section
              id="settings-panel-security"
              role="tabpanel"
              aria-labelledby="settings-tab-security"
              className={cn(sectionClass(activeCategory, "security"))}
            >
              <SecurityCard settings={data.security} onUpdate={updateSecurity} />
            </section>

            <section
              id="settings-panel-integrations"
              role="tabpanel"
              aria-labelledby="settings-tab-integrations"
              className={cn(sectionClass(activeCategory, "integrations"))}
            >
              <IntegrationCard settings={data.integrations} onUpdate={updateIntegrations} />
            </section>

            <section
              id="settings-panel-storage"
              role="tabpanel"
              aria-labelledby="settings-tab-storage"
              className={cn(sectionClass(activeCategory, "storage"))}
            >
              <StorageCard settings={data.storage} />
            </section>

            <section
              id="settings-panel-danger-zone"
              role="tabpanel"
              aria-labelledby="settings-tab-danger-zone"
              className={cn(sectionClass(activeCategory, "danger-zone"))}
            >
              <DangerZoneCard />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
