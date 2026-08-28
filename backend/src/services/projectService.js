const driver = require("../config/database");
const {
  getProjectGraph,
  findDevelopersForProject,
} = require("../queries/graphQueries");

function toNumber(value) {
  if (value && typeof value.toNumber === "function") {
    return value.toNumber();
  }

  return Number(value);
}

async function getProjectGraphService(projectId) {
  const session = driver.session();

  try {
    const result = await session.run(getProjectGraph, {
      projectId,
    });

    if (result.records.length === 0) {
      return null;
    }

    const record = result.records[0];

    return {
      project: {
        id: record.get("projectId"),
        name: record.get("projectName"),
        description: record.get("description"),
        category: record.get("category"),
      },
      skills: record.get("skills"),
      technologies: record.get("technologies"),
    };
  } finally {
    await session.close();
  }
}

async function findDevelopersForProjectService(projectId) {
  const session = driver.session();

  try {
    const result = await session.run(findDevelopersForProject, {
      projectId,
    });

    return result.records.map((record) => ({
      id: record.get("id"),
      name: record.get("name"),
      role: record.get("role"),
      experience: record.get("experience"),
      location: record.get("location"),
      matchedSkills: record.get("matchedSkills"),
      matchedSkillCount: toNumber(record.get("matchedSkillCount")),
      requiredSkillCount: toNumber(record.get("requiredSkillCount")),
      matchPercentage: toNumber(record.get("matchPercentage")),
    }));
  } finally {
    await session.close();
  }
}

module.exports = {
  getProjectGraphService,
  findDevelopersForProjectService,
};
