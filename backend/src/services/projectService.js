const driver = require("../config/database");
const { getProjectGraph } = require("../queries/graphQueries");

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

module.exports = {
  getProjectGraphService,
};
