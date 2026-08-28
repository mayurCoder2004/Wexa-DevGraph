const driver = require("../config/database");
const { getRelatedSkills } = require("../queries/graphQueries");

async function getRelatedSkillsService(skillName) {
  const session = driver.session();

  try {
    const result = await session.run(getRelatedSkills, {
      skillName,
    });

    if (result.records.length === 0) {
      return null;
    }

    const record = result.records[0];

    return {
      skill: {
        id: record.get("skillId"),
        name: record.get("skillName"),
        category: record.get("category"),
      },
      relatedSkills: record.get("relatedSkills"),
    };
  } finally {
    await session.close();
  }
}

module.exports = {
  getRelatedSkillsService,
};
