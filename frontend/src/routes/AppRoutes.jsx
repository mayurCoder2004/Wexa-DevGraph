import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "../components/layout/Layout";

import Dashboard from "../pages/Dashboard";
import Projects from "../pages/Projects/Projects";
import Developers from "../pages/Developers/Developers";
import Skills from "../pages/Skills/Skills";
import SkillGap from "../pages/SkillGap/SkillGap";
import Recommendations from "../pages/Recommendations/Recommendations";
import DeveloperGraph from "../pages/DeveloperGraph/DeveloperGraph";
import Settings from "../pages/Settings/Settings";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/developers" element={<Developers />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/skill-gap" element={<SkillGap />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/developer-graph" element={<DeveloperGraph />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default AppRoutes;
