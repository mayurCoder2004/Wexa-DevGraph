function Dashboard() {
  return (
    <main className="min-h-screen app-bg px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <p className="mb-2 text-sm font-medium text-blue-400">
            Developer Intelligence Platform
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-white">
            Wexa-DevGraph
          </h1>

          <p className="mt-3 max-w-2xl text-slate-400">
            Analyze projects, understand skill gaps, and find the best
            developers for your team.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
            <p className="text-sm text-slate-400">Projects</p>
            <p className="mt-2 text-3xl font-bold text-white">1</p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
            <p className="text-sm text-slate-400">Developers</p>
            <p className="mt-2 text-3xl font-bold text-white">10</p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
            <p className="text-sm text-slate-400">Skills</p>
            <p className="mt-2 text-3xl font-bold text-white">15</p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
