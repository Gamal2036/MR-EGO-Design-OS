"use client";

import { Brain, Plus, Route } from "lucide-react";
import dynamic from "next/dynamic";
import { useCallback, useMemo, useState } from "react";

import { EmptyState } from "@/components/feedback/empty-state";
import { Badge } from "@/components/foundation/badge";
import { IconButton } from "@/components/foundation/icon-button";
import { ProviderCard } from "@/components/providers/cards/provider-card";
import { RemoveProviderDialog, ResetProviderDialog } from "@/components/providers/dialogs/provider-dialogs";
import { ModelBrowser } from "@/components/providers/models/model-browser";
import { ProviderRouterPanel } from "@/components/providers/router/provider-router";
import { ProviderSettingsPanel } from "@/components/providers/settings/provider-settings";
import { ProviderStatusBadge } from "@/components/providers/status/provider-status";
import { ProviderTestingPanel } from "@/components/providers/testing/provider-testing";
import { cn } from "@/lib/utils";
import { useAIProviderStore } from "@/stores/ai-provider-store";
import type { ProviderId, ProviderSettings as ProviderSettingsType } from "@/types/ai-providers";

const DynamicAddProvider = dynamic(
  () =>
    import("@/components/providers/dialogs/provider-dialogs").then((m) => ({
      default: m.AddProviderDialog,
    })),
  { ssr: false },
);

type Panel =
  | { type: "settings"; providerId: ProviderId }
  | { type: "models"; providerId: ProviderId }
  | { type: "testing"; providerId: ProviderId }
  | { type: "router" }
  | null;

