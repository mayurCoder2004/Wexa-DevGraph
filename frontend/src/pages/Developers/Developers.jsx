import { useEffect, useMemo, useState } from "react";
import {
  Search,
  MapPin,
  Briefcase,
  Code2,
  X,
} from "lucide-react";

import { getDevelopersBySkill } from "../../services/api";

function Developers() {
  const [developers, setDevelopers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDevelopers() {
      try {
        setLoading(true);
        setError("");

        const response = await getDevelopersBySkill();

        setDevelopers(response.data || []);
      } catch (err) {
        console.error("Failed to load developers:", err);
        setError("Failed to load developers");
      } finally {
        setLoading(false);
      }
    }

    loadDevelopers();
  }, []);

  const filteredDevelopers = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return developers;
    }

    return developers.filter((developer) => {
      const name = developer.name?.toLowerCase() || "";
      const role = developer.role?.toLowerCase() || "";
      const location = developer.location?.toLowerCase() || "";

      const skills = Array.isArray(developer.skills)
        ? developer.skills
            .map((skill) => skill.name?.toLowerCase() || "")
            .join(" ")
        : "";

      return (
        name.includes(query) ||
        role.includes(query) ||
        location.includes(query) ||
        skills.includes(query)
      );
    });
  }, [developers, search]);

  function clearSearch() {
    setSearch("");
  }

  return (
    <div className="min-h-full app-bg p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-white">
            Developers
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Explore developers, their skills, experience and expertise.
          </p>
        </div>

        <div className="mb-6 flex items-center gap-3 rounded-xl border border-slate-800 app-surface-secondary px-4 py-3">
          <Search size={19} className="text-slate-500" />

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by name, role, location or skill..."
            className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
          />

          {search && (
            <button
              onClick={clearSearch}
              className="rounded-md p-1 text-slate-500 transition hover:bg-slate-800 hover:text-white"
            >
              <X size={17} />
            </button>
          )}
        </div>

        {loading && (
          <div className="rounded-xl border border-slate-800 app-surface-secondary p-8 text-center text-slate-400">
            Loading developers...
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-6 text-center text-red-400">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-slate-400">
                Showing{" "}
                <span className="font-medium text-white">
                  {filteredDevelopers.length}
                </span>{" "}
                of{" "}
                <span className="font-medium text-white">
                  {developers.length}
                </span>{" "}
                developers
              </p>
            </div>

            {filteredDevelopers.length === 0 ? (
              <div className="rounded-xl border border-slate-800 app-surface-secondary p-10 text-center">
                <Code2
                  size={32}
                  className="mx-auto mb-3 text-slate-600"
                />

                <h2 className="text-lg font-medium text-white">
                  No developers found
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Try searching for a different name, role, location or skill.
                </p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {filteredDevelopers.map((developer) => (
                  <div
                    key={developer.id}
                    className="rounded-xl border border-slate-800 app-surface-secondary p-5 transition hover:border-slate-700"
                  >
                    <div className="mb-4">
                      <h2 className="text-lg font-semibold text-white">
                        {developer.name}
                      </h2>

                      <p className="mt-1 text-sm text-slate-400">
                        {developer.role}
                      </p>
                    </div>

                    <div className="space-y-2 text-sm text-slate-400">
                      <div className="flex items-center gap-2">
                        <Briefcase size={15} />
                        <span>
                          {developer.experience} years experience
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <MapPin size={15} />
                        <span>{developer.location}</span>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {developer.skills?.map((skill) => (
                        <span
                          key={skill.id}
                          className="rounded-md bg-blue-500/10 px-2.5 py-1 text-xs text-blue-400"
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Developers;
