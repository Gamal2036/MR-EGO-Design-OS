"use client";

import { Code, Languages, Plus, Users } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { Badge } from "@/components/foundation/badge";
import { Button } from "@/components/foundation/button";
import { Panel, PanelBody, PanelHeader } from "@/components/foundation/panel";
import { cn } from "@/lib/utils";
import type { Language, Skill, SkillLevel, SkillsLanguages } from "@/types/profile";

interface SkillsLanguagesPanelProps extends HTMLAttributes<HTMLDivElement> {
  skillsLanguages: SkillsLanguages;
}

const levelLabel: Record<SkillLevel, string> = {
  beginner: "bg-surface-0 border-border",
  intermediate: "bg-cyan-500/5 border-cyan-300/30",
  advanced: "bg-cyan-500/10 border-cyan-400/40",
  expert: "bg-cyan-500/15 border-cyan-500/50",
};

const levelColor: Record<SkillLevel, string> = {
  beginner: "text-tertiary",
  intermediate: "text-cyan-600 dark:text-cyan-400",
  advanced: "text-cyan-700 dark:text-cyan-300",
  expert: "text-cyan-800 dark:text-cyan-200",
};

function SkillBadge({ skill }: { skill: Skill }) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-smallest",
        levelLabel[skill.level] || levelLabel.beginner
      )}
    >
      <span className="font-medium text-foreground">{skill.name}</span>
      <span className={cn("capitalize", levelColor[skill.level] || levelColor.beginner)}>
        {skill.level}
      </span>
      {skill.endorsements && (
        <span className="text-tertiary flex items-center gap-0.5 ml-0.5">
          <Users className="h-3 w-3" aria-hidden="true" />
          {skill.endorsements}
        </span>
      )}
    </div>
  );
}

function LanguageBadge({ language }: { language: Language }) {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface-0 px-2.5 py-1 text-smallest">
      <span className="font-medium text-foreground">{language.name}</span>
      <span className="text-tertiary capitalize">{language.level}</span>
      {language.isNative && (
        <Badge variant="neutral" size="xs">Native</Badge>
      )}
    </div>
  );
}

const SkillsLanguagesPanel = forwardRef<HTMLDivElement, SkillsLanguagesPanelProps>(
  ({ className, skillsLanguages, ...props }, ref) => {
    return (
      <Panel
        ref={ref}
        variant="default"
        padding="md"
        className={cn("", className)}
        role="region"
        aria-label="Skills and Languages"
        {...props}
      >
        <PanelHeader>
          <h2 className="text-heading-4 text-primary">Skills & Languages</h2>
        </PanelHeader>
        <PanelBody>
          <div className="space-y-5">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Code className="h-4 w-4 text-cyan" aria-hidden="true" />
                <h3 className="text-body font-medium text-primary">Technical Skills</h3>
                <span className="text-caption text-tertiary">
                  ({skillsLanguages.technical.length})
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {skillsLanguages.technical.map((skill) => (
                  <SkillBadge key={skill.id} skill={skill} />
                ))}
                <Button
                  variant="ghost"
                  size="xs"
                  leftIcon={<Plus className="h-3 w-3" />}
                  disabled
                  title="Coming Soon"
                >
                  Add
                </Button>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <Users className="h-4 w-4 text-cyan" aria-hidden="true" />
                <h3 className="text-body font-medium text-primary">Soft Skills</h3>
                <span className="text-caption text-tertiary">
                  ({skillsLanguages.soft.length})
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {skillsLanguages.soft.map((skill) => (
                  <SkillBadge key={skill.id} skill={skill} />
                ))}
                <Button
                  variant="ghost"
                  size="xs"
                  leftIcon={<Plus className="h-3 w-3" />}
                  disabled
                  title="Coming Soon"
                >
                  Add
                </Button>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <Languages className="h-4 w-4 text-cyan" aria-hidden="true" />
                <h3 className="text-body font-medium text-primary">Languages</h3>
                <span className="text-caption text-tertiary">
                  ({skillsLanguages.languages.length})
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {skillsLanguages.languages.map((language) => (
                  <LanguageBadge key={language.id} language={language} />
                ))}
                <Button
                  variant="ghost"
                  size="xs"
                  leftIcon={<Plus className="h-3 w-3" />}
                  disabled
                  title="Coming Soon"
                >
                  Add
                </Button>
              </div>
            </div>
          </div>
        </PanelBody>
      </Panel>
    );
  }
);
SkillsLanguagesPanel.displayName = "SkillsLanguagesPanel";

export { SkillsLanguagesPanel };
export type { SkillsLanguagesPanelProps };
