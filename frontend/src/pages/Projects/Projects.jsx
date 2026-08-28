import { useEffect, useState } from "react";
import {
  FolderKanban,
  Code2,
  Cpu,
  Loader2,
  AlertCircle,
  ChevronDown,
} from "lucide-react";

import { getAllProjects, getProject } from "../../services/api";

const DEFAULT_PROJECT_ID = "project-001";

function Projects() {
  const [projectList, setProjectList] = useState([]);
  const [selectedId, setSelectedId] = useState(DEFAULT_PROJECT_ID);
  const [project, setProject] = useState(null);

  const [listLoading, setListLoading] = useState(true);
  const [projectLoading, setProjectLoading] = useState(false);
  const [listError, setListError] = useState("");
  const [projectError, setProjectError] = useState("");

  // Load the project list once on mount
  useEffect(() => {
    async function loadProjectList() {
      try {
        setListLoading(true);
        setListError("");

        const response = await getAllProjects();

        if (!response.success) {
          throw new Error(response.message || "Failed to load projects");
        }

        setProjectList(response.data || []);
      } catch (err) {
        console.error("Failed to load project list:", err);
        setListError("Unable to load project list.");
      } finally {
        setListLoading(false);
      }
    }

    loadProjectList();
  }, []);

  // Load project details whenever the selected ID changes
  useEffect(() => {
    if (!selectedId) return;

    async function loadProject() {
      try {
        setProjectLoading(true);
        setProjectError("");
        setProject(null);

        const response = await getProject(selectedId);

        if (!response.success) {
          throw new Error(response.message || "Failed to load project");
        }

        setProject(response.data);
      } catch (err) {
        console.error("Failed to load project:", err);
        setProjectError("Unable to load project details.");
      } finally {
        setProjectLoading(false);
      }
    }

    loadProject();
  }, [selectedId]);

  function handleSelectChange(event) {
    setSelectedId(event.target.value);
  }

  // ── Selector bar ─────────────────────────────────────────────────────────
  const selectorBar = (
    <div className="mb-8">
      <label
        htmlFor="project-select"
        className="mb-2 block text-sm font-medium text-slate-400"
      >
        Select Project
      </label>

      <div className="relative inline-block w-full max-w-sm">
        <select
          id="project-select"
          value={selectedId}
          onChange={handleSelectChange}
          disabled={listLoading || !!listError}
          className="w-full appearance-none rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3 pr-10 text-sm text-white outline-none focus:border-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {listLoading && (
            <option value="">Loading projects…</option>
          )}

          {!listLoading && listError && (
            <option value="">Failed to load projects</option>
          )}

          {!listLoading &&
            !listError &&
            projectList.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
        </select>

        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
        />
      </div>

      {listError && (
        <p className="mt-2 text-xs text-red-400">{listError}</p>
      )}
    </div>
  );

  // ── Loading state for project detail ─────────────────────────────────────
  if (projectLoading) {
    return (
      <div className="p-8">
        {selectorBar}

        <div className="flex items-center gap-3 text-slate-400">
          <Loader2 className="animate-spin" size={20} />
          <span>Loading project…</span>
        </div>
      </div>
    );
  }

  // ── Error state for project detail ───────────────────────────────────────
  if (projectError) {
    return (
      <div className="p-8">
        {selectorBar}

        <div className="flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-5 text-red-400">
          <AlertCircle size={20} />
          <span>{projectError}</span>
        </div>
      </div>
    );
  }

  // ── Empty / initial state ─────────────────────────────────────────────────
  if (!project) {
    return (
      <div className="p-8">
        {selectorBar}
      </div>
    );
  }

  // ── Project detail ────────────────────────────────────────────────────────
  return (
    <div className="p-8">
      {selectorBar}

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