export default function ProvidersPage() {
  const providers = useAIProviderStore((s) => s.providers);
  const router = useAIProviderStore((s) => s.router);
  const expandedProvider = useAIProviderStore((s) => s.expandedProvider);
  const removeProvider = useAIProviderStore((s) => s.removeProvider);
  const resetProvider = useAIProviderStore((s) => s.resetProvider);
  const setProviderStatus = useAIProviderStore((s) => s.setProviderStatus);
  const updateProviderSettings = useAIProviderStore((s) => s.updateProviderSettings);
  const setCurrentModel = useAIProviderStore((s) => s.setCurrentModel);
  const toggleModelFavorite = useAIProviderStore((s) => s.toggleModelFavorite);
  const setDefaultProvider = useAIProviderStore((s) => s.setDefaultProvider);
  const setFallbackProvider = useAIProviderStore((s) => s.setFallbackProvider);
  const setPriorityList = useAIProviderStore((s) => s.setPriorityList);
  const setRoutingMode = useAIProviderStore((s) => s.setRoutingMode);

  const [activePanel, setActivePanel] = useState<Panel>(null);
  const [providerToRemove, setProviderToRemove] = useState<ProviderId | null>(null);
  const [providerToReset, setProviderToReset] = useState<ProviderId | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);

  const connectedCount = useMemo(
    () => providers.filter((p) => p.status === "connected").length,
    [providers],
  );

  const totalCount = providers.length;

  const handleEdit = useCallback(
    (id: ProviderId) => {
      setActivePanel({ type: "settings", providerId: id });
    },
    [],
  );

  const handleSettings = useCallback(
    (id: ProviderId) => {
      setActivePanel({ type: "settings", providerId: id });
    },
    [],
  );

  const handleTest = useCallback(
    (id: ProviderId) => {
      setActivePanel({ type: "testing", providerId: id });
    },
    [],
  );

  const handleDelete = useCallback(
    (id: ProviderId) => {
      setProviderToRemove(id);
    },
    [],
  );

  const handleSaveSettings = useCallback(
    (id: ProviderId, settings: ProviderSettingsType) => {
      updateProviderSettings(id, settings);
      setActivePanel(null);
    },
    [updateProviderSettings],
  );

  const handleSelectModel = useCallback(
    (providerId: ProviderId, modelId: string) => {
      setCurrentModel(providerId, modelId);
    },
    [setCurrentModel],
  );

  const handleToggleFavorite = useCallback(
    (providerId: ProviderId, modelId: string) => {
      toggleModelFavorite(providerId, modelId);
    },
    [toggleModelFavorite],
  );

  const handleRunTest = useCallback(
    (id: ProviderId, _test: string) => {
      setProviderStatus(id, "testing");
      setTimeout(() => {
        setProviderStatus(id, "connected");
      }, 3000);
    },
    [setProviderStatus],
  );

  const handleAddProvider = useCallback(
    (_type: string) => {
      setShowAddDialog(false);
    },
    [],
  );

  const removeDialogProvider = useMemo(() => {
    if (!providerToRemove) return null;
    return providers.find((p) => p.id === providerToRemove) ?? null;
  }, [providerToRemove, providers]);

  const resetDialogProvider = useMemo(() => {
    if (!providerToReset) return null;
    return providers.find((p) => p.id === providerToReset) ?? null;
  }, [providerToReset, providers]);

  const activeProviderForPanel = useMemo(() => {
    if (!activePanel || activePanel.type === "router") return null;
    return providers.find((p) => p.id === activePanel.providerId) ?? null;
  }, [activePanel, providers]);

  const availableProviderTypes = [
    { id: "custom", name: "Custom Provider", description: "Bring your own API-compatible provider" },
  ];

  return (
    <div className="flex h-full flex-col gap-6 p-6 overflow-y-auto" role="main" aria-label="Providers management">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-heading-3 text-primary font-bold flex items-center gap-2">
            <Brain className="h-7 w-7 text-primary" aria-hidden="true" />
            AI Providers
          </h1>
          <p className="text-body text-secondary mt-1">
            Manage your AI provider connections and routing configuration.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-caption text-tertiary">
            <span className="inline-flex items-center gap-1">
              <span className="inline-block h-2 w-2 rounded-full bg-success" aria-hidden="true" />
              {connectedCount} connected
            </span>
            <span className="text-tertiary">·</span>
            <span>{totalCount} total</span>
          </div>
          <IconButton
            icon={Route}
            variant="outline"
            size="sm"
            label="Provider Router"
            onClick={() =>
              setActivePanel(
                activePanel?.type === "router" ? null : { type: "router" },
              )
            }
          />
          <IconButton
            icon={Plus}
            variant="primary"
            size="sm"
            label="Add Provider"
            onClick={() => setShowAddDialog(true)}
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className={cn("flex-1 min-w-0 space-y-4", activePanel !== null && "lg:max-w-[50%]")}>
          {providers.length === 0 ? (
            <EmptyState
              icon={<Brain className="h-12 w-12" />}
              title="No providers configured"
              description="Add an AI provider to start building intelligent features."
            />
          ) : (
            providers.map((provider) => (
              <ProviderCard
                key={provider.id}
                provider={provider}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onSettings={handleSettings}
                onTest={handleTest}
                expanded={expandedProvider === provider.id}
              />
            ))
          )}
        </div>

        {activePanel && (
          <div className="w-full lg:w-[50%] min-w-0" role="complementary" aria-label="Provider panel">
            <div className="sticky top-0 rounded-xl border border-border bg-card p-5 shadow-soft">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-heading-4 text-primary">
                  {activePanel.type === "router"
                    ? "Provider Router"
                    : activePanel.type === "settings"
                      ? `${activeProviderForPanel?.name ?? "Provider"} Settings`
                      : activePanel.type === "models"
                        ? `${activeProviderForPanel?.name ?? "Provider"} Models`
                        : `${activeProviderForPanel?.name ?? "Provider"} Testing`}
                </h2>
                <button
                  type="button"
                  onClick={() => setActivePanel(null)}
                  className="text-tertiary hover:text-primary transition-colors text-body"
                  aria-label="Close panel"
                >
                  ×
                </button>
              </div>

              {activePanel.type === "router" && (
                <ProviderRouterPanel
                  providers={providers}
                  router={router}
                  onSetDefaultProvider={setDefaultProvider}
                  onSetFallbackProvider={setFallbackProvider}
                  onSetPriorityList={setPriorityList}
                  onSetRoutingMode={setRoutingMode}
                />
              )}

              {activePanel.type === "settings" && activeProviderForPanel && (
                <>
                  <div className="flex items-center gap-2 mb-4 pb-4 border-b border-border">
                    <ProviderStatusBadge status={activeProviderForPanel.status} />
                    {activeProviderForPanel.currentModel && (
                      <Badge variant="outline" size="xs">
                        {activeProviderForPanel.models.find(
                          (m) => m.id === activeProviderForPanel.currentModel,
                        )?.name ?? activeProviderForPanel.currentModel}
                      </Badge>
                    )}
                  </div>
                  <div className="max-h-[calc(100vh-320px)] overflow-y-auto pr-1">
                    <ProviderSettingsPanel
                      provider={activeProviderForPanel}
                      onSave={handleSaveSettings}
                      onCancel={() => setActivePanel(null)}
                    />
                  </div>
                </>
              )}

              {activePanel.type === "models" && activeProviderForPanel && (
                <ModelBrowser
                  provider={activeProviderForPanel}
                  onSelectModel={(modelId) => handleSelectModel(activeProviderForPanel.id, modelId)}
                  onToggleFavorite={(modelId) =>
                    handleToggleFavorite(activeProviderForPanel.id, modelId)
                  }
                />
              )}

              {activePanel.type === "testing" && activeProviderForPanel && (
                <ProviderTestingPanel
                  provider={activeProviderForPanel}
                  onRunTest={handleRunTest}
                />
              )}
            </div>
          </div>
        )}
      </div>

      {showAddDialog && (
        <DynamicAddProvider
          open={showAddDialog}
          onOpenChange={setShowAddDialog}
          availableTypes={availableProviderTypes}
          onConfirm={handleAddProvider}
        />
      )}

      <RemoveProviderDialog
        open={providerToRemove !== null}
        onOpenChange={(open) => {
          if (!open) setProviderToRemove(null);
        }}
        provider={removeDialogProvider}
        onConfirm={(id) => removeProvider(id)}
      />

      <ResetProviderDialog
        open={providerToReset !== null}
        onOpenChange={(open) => {
          if (!open) setProviderToReset(null);
        }}
        provider={resetDialogProvider}
        onConfirm={(id) => resetProvider(id)}
      />
    </div>
  );
}
