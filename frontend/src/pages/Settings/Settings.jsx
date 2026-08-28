import { useEffect, useState } from "react";

const DEFAULT_SETTINGS = {
  darkMode: true,
  notifications: true,
  autoRefresh: true,
  showRecommendations: true,
};

function Settings() {
  const [settings, setSettings] = useState(() => {
    try {
      const savedSettings = localStorage.getItem("wexa-settings");

      return savedSettings
        ? { ...DEFAULT_SETTINGS, ...JSON.parse(savedSettings) }
        : DEFAULT_SETTINGS;
    } catch (error) {
      console.error("Failed to load settings:", error);
      return DEFAULT_SETTINGS;
    }
  });

  useEffect(() => {
    localStorage.setItem("wexa-settings", JSON.stringify(settings));

    // Notify other parts of the application
    window.dispatchEvent(
      new CustomEvent("wexa-settings-updated", {
        detail: settings,
      })
    );
  }, [settings]);

  function toggleSetting(key) {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }

  function resetSettings() {
    setSettings(DEFAULT_SETTINGS);
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold app-text-primary">
          Settings
        </h1>

        <p className="mt-2 app-text-muted">
          Configure your Wexa-DevGraph experience.
        </p>
      </div>

      <div className="max-w-3xl space-y-6">
        {/* Appearance */}
        <section className="rounded-xl border border-slate-800 app-surface p-6">
          <div className="mb-5">
            <h2 className="text-base font-semibold app-text-primary">
              Appearance
            </h2>

            <p className="mt-1 text-sm app-text-muted">
              Control how Wexa-DevGraph looks.
            </p>
          </div>

          <SettingRow
            title="Dark Mode"
            description="Use the dark interface across the application."
            enabled={settings.darkMode}
            onToggle={() => toggleSetting("darkMode")}
          />
        </section>

        {/* Notifications */}
        <section className="rounded-xl border border-slate-800 app-surface p-6">
          <div className="mb-5">
            <h2 className="text-base font-semibold app-text-primary">
              Notifications
            </h2>

            <p className="mt-1 text-sm app-text-muted">
              Manage application notifications.
            </p>
          </div>

          <SettingRow
            title="Notifications"
            description="Receive important updates and system notifications."
            enabled={settings.notifications}
            onToggle={() => toggleSetting("notifications")}
          />
        </section>

        {/* Developer Intelligence */}
        <section className="rounded-xl border border-slate-800 app-surface p-6">
          <div className="mb-5">
            <h2 className="text-base font-semibold app-text-primary">
              Developer Intelligence
            </h2>

            <p className="mt-1 text-sm app-text-muted">
              Configure graph and recommendation features.
            </p>
          </div>

          <div className="space-y-5">
            <SettingRow
              title="Auto Refresh"
              description="Automatically refresh developer and project data."
              enabled={settings.autoRefresh}
              onToggle={() => toggleSetting("autoRefresh")}
            />

            <div className="border-t app-border" />

            <SettingRow
              title="Show Recommendations"
              description="Display developer recommendations based on project requirements."
              enabled={settings.showRecommendations}
              onToggle={() => toggleSetting("showRecommendations")}
            />
          </div>
        </section>

        {/* Reset */}
        <section className="rounded-xl border border-slate-800 app-surface p-6">
          <div className="flex items-center justify-between gap-6">
            <div>
              <h2 className="text-base font-semibold app-text-primary">
                Reset Settings
              </h2>

              <p className="mt-1 text-sm app-text-muted">
                Restore all settings to their default values.
              </p>
            </div>

            <button
              type="button"
              onClick={resetSettings}
              className="rounded-lg border app-border-strong app-surface-secondary px-4 py-2 text-sm font-medium app-text-secondary transition hover:border-slate-600 hover:text-white"
            >
              Reset
            </button>
          </div>
        </section>

        {/* About */}
        <section className="rounded-xl border border-slate-800 app-surface p-6">
          <h2 className="text-base font-semibold app-text-primary">
            About
          </h2>

          <div className="mt-4 flex items-center justify-between rounded-lg border app-border app-surface-secondary px-4 py-3">
            <div>
              <p className="text-sm font-medium text-slate-200">
                Wexa-DevGraph
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Developer intelligence and relationship graph platform
              </p>
            </div>

            <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-400">
              v1.0.0
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}

function SettingRow({ title, description, enabled, onToggle }) {
  return (
    <div className="flex items-center justify-between gap-6">
      <div>
        <p className="text-sm font-medium text-slate-200">
          {title}
        </p>

        <p className="mt-1 text-xs leading-5 text-slate-500">
          {description}
        </p>
      </div>

      <button
        type="button"
        onClick={onToggle}
        aria-pressed={enabled}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          enabled ? "setting-toggle-on" : "setting-toggle-off"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full transition ${
            enabled
              ? "left-6 setting-toggle-knob-on"
              : "left-1 setting-toggle-knob-off"
          }`}
        />
      </button>
    </div>
  );
}

export default Settings;
