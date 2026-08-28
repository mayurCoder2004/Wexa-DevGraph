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
    [skill IN requiredSkills
      WHERE NOT any(ds IN developerSkills
        WHERE toLower(ds.name) = toLower(skill.name)
      )
    ] AS missingSkills

  RETURN
    d.id AS developerId,
    d.name AS developerName,
    p.id AS projectId,
    p.name AS projectName,
    size(requiredSkills) AS requiredSkillCount,
    size(developerSkills) AS developerSkillCount,
    size(requiredSkills) - size(missingSkills) AS matchedSkillCount,
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
