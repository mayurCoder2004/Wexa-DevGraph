import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export async function getProject(projectId) {
  const response = await api.get(`/projects/${projectId}`);

  return response.data;
}

export async function getProjectDevelopers(projectId) {
  const response = await api.get(`/projects/${projectId}/developers`);

  return response.data;
}

export async function getDeveloperRecommendations(projectId) {
  const response = await api.get(
    `/recommendations/projects/${projectId}/developers`
  );

  return response.data;
}
