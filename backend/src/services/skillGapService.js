const driver = require("../config/database");

const getDeveloperSkillGap = `
  MATCH (d:Developer {id: $developerId})
  MATCH (p:Project {id: $projectId})

  OPTIONAL MATCH (p)-[:REQUIRES]->(required:Skill)
  OPTIONAL MATCH (d)-[:HAS_SKILL]->(developerSkill:Skill)

  WITH
    d,
    p,
    collect(DISTINCT required) AS requiredSkills,
    collect(DISTINCT developerSkill) AS developerSkills

  WITH
    d,
    p,
    requiredSkills,
    developerSkills,

    [
      skill IN requiredSkills
      WHERE any(ds IN developerSkills
        WHERE toLower(ds.name) = toLower(skill.name)
      )
    ] AS matchedSkills,

    [
      skill IN requiredSkills
      WHERE NOT any(ds IN developerSkills
        WHERE toLower(ds.name) = toLower(skill.name)
      )
    ] AS missingSkills

  WITH
    d,
    p,
    requiredSkills,
    developerSkills,
    matchedSkills,
    missingSkills,

    CASE
      WHEN size(requiredSkills) = 0 THEN 0
      ELSE toFloat(size(matchedSkills)) / size(requiredSkills) * 100
    END AS matchPercentage

  RETURN
    d.id AS developerId,
    d.name AS developerName,

    p.id AS projectId,
    p.name AS projectName,

    size(requiredSkills) AS requiredSkillCount,
    size(developerSkills) AS developerSkillCount,
    size(matchedSkills) AS matchedSkillCount,
    size(missingSkills) AS missingSkillCount,

    round(matchPercentage) AS matchPercentage,

    matchedSkills,
    missingSkills
`;

async function getDeveloperSkillGapService(developerId, projectId) {
  const session = driver.session();

  try {
    const result = await session.run(getDeveloperSkillGap, {
      developerId,
      projectId,
    });

    if (result.records.length === 0) {
      return null;
    }

    const record = result.records[0];

    return {
      developer: {
        id: record.get("developerId"),
        name: record.get("developerName"),
      },

      project: {
        id: record.get("projectId"),
        name: record.get("projectName"),
      },

      requiredSkillCount: record.get("requiredSkillCount").toNumber(),

      developerSkillCount: record.get("developerSkillCount").toNumber(),

      matchedSkillCount: record.get("matchedSkillCount").toNumber(),

      missingSkillCount: record.get("missingSkillCount").toNumber(),

      matchPercentage: record.get("matchPercentage"),

      matchedSkills: record.get("matchedSkills").map((skill) => ({
        id: skill.properties.id,
        name: skill.properties.name,
        category: skill.properties.category,
      })),

      missingSkills: record.get("missingSkills").map((skill) => ({
        id: skill.properties.id,
        name: skill.properties.name,
        category: skill.properties.category,
      })),
    };
  } finally {
    await session.close();
  }
}

module.exports = {
  getDeveloperSkillGapService,
};
