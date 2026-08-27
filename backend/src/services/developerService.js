const driver = require("../config/database");
const { findDevelopersBySkill } = require("../queries/graphQueries");

async function findDevelopersBySkillService(skillName) {
  const session = driver.session();

  try {
    const result = await session.run(findDevelopersBySkill, {
      skillName,
    });

    return result.records.map((record) => ({
      id: record.get("id"),
      name: record.get("name"),
      role: record.get("role"),
      experience: record.get("experience"),
      location: record.get("location"),
      proficiency: record.get("proficiency"),
      years: record.get("years"),
    }));
  } finally {
    await session.close();
  }
}

module.exports = {
  findDevelopersBySkillService,
};