import { useState } from "react";

function Settings() {
  const [settings, setSettings] = useState({
    darkMode: true,
    notifications: true,
    autoRefresh: true,
    showRecommendations: true,
  });

  function toggleSetting(key) {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white">
          Settings
        </h1>

        <p className="mt-2 text-slate-400">
          Configure your Wexa-DevGraph experience.
        </p>
      </div>

      <div className="max-w-3xl space-y-6">
        {/* Appearance */}
        <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-5">
            <h2 className="text-base font-semibold text-white">
              Appearance
            </h2>

            <p className="mt-1 text-sm text-slate-500">
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
        <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-5">
            <h2 className="text-base font-semibold text-white">
              Notifications
            </h2>

            <p className="mt-1 text-sm text-slate-500">
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
        <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-5">
            <h2 className="text-base font-semibold text-white">
              Developer Intelligence
            </h2>

            <p className="mt-1 text-sm text-slate-500">
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

            <div className="border-t border-slate-800" />

            <SettingRow
              title="Show Recommendations"
              description="Display developer recommendations based on project requirements."
              enabled={settings.showRecommendations}
              onToggle={() => toggleSetting("showRecommendations")}
            />
          </div>
        </section>

        {/* About */}
        <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-base font-semibold text-white">
            About
          </h2>

          <div className="mt-4 flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950 px-4 py-3">
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
          enabled ? "bg-slate-200" : "bg-slate-700"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full transition ${
            enabled
              ? "left-6 bg-slate-900"
              : "left-1 bg-slate-400"
          }`}
        />
      </button>
    </div>
  );
}

export default Settings;
