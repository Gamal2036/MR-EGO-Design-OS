"use client";

import { Eye, EyeOff, KeyRound } from "lucide-react";
import { forwardRef, useState, type HTMLAttributes } from "react";

import { Input } from "@/components/forms/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/forms/select";
import { Switch } from "@/components/forms/switch";
import { Button } from "@/components/foundation/button";
import { cn } from "@/lib/utils";
import type { ProviderConfig, ProviderId, ProviderSettings as ProviderSettingsType } from "@/types/ai-providers";

const temperaturePresets = [
  { value: "0", label: "Precise (0)" },
  { value: "0.3", label: "Focused (0.3)" },
  { value: "0.7", label: "Balanced (0.7)" },
  { value: "0.9", label: "Creative (0.9)" },
  { value: "1", label: "Maximum (1)" },
];

const topPPresets = [
  { value: "0.1", label: "Strict (0.1)" },
  { value: "0.5", label: "Moderate (0.5)" },
  { value: "0.9", label: "Broad (0.9)" },
  { value: "1", label: "Full (1)" },
];

const maxTokensPresets = [
  { value: "1024", label: "1K" },
  { value: "2048", label: "2K" },
  { value: "4096", label: "4K" },
  { value: "8192", label: "8K" },
  { value: "16384", label: "16K" },
  { value: "32768", label: "32K" },
  { value: "65536", label: "64K" },
  { value: "131072", label: "128K" },
];

const timeoutPresets = [
  { value: "5000", label: "5s" },
  { value: "10000", label: "10s" },
  { value: "15000", label: "15s" },
  { value: "30000", label: "30s" },
  { value: "60000", label: "60s" },
  { value: "120000", label: "2min" },
  { value: "300000", label: "5min" },
];

const retryPresets = [
  { value: "0", label: "No retries" },
  { value: "1", label: "1 retry" },
  { value: "2", label: "2 retries" },
  { value: "3", label: "3 retries" },
  { value: "5", label: "5 retries" },
];

interface ProviderSettingsPanelProps extends HTMLAttributes<HTMLDivElement> {
  provider: ProviderConfig;
  onSave?: (id: ProviderId, settings: ProviderSettingsType) => void;
  onCancel?: () => void;
}

