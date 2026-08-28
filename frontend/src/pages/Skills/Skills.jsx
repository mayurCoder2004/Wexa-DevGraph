import { useEffect, useState } from "react";
import { getAllSkills } from "../../services/api";

function Skills() {
  const [skills, setSkills] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
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

  const filteredSkills = skills.filter((skill) =>
    skill.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white">Skills</h1>

        <p className="mt-2 text-slate-400">
          Explore skills across the developer graph.
        </p>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search skills..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-slate-500"
        />
      </div>

      {loading && (
        <p className="text-slate-400">
          Loading skills...
        </p>
      )}

      {error && (
        <p className="text-red-400">
          {error}
        </p>
      )}

      {!loading && !error && (
        <>
          <p className="mb-4 text-sm text-slate-500">
            Showing {filteredSkills.length} of {skills.length} skills
          </p>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredSkills.map((skill) => (
              <div
                key={skill.id}
                className="rounded-xl border border-slate-800 bg-slate-900 p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-medium text-white">
                      {skill.name}
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      {skill.category}
                    </p>
                  </div>

                  <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                    {skill.developerCount} developers
                  </span>
                </div>
              </div>
            ))}
          </div>

          {filteredSkills.length === 0 && (
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-8 text-center">
              <p className="text-slate-400">
                No skills found.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Skills;
