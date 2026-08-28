import { useEffect, useState } from "react";
import {
  getAllDevelopers,
  getDeveloperGraph,
} from "../../services/api";

import DeveloperGraphCanvas from "./DeveloperGraphCanvas";

function DeveloperGraph() {
  const [developers, setDevelopers] = useState([]);
  const [developerId, setDeveloperId] = useState("");
  const [data, setData] = useState(null);
  const [loadingDevelopers, setLoadingDevelopers] = useState(true);
  const [loadingGraph, setLoadingGraph] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDevelopers() {
      try {
        const response = await getAllDevelopers();

        if (response.success) {
          setDevelopers(response.data || []);
        }
      } catch (err) {
        console.error("Failed to load developers:", err);
        setError("Failed to load developers");
      } finally {
        setLoadingDevelopers(false);
      }
    }

    loadDevelopers();
  }, []);

  async function handleViewGraph() {
    if (!developerId) {
      setError("Select a developer");
      return;
    }

    try {
      setLoadingGraph(true);
      setError("");

      const response = await getDeveloperGraph(developerId);

      if (!response.success) {
        setError("Developer not found");
        return;
      }

      setData(response.data);
    } catch (err) {
      console.error("Developer graph error:", err);
      setError("Failed to load developer graph");
    } finally {
      setLoadingGraph(false);
    }
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white">
          Developer Graph
        </h1>

        <p className="mt-2 text-slate-400">
          Explore the relationships between developers, skills, projects,
          and technologies.
        </p>
      </div>

      {/* Developer Selector */}
      <div className="mb-8 flex max-w-xl gap-3">
        <select
          value={developerId}
          onChange={(e) => setDeveloperId(e.target.value)}
          disabled={loadingDevelopers}
          className="flex-1 rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-slate-500"
        >
          <option value="">
            {loadingDevelopers
              ? "Loading developers..."
              : "Select a developer"}
          </option>

          {developers.map((developer) => (
            <option key={developer.id} value={developer.id}>
              {developer.name} · {developer.role}
            </option>
          ))}
        </select>

        <button
          onClick={handleViewGraph}
          disabled={loadingGraph || loadingDevelopers}
          className="rounded-lg bg-slate-100 px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loadingGraph ? "Loading..." : "View Graph"}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 rounded-xl border border-red-900/50 bg-red-950/30 p-4">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      {/* Developer Overview */}
      {data && (
        <>
          <div className="mb-6 rounded-xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-500">
              Developer
            </p>

            <div className="mt-1 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white">
                  {data.developer.name}
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  {data.developer.role} · {data.developer.location}
                </p>
              </div>

              <div className="text-right">
                <p className="text-2xl font-semibold text-white">
                  {data.developer.experience}
                </p>

                <p className="text-xs text-slate-500">
                  Years Experience
                </p>
              </div>
            </div>
          </div>

          {/* Graph */}
          <DeveloperGraphCanvas data={data} />

          {/* Relationship Summary */}
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {/* Skills */}
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-medium text-white">
                  Skills
                </h2>

                <span className="rounded-full bg-slate-800 px-2.5 py-1 text-xs text-slate-400">
                  {data.skills?.length || 0}
                </span>
              </div>

              <div className="space-y-2">
                {data.skills?.map((skill) => (
                  <div
                    key={skill.id}
                    className="rounded-lg border border-slate-800 bg-slate-950 p-3"
                  >
                    <p className="text-sm text-slate-200">
                      {skill.name}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {skill.category}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Projects */}
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-medium text-white">
                  Projects
                </h2>

                <span className="rounded-full bg-slate-800 px-2.5 py-1 text-xs text-slate-400">
                  {data.projects?.length || 0}
                </span>
              </div>

              <div className="space-y-2">
                {data.projects?.map((project) => (
                  <div
                    key={project.id}
                    className="rounded-lg border border-slate-800 bg-slate-950 p-3"
                  >
                    <p className="text-sm text-slate-200">
                      {project.name}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {project.category}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies */}
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-medium text-white">
                  Technologies
                </h2>

                <span className="rounded-full bg-slate-800 px-2.5 py-1 text-xs text-slate-400">
                  {data.technologies?.length || 0}
                </span>
              </div>

              <div className="space-y-2">
                {data.technologies?.map((technology) => (
                  <div
                    key={technology.id}
                    className="rounded-lg border border-slate-800 bg-slate-950 p-3"
                  >
                    <p className="text-sm text-slate-200">
                      {technology.name}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {technology.category}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default DeveloperGraph;