const ProviderSettingsPanel = forwardRef<HTMLDivElement, ProviderSettingsPanelProps>(
  ({ className, provider, onSave, onCancel, ...props }, ref) => {
    const [settings, setSettings] = useState<ProviderSettingsType>({ ...provider.settings });
    const [showKey, setShowKey] = useState(false);

    const handleChange = (key: keyof ProviderSettingsType, value: string | number | boolean) => {
      setSettings((prev) => ({ ...prev, [key]: value }));
    };

    const handleSave = () => {
      onSave?.(provider.id, settings);
    };

    const hasChanges =
      JSON.stringify(settings) !== JSON.stringify(provider.settings);

    return (
      <div
        ref={ref}
        className={cn("space-y-5", className)}
        role="region"
        aria-label={`${provider.name} settings`}
        {...props}
      >
        <div className="space-y-4">
          <h4 className="text-heading-4 text-primary flex items-center gap-2">
            <KeyRound className="h-5 w-5" aria-hidden="true" />
            API Configuration
          </h4>

          <div className="space-y-1.5">
            <label className="text-label text-primary font-medium block" htmlFor="api-key">
              API Key
            </label>
            <div className="relative">
              <Input
                id="api-key"
                type={showKey ? "text" : "password"}
                value={settings.apiKey}
                onChange={(e) => handleChange("apiKey", e.target.value)}
                placeholder={provider.id === "ollama" ? "Not required for local" : "sk-..."}
                className="pr-10"
                disabled={provider.id === "ollama"}
                aria-label="API Key"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showKey ? "Hide API key" : "Show API key"}
              >
                {showKey ? (
                  <EyeOff className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Eye className="h-4 w-4" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-label text-primary font-medium block" htmlFor="base-url">
              Base URL
            </label>
            <Input
              id="base-url"
              type="text"
              value={settings.baseUrl}
              onChange={(e) => handleChange("baseUrl", e.target.value)}
              placeholder={
                provider.id === "ollama"
                  ? "http://localhost:11434"
                  : provider.id === "azure-openai"
                    ? "https://{resource}.openai.azure.com"
                    : "https://api.openai.com/v1"
              }
              aria-label="Base URL"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-label text-primary font-medium block" htmlFor="org-id">
              Organization ID
            </label>
            <Input
              id="org-id"
              type="text"
              value={settings.organizationId}
              onChange={(e) => handleChange("organizationId", e.target.value)}
              placeholder="org-..."
              aria-label="Organization ID"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-heading-4 text-primary">Model Settings</h4>

          <div className="space-y-1.5">
            <label className="text-label text-primary font-medium block" htmlFor="default-model">
              Default Model
            </label>
            <Select
              value={settings.defaultModel}
              onValueChange={(value) => handleChange("defaultModel", value)}
            >
              <SelectTrigger id="default-model" aria-label="Default model">
                <SelectValue placeholder="Select a model" />
              </SelectTrigger>
              <SelectContent>
                {provider.models.map((m) => (
                  <SelectItem key={m.id} value={m.id}>
                    {m.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-label text-primary font-medium block" htmlFor="temperature">
                Temperature
              </label>
              <Select
                value={String(settings.temperature)}
                onValueChange={(value) => handleChange("temperature", parseFloat(value))}
              >
                <SelectTrigger id="temperature" aria-label="Temperature">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {temperaturePresets.map((p) => (
                    <SelectItem key={p.value} value={p.value}>
                      {p.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <label className="text-label text-primary font-medium block" htmlFor="top-p">
                Top P
              </label>
              <Select
                value={String(settings.topP)}
                onValueChange={(value) => handleChange("topP", parseFloat(value))}
              >
                <SelectTrigger id="top-p" aria-label="Top P">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {topPPresets.map((p) => (
                    <SelectItem key={p.value} value={p.value}>
                      {p.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <label className="text-label text-primary font-medium block" htmlFor="max-tokens">
                Max Tokens
              </label>
              <Select
                value={String(settings.maxTokens)}
                onValueChange={(value) => handleChange("maxTokens", parseInt(value, 10))}
              >
                <SelectTrigger id="max-tokens" aria-label="Max tokens">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {maxTokensPresets.map((p) => (
                    <SelectItem key={p.value} value={p.value}>
                      {p.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end pb-2">
              <Switch
                label="Streaming"
                labelPosition="left"
                checked={settings.streaming}
                onCheckedChange={(checked: boolean) => handleChange("streaming", checked)}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-heading-4 text-primary">Advanced Settings</h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-label text-primary font-medium block" htmlFor="timeout">
                Timeout
              </label>
              <Select
                value={String(settings.timeout)}
                onValueChange={(value) => handleChange("timeout", parseInt(value, 10))}
              >
                <SelectTrigger id="timeout" aria-label="Timeout">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {timeoutPresets.map((p) => (
                    <SelectItem key={p.value} value={p.value}>
                      {p.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <label className="text-label text-primary font-medium block" htmlFor="retry-count">
                Retry Count
              </label>
              <Select
                value={String(settings.retryCount)}
                onValueChange={(value) => handleChange("retryCount", parseInt(value, 10))}
              >
                <SelectTrigger id="retry-count" aria-label="Retry count">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {retryPresets.map((p) => (
                    <SelectItem key={p.value} value={p.value}>
                      {p.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2 border-t border-border">
          {onCancel && (
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button variant="primary" onClick={handleSave} disabled={!hasChanges}>
            Save Changes
          </Button>
        </div>
      </div>
    );
  },
);
ProviderSettingsPanel.displayName = "ProviderSettingsPanel";

export { ProviderSettingsPanel };
export type { ProviderSettingsPanelProps };
