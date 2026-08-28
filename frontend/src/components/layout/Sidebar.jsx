import {
  BarChart3,
  Code2,
  FolderKanban,
  GitBranch,
  Lightbulb,
  Network,
  Settings,
  Users,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const navigation = [
  {
    label: "Dashboard",
    icon: BarChart3,
    path: "/dashboard",
  },
  {
    label: "Projects",
    icon: FolderKanban,
    path: "/projects",
  },
  {
    label: "Developers",
    icon: Users,
    path: "/developers",
  },
  {
    label: "Skills",
    icon: Code2,
    path: "/skills",
  },
  {
    label: "Skill Gap",
    icon: Lightbulb,
    path: "/skill-gap",
  },
  {
    label: "Recommendations",
    icon: GitBranch,
    path: "/recommendations",
  },
  {
    label: "Developer Graph",
    icon: Network,
    path: "/developer-graph",
  },
];

function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 flex w-64 flex-col border-r border-slate-800 bg-[#0d1320]">
      <div className="flex h-20 items-center border-b border-slate-800 px-6">
        <div>
          <h1 className="text-lg font-bold text-white">
            Wexa-DevGraph
          </h1>

          <p className="mt-1 text-xs text-slate-500">
            Developer Intelligence
          </p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-6">
        <p className="px-3 pb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
          Workspace
        </p>

        <div className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) =>
                  `flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                    isActive
                      ? "bg-blue-500/10 text-blue-400"
                      : "text-slate-400 hover:bg-slate-800/70 hover:text-white"
                  }`
                }
              >
                <Icon size={18} />

                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>

      <div className="border-t border-slate-800 p-3">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
              isActive
                ? "bg-blue-500/10 text-blue-400"
                : "text-slate-400 hover:bg-slate-800/70 hover:text-white"
            }`
          }
        >
          <Settings size={18} />
          <span>Settings</span>
        </NavLink>
      </div>
    </aside>
  );
}

export default Sidebar;
