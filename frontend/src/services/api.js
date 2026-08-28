import axios from "axios";

const apiBaseUrl = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace(/\/+$/, "");

const api = axios.create({
  baseURL: apiBaseUrl,
});

export async function getAllProjects() {
  const response = await api.get("/projects");
  return response.data;
}

export async function getProject(projectId) {
  const response = await api.get(`/projects/${projectId}`);
  return response.data;
}

export async function getProjectDevelopers(projectId) {
  const response = await api.get(`/projects/${projectId}/developers`);
  return response.data;
}

export async function getSkillGap(developerId, projectId) {
  const response = await api.get(
    `/skill-gap/developers/${developerId}/projects/${projectId}`
  );
  return response.data;
}

export async function getDeveloperRecommendations(projectId) {
  const response = await api.get(
    `/recommendations/projects/${projectId}/developers`
  );
  return response.data;
}

export async function getDevelopersBySkill(skill) {
  const response = await api.get(
    `/developers/by-skill?skill=${encodeURIComponent(skill)}`
  );
  return response.data;
}

export async function getAllDevelopers() {
  const response = await api.get("/developers");
  return response.data;
}

export async function getAllSkills() {
  const response = await api.get("/skills");
  return response.data;
}

export async function getRelatedSkills(skill) {
  const response = await api.get("/skills/related", {
    params: {
      skill: skill.trim(),
    },
  });

  return response.data;
}

export async function getDeveloperGraph(developerId) {
  const response = await api.get(`/developers/${developerId}/graph`);
  return response.data;
}
