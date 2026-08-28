const driver = require("../config/database");
const {
  getDeveloperGraph,
  getGraphStats,
} = require("../queries/graphQueries");

async function getDeveloperGraphService(developerId) {
  const session = driver.session();

  try {
    const result = await session.run(getDeveloperGraph, {
      developerId,
    });

    if (result.records.length === 0) {
      return null;
    }

    const record = result.records[0];

    return {
      developer: {
        id: record.get("developerId"),
        name: record.get("developerName"),
        role: record.get("role"),
        experience: record.get("experience"),
        location: record.get("location"),
      },
      skills: record.get("skills"),
      projects: record.get("projects"),
      technologies: record.get("technologies"),
    };
  } finally {
    await session.close();
  }
}

async function getGraphStatsService() {
  const session = driver.session();

  try {
    const result = await session.run(getGraphStats);

    if (result.records.length === 0) {
      return null;
    }

    const record = result.records[0];

    return {
      developers: record.get("developerCount").toNumber(),
      projects: record.get("projectCount").toNumber(),
      skills: record.get("skillCount").toNumber(),
      technologies: record.get("technologyCount").toNumber(),
      relationships: {
        developerSkills: record
          .get("developerSkillRelationshipCount")
          .toNumber(),
        projectSkills: record
          .get("projectSkillRelationshipCount")
          .toNumber(),
        projectTechnologies: record
          .get("projectTechnologyRelationshipCount")
          .toNumber(),
      },
    };
  } finally {
    await session.close();
  }
}

module.exports = {
  getDeveloperGraphService,
  getGraphStatsService,
};
