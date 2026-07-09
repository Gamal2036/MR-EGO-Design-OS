"use client";

import { SelectSetting } from "./select-setting";
import { SettingsCard } from "./settings-card";
import { SliderSetting } from "./slider-setting";
import { ToggleSetting } from "./toggle-setting";

import type { AIPreferences } from "@/types/settings";

const providers = [
  { value: "openai", label: "OpenAI" },
  { value: "anthropic", label: "Anthropic" },
  { value: "google", label: "Google AI" },
  { value: "mistral", label: "Mistral AI" },
  { value: "cohere", label: "Cohere" },
];

const modelMap: Record<string, { value: string; label: string }[]> = {
  openai: [
    { value: "gpt-4o", label: "GPT-4o" },
    { value: "gpt-4o-mini", label: "GPT-4o Mini" },
    { value: "o1", label: "o1" },
  ],
  anthropic: [
    { value: "claude-3-opus", label: "Claude 3 Opus" },
    { value: "claude-3-sonnet", label: "Claude 3 Sonnet" },
    { value: "claude-3-haiku", label: "Claude 3 Haiku" },
  ],
  google: [
    { value: "gemini-1.5-pro", label: "Gemini 1.5 Pro" },
    { value: "gemini-1.5-flash", label: "Gemini 1.5 Flash" },
  ],
  mistral: [
    { value: "mistral-large", label: "Mistral Large" },
    { value: "mistral-medium", label: "Mistral Medium" },
  ],
  cohere: [
    { value: "command-r-plus", label: "Command R+" },
    { value: "command-r", label: "Command R" },
  ],
};

interface AIPreferenceCardProps {
  settings: AIPreferences;
  onUpdate: (settings: Partial<AIPreferences>) => void;
}

export function AIPreferenceCard({ settings, onUpdate }: AIPreferenceCardProps) {
  const availableModels = modelMap[settings.defaultProvider] ?? modelMap["openai"] ?? [];

  return (
    <SettingsCard
      title="AI Preferences"
      description="Configure your AI assistant behavior and defaults"
    >
      <div className="divide-y divide-border">
        <SelectSetting
          label="Default Provider"
          description="Select the AI provider for your conversations"
          value={settings.defaultProvider}
          onValueChange={(value) => onUpdate({ defaultProvider: value, defaultModel: modelMap[value]?.[0]?.value ?? "" })}
          options={providers}
        />

        <SelectSetting
          label="Default Model"
          description="Choose the default model for new conversations"
          value={settings.defaultModel}
          onValueChange={(value) => onUpdate({ defaultModel: value })}
          options={availableModels}
        />

        <SliderSetting
          label="Creativity"
          description="Controls randomness in AI responses. Lower is more deterministic."
          value={Math.round(settings.creativity * 100)}
          min={0}
          max={100}
          step={5}
          onValueChange={(value) => onUpdate({ creativity: value / 100 })}
          formatLabel={(v) => `${v}%`}
        />

        <SliderSetting
          label="Response Length"
          description="Maximum number of tokens in AI responses"
          value={settings.responseLength}
          min={256}
          max={4096}
          step={256}
          onValueChange={(value) => onUpdate({ responseLength: value })}
          formatLabel={(v) => `${v}`}
        />

        <ToggleSetting
          label="Auto Suggestions"
          description="Automatically suggest follow-up prompts based on context"
          checked={settings.autoSuggestions}
          onCheckedChange={(checked) => onUpdate({ autoSuggestions: checked })}
        />

        <ToggleSetting
          label="Prompt History"
          description="Save your prompt history for future reference"
          checked={settings.promptHistory}
          onCheckedChange={(checked) => onUpdate({ promptHistory: checked })}
        />
      </div>
    </SettingsCard>
  );
}
