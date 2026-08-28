import { useState } from "react";
import { getProject, getSkillGap } from "../../services/api";

function SkillGap() {
  const [projectId, setProjectId] = useState("");
  const [project, setProject] = useState(null);
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleAnalyze() {
    if (!projectId.trim()) {
      setError("Enter a project ID");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setProject(null);
      setDevelopers([]);

      const [projectResponse, developersResponse] = await Promise.all([
        getProject(projectId.trim()),
        getSkillGap(projectId.trim()),
      ]);

      if (!projectResponse.success) {
        setError("Project not found");
        return;
      }

      setProject(projectResponse.data);
      setDevelopers(developersResponse.data || []);
    } catch (err) {
      console.error("Skill gap error:", err);
      setError("Failed to analyze project skill gap");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white">
          Skill Gap
        </h1>

        <p className="mt-2 text-slate-400">
          Analyze project skill requirements and identify developer gaps.
        </p>
      </div>

      {/* Project Search */}
      <div className="mb-8 flex max-w-xl gap-3">
        <input
          type="text"
          placeholder="Enter project ID..."
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAnalyze();
            }
          }}
          className="flex-1 rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-slate-500"
        />

        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="rounded-lg bg-slate-100 px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 rounded-xl border border-red-900/50 bg-red-950/30 p-4">
          <p className="text-sm text-red-400">
            {error}
          </p>
        </div>
      )}

      {/* Project Information */}
      {project && (
        <>
          <div className="mb-6 rounded-xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-500">
              Project
            </p>

            <h2 className="mt-1 text-xl font-semibold text-white">
              {project.project?.name}
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              {project.project?.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {project.skills?.map((skill) => (
                <span
                  key={skill.id}
                  className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>

          {/* Developer Matches */}
          <div>
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-white">
                Developer Skill Match
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Developers ranked by how well their skills match the project.
              </p>
            </div>

            {developers.length === 0 ? (
              <div className="rounded-xl border border-slate-800 bg-slate-900 p-8 text-center">
                <p className="text-slate-400">
                  No developers found.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {developers.map((developer) => (
                  <div
                    key={developer.id}
                    className="rounded-xl border border-slate-800 bg-slate-900 p-5 transition hover:border-slate-700"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-medium text-white">
                          {developer.name}
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                          {developer.role} · {developer.location}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-lg font-semibold text-white">
                          {developer.matchPercentage}%
                        </p>

                        <p className="text-xs text-slate-500">
                          Match
                        </p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="mb-2 flex justify-between text-xs">
                        <span className="text-slate-500">
                          Skills matched
                        </span>

                        <span className="text-slate-400">
                          {developer.matchedSkillCount} /{" "}
                          {developer.requiredSkillCount}
                        </span>
                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                        <div
                          className="h-full rounded-full bg-slate-400 transition-all"
                          style={{
                            width: `${developer.matchPercentage}%`,
                          }}
                        />
                      </div>
                    </div>

                    {developer.matchedSkills?.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {developer.matchedSkills.map((skill) => (
                          <span
                            key={skill.id}
                            className="rounded-md bg-slate-800 px-2.5 py-1 text-xs text-slate-300"
                          >
                            {skill.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default SkillGap;
