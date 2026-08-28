import { useState } from "react";
import { getDeveloperRecommendations } from "../../services/api";

function Recommendations() {
  const [projectId, setProjectId] = useState("project-001");
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");

  async function handleFindDevelopers() {
    if (!projectId.trim()) {
      setError("Enter a project ID");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSearched(false);

      const response = await getDeveloperRecommendations(
        projectId.trim()
      );

      if (!response.success) {
        setError("Could not find recommendations for this project");
        setRecommendations([]);
        return;
      }

      const result = response.data;

      const recommendationList = Array.isArray(result)
        ? result
        : result?.recommendations || result?.data || [];

      setRecommendations(recommendationList);
      setSearched(true);
    } catch (err) {
      console.error("Recommendation error:", err);
      setError("Failed to load recommendations");
      setRecommendations([]);
    } finally {
      setLoading(false);
    }
  }

  function getScoreClass(score) {
    if (score >= 90) {
      return "text-emerald-400";
    }

    if (score >= 75) {
      return "text-amber-400";
    }

    return "text-red-400";
  }

  function getMatchClass(level) {
    if (level === "Excellent Match") {
      return "border-emerald-900/50 bg-emerald-950/30 text-emerald-400";
    }

    if (level === "Strong Match") {
      return "border-blue-900/50 bg-blue-950/30 text-blue-400";
    }

    return "border-slate-700 bg-slate-800 text-slate-400";
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white">
          Recommendations
        </h1>

        <p className="mt-2 text-slate-400">
          Find the best developers for each project based on
          skills, experience, proficiency, and role relevance.
        </p>
      </div>

      {/* Search */}
      <div className="mb-8 max-w-3xl rounded-xl border border-slate-800 bg-slate-900 p-5">
        <label className="mb-2 block text-sm font-medium text-slate-300">
          Project ID
        </label>

        <div className="flex gap-3">
          <input
            type="text"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
            placeholder="e.g. project-001"
            className="flex-1 rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-slate-500"
          />

          <button
            onClick={handleFindDevelopers}
            disabled={loading}
            className="rounded-lg bg-slate-100 px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Finding..." : "Find Developers"}
          </button>
        </div>

        <p className="mt-2 text-xs text-slate-600">
          Try project-001
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 max-w-3xl rounded-xl border border-red-900/50 bg-red-950/30 p-4">
          <p className="text-sm text-red-400">
            {error}
          </p>
        </div>
      )}

      {/* Results */}
      {searched && !loading && (
        <div>
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">
                Recommended Developers
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Ranked by overall project fit
              </p>
            </div>

            <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-400">
              {recommendations.length} developers
            </span>
          </div>

          {recommendations.length === 0 ? (
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-8 text-center">
              <p className="text-slate-400">
                No matching developers found.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {recommendations.map((developer, index) => (
                <div
                  key={developer.developerId || index}
                  className="rounded-xl border border-slate-800 bg-slate-900 p-6 transition hover:border-slate-700"
                >
                  {/* Top */}
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-slate-600">
                          #{index + 1}
                        </span>

                        <h3 className="text-lg font-semibold text-white">
                          {developer.name}
                        </h3>
                      </div>

                      <p className="mt-1 text-sm text-slate-400">
                        {developer.role}
                      </p>

                      <p className="mt-1 text-xs text-slate-600">
                        {developer.location} Ã‚Â·{" "}
                        {developer.experience} years experience
                      </p>
                    </div>

                    <div className="text-right">
                      <p
                        className={`text-3xl font-semibold ${getScoreClass(
                          developer.recommendationScore
                        )}`}
                      >
                        {developer.recommendationScore}
                      </p>

                      <p className="text-xs text-slate-600">
                        Match Score
                      </p>
                    </div>
                  </div>

                  {/* Match Level */}
                  <div className="mt-5">
                    <span
                      className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${getMatchClass(
                        developer.matchLevel
                      )}`}
                    >
                      {developer.matchLevel}
                    </span>
                  </div>

                  {/* Score Breakdown */}
                  <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    <ScoreCard
                      label="Skill Match"
                      value={developer.skillMatchScore}
                    />

                    <ScoreCard
                      label="Proficiency"
                      value={developer.proficiencyScore}
                    />

                    <ScoreCard
                      label="Experience"
                      value={developer.experienceScore}
                    />

                    <ScoreCard
                      label="Role Relevance"
                      value={developer.roleRelevanceScore}
                    />
                  </div>

                  {/* Matched Skills */}
                  {developer.matchedSkills?.length > 0 && (
                    <div className="mt-6 border-t border-slate-800 pt-5">
                      <p className="mb-3 text-xs font-medium uppercase tracking-wide text-slate-500">
                        Matched Skills
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {developer.matchedSkills.map((skill, index) => (
                          <span
                            key={skill.id || skill.name || index}
                            className="rounded-md border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs text-slate-300"
                          >
                            {skill.name || skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Initial State */}
      {!searched && !loading && !error && (
        <div className="max-w-3xl rounded-xl border border-dashed border-slate-800 bg-slate-950 p-10 text-center">
          <p className="text-sm text-slate-500">
            Enter a project ID and find the best developers
            for that project.
          </p>
        </div>
      )}
    </div>
  );
}

function ScoreCard({ label, value }) {
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-950 p-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-500">
          {label}
        </p>

        <p className="text-sm font-semibold text-white">
          {value}
        </p>
      </div>

      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-slate-400"
          style={{
            width: `${Math.min(Number(value) || 0, 100)}%`,
          }}
        />
      </div>
    </div>
  );
}

export default Recommendations;

