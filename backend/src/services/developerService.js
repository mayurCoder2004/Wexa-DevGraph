const driver = require("../config/database");

const {
  getAllDevelopers,
  findDevelopersBySkill,
  getDeveloperGraph,
} = require("../queries/graphQueries");

async function getAllDevelopersService() {
  const session = driver.session();

  try {
    const result = await session.run(getAllDevelopers);

    return result.records.map((record) => ({
      id: record.get("id"),
      name: record.get("name"),
      role: record.get("role"),
      experience: record.get("experience"),
      location: record.get("location"),
      skills: record.get("skills"),
    }));
  } finally {
    await session.close();
  }
}

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
  getAllDevelopersService,
  findDevelopersBySkillService,
  getDeveloperGraphService,
};
