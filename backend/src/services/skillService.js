const driver = require("../config/database");

const {
  getAllSkills,
  getRelatedSkills,
} = require("../queries/skillQueries");

async function getAllSkillsService() {
  const session = driver.session();

  try {
    const result = await session.run(getAllSkills);

    return result.records.map((record) => ({
      id: record.get("id"),
      name: record.get("name"),
      category: record.get("category"),
      developerCount: record.get("developerCount").toNumber(),
    }));
  } finally {
    await session.close();
  }
}

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
  getAllSkillsService,
  getRelatedSkillsService,
};
