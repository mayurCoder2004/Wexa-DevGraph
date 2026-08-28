import { useEffect, useState } from "react";
import {
  FolderKanban,
  Code2,
  Cpu,
  Loader2,
  AlertCircle,
} from "lucide-react";

import { getProject } from "../../services/api";

const PROJECT_ID = "project-001";

function Projects() {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProject() {
      try {
        setLoading(true);
        setError("");

        const response = await getProject(PROJECT_ID);

        if (!response.success) {
          throw new Error(response.message || "Failed to load project");
        }

        setProject(response.data);
      } catch (error) {
        console.error("Failed to load project:", error);
        setError("Unable to load project details.");
      } finally {
        setLoading(false);
      }
    }

    loadProject();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex items-center gap-3 text-slate-400">
          <Loader2 className="animate-spin" size={20} />
          <span>Loading project...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-5 text-red-400">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <p className="mb-2 text-sm font-medium text-blue-400">
          Project Workspace
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-white">
          {project.project.name}
        </h1>

        <p className="mt-2 max-w-3xl text-slate-400">
          {project.project.description}
        </p>
      </div>

      <div className="mb-8 grid gap-5 md:grid-cols-3">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm text-slate-400">Category</span>
            <FolderKanban size={19} className="text-blue-400" />
          </div>

          <p className="text-lg font-semibold text-white">
            {project.project.category}
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm text-slate-400">Required Skills</span>
            <Code2 size={19} className="text-blue-400" />
          </div>

          <p className="text-2xl font-bold text-white">
            {project.skills.length}
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm text-slate-400">Technologies</span>
            <Cpu size={19} className="text-blue-400" />
          </div>

          <p className="text-2xl font-bold text-white">
            {project.technologies.length}
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-white">
              Required Skills
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Skills required for this project
            </p>
          </div>

          <div className="space-y-3">
            {project.skills.map((skill) => (
              <div
                key={skill.id}
                className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950/40 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium text-white">
                    {skill.name}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {skill.category}
                  </p>
                </div>

                <span className="rounded-md bg-blue-500/10 px-2.5 py-1 text-xs font-medium text-blue-400">
                  Required
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-white">
              Technologies
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Technologies used by this project
            </p>
          </div>

          <div className="space-y-3">
            {project.technologies.map((technology) => (
              <div
                key={technology.id}
                className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950/40 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium text-white">
                    {technology.name}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {technology.category}
                  </p>
                </div>

                <span className="rounded-md bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-400">
                  Technology
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Projects;
