import { useEffect, useState } from "react";
import {
  getAllSkills,
  getRelatedSkills,
} from "../../services/api";

function Skills() {
  const [skills, setSkills] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [relatedSkills, setRelatedSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadSkills() {
      try {
        setLoading(true);

        const response = await getAllSkills();

        if (response.success) {
          setSkills(response.data);
        }
      } catch (err) {
        console.error("Failed to load skills:", err);
        setError("Failed to load skills");
      } finally {
        setLoading(false);
      }
    }

    loadSkills();
  }, []);

  async function handleSkillClick(skill) {
    try {
      setSelectedSkill(skill);
      setRelatedSkills([]);
      setDetailsLoading(true);

      const response = await getRelatedSkills(skill.name);

      if (response.success) {
        setRelatedSkills(response.data.relatedSkills || []);
      }
    } catch (err) {
      console.error("Failed to load related skills:", err);
      setRelatedSkills([]);
    } finally {
      setDetailsLoading(false);
    }
  }

  function closeDetails() {
    setSelectedSkill(null);
    setRelatedSkills([]);
  }

  const filteredSkills = skills.filter((skill) =>
    skill.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white">
          Skills
        </h1>

        <p className="mt-2 text-slate-400">
          Explore skills across the developer graph.
        </p>
      </div>

      {/* Search */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search skills..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-slate-500"
        />
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-slate-400">
          Loading skills...
        </p>
      )}

      {/* Error */}
      {error && (
        <p className="text-red-400">
          {error}
        </p>
      )}

      {!loading && !error && (
        <>
          <p className="mb-5 text-sm text-slate-500">
            Showing {filteredSkills.length} of {skills.length} skills
          </p>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredSkills.map((skill) => (
              <div
                key={skill.id}
                onClick={() => handleSkillClick(skill)}
                className="group cursor-pointer rounded-xl border border-slate-800 bg-slate-900 p-5 transition hover:border-slate-600 hover:bg-slate-800/70"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-base font-semibold text-white">
                      {skill.name}
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      {skill.category}
                    </p>
                  </div>

                  <span className="shrink-0 rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                    {skill.developerCount}
                  </span>
                </div>

                <div className="my-4 border-t border-slate-800" />

                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    Developers
                  </span>

                  <span className="text-xs text-slate-500 transition group-hover:text-slate-300">
                    Explore
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredSkills.length === 0 && (
            <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900 p-10 text-center">
              <p className="text-slate-400">
                No skills found.
              </p>

              <p className="mt-2 text-sm text-slate-600">
                Try searching for another skill.
              </p>
            </div>
          )}
        </>
      )}

      {/* Skill Details */}
      {selectedSkill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6">
          <div className="w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-950 p-6 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-slate-500">
                  Skill
                </p>

                <h2 className="mt-1 text-xl font-semibold text-white">
                  {selectedSkill.name}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {selectedSkill.category}
                </p>
              </div>

              <button
                onClick={closeDetails}
                className="rounded-lg px-3 py-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
              >
                X
              </button>
            </div>

            {/* Developer Count */}
            <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900 p-4">
              <p className="text-sm text-slate-500">
                Developers with this skill
              </p>

              <p className="mt-1 text-2xl font-semibold text-white">
                {selectedSkill.developerCount}
              </p>
            </div>

            {/* Related Skills */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-slate-300">
                Related Skills
              </h3>

              {detailsLoading && (
                <p className="mt-3 text-sm text-slate-500">
                  Loading related skills...
                </p>
              )}

              {!detailsLoading && relatedSkills.length === 0 && (
                <p className="mt-3 text-sm text-slate-500">
                  No related skills found.
                </p>
              )}

              {!detailsLoading && relatedSkills.length > 0 && (
                <div className="mt-3 space-y-2">
                  {relatedSkills.map((relatedSkill) => (
                    <div
                      key={relatedSkill.id}
                      className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900 px-4 py-3"
                    >
                      <div>
                        <p className="text-sm font-medium text-white">
                          {relatedSkill.name}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {relatedSkill.category}
                        </p>
                      </div>

                      <span className="text-xs text-slate-600">
                        Related
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Skills;
