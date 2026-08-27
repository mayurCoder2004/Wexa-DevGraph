const driver = require("../config/database");
const { getDeveloperGraph } = require("../queries/graphQueries");

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

module.exports = {
  getDeveloperGraphService,
};
