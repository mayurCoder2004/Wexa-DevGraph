const driver = require("../config/database");

const getDeveloperRecommendations = `
  MATCH (p:Project {id: $projectId})
  MATCH (p)-[:REQUIRES]->(required:Skill)

  WITH
    p,
    collect(DISTINCT required) AS requiredSkills

  MATCH (d:Developer)
  OPTIONAL MATCH (d)-[r:HAS_SKILL]->(s:Skill)

  WITH
    p,
    requiredSkills,
    d,
    collect(
      DISTINCT CASE
        WHEN s IS NOT NULL THEN {
          id: s.id,
          name: s.name,
          category: s.category,
          proficiency: r.proficiency,
          years: r.years
        }
      END
    ) AS rawDeveloperSkills

  WITH
    p,
    requiredSkills,
    d,
    [skill IN rawDeveloperSkills WHERE skill IS NOT NULL] AS developerSkills

  WITH
    p,
    requiredSkills,
    d,
    developerSkills,

    [required IN requiredSkills
      WHERE any(ds IN developerSkills
        WHERE toLower(ds.name) = toLower(required.name)
      )
    ] AS matchedSkills

  WITH
    p,
    requiredSkills,
    d,
    developerSkills,
    matchedSkills,

    CASE
      WHEN size(requiredSkills) = 0 THEN 0
      ELSE toFloat(size(matchedSkills)) / size(requiredSkills) * 100
    END AS skillMatchScore,

    CASE
      WHEN any(ds IN developerSkills
        WHERE ds.proficiency = "Advanced"
      ) THEN 100
      WHEN any(ds IN developerSkills
        WHERE ds.proficiency = "Intermediate"
      ) THEN 70
      WHEN any(ds IN developerSkills
        WHERE ds.proficiency = "Beginner"
      ) THEN 40
      ELSE 0
    END AS proficiencyScore,

    CASE
      WHEN d.experience >= 5 THEN 100
      WHEN d.experience >= 3 THEN 80
      WHEN d.experience >= 2 THEN 60
      WHEN d.experience >= 1 THEN 40
      ELSE 20
    END AS experienceScore,

    CASE
      WHEN toLower(d.role) CONTAINS "full stack"
        AND (
          any(skill IN requiredSkills
            WHERE toLower(skill.name) CONTAINS "frontend"
          )
          OR
          any(skill IN requiredSkills
            WHERE toLower(skill.name) CONTAINS "backend"
          )
        )
      THEN 100

      WHEN toLower(d.role) CONTAINS "backend"
        AND any(skill IN requiredSkills
          WHERE toLower(skill.name) CONTAINS "backend"
        )
      THEN 100

      WHEN toLower(d.role) CONTAINS "frontend"
        AND any(skill IN requiredSkills
          WHERE toLower(skill.name) CONTAINS "frontend"
        )
      THEN 100

      ELSE 50
    END AS roleRelevanceScore

  WITH
    p,
    requiredSkills,
    d,
    matchedSkills,
    skillMatchScore,
    proficiencyScore,
    experienceScore,
    roleRelevanceScore,

    round(
      skillMatchScore * 0.50 +
      proficiencyScore * 0.20 +
      experienceScore * 0.20 +
      roleRelevanceScore * 0.10
    ) AS recommendationScore

  RETURN
    d.id AS id,
    d.name AS name,
    d.role AS role,
    d.experience AS experience,
    d.location AS location,

    [skill IN matchedSkills | {
      id: skill.id,
      name: skill.name,
      category: skill.category
    }] AS matchedSkills,

    size(matchedSkills) AS matchedSkillCount,
    size(requiredSkills) AS requiredSkillCount,

    round(skillMatchScore) AS skillMatchScore,
    round(proficiencyScore) AS proficiencyScore,
    round(experienceScore) AS experienceScore,
    round(roleRelevanceScore) AS roleRelevanceScore,

    recommendationScore,

    CASE
      WHEN recommendationScore >= 90 THEN "Excellent Match"
      WHEN recommendationScore >= 75 THEN "Strong Match"
      WHEN recommendationScore >= 60 THEN "Good Match"
      WHEN recommendationScore >= 40 THEN "Partial Match"
      ELSE "Poor Match"
    END AS matchLevel

  ORDER BY recommendationScore DESC, d.experience DESC, d.name ASC
`;

async function getDeveloperRecommendationsService(projectId) {
  const session = driver.session();

  try {
    const result = await session.run(getDeveloperRecommendations, {
      projectId,
    });

    return result.records.map((record) => ({
      id: record.get("id"),
      name: record.get("name"),
      role: record.get("role"),
      experience: record.get("experience"),
      location: record.get("location"),
      matchedSkills: record.get("matchedSkills"),
      matchedSkillCount: record.get("matchedSkillCount").toNumber(),
      requiredSkillCount: record.get("requiredSkillCount").toNumber(),
      skillMatchScore: record.get("skillMatchScore"),
      proficiencyScore: record.get("proficiencyScore"),
      experienceScore: record.get("experienceScore"),
      roleRelevanceScore: record.get("roleRelevanceScore"),
      recommendationScore: record.get("recommendationScore"),
      matchLevel: record.get("matchLevel"),
    }));
  } finally {
    await session.close();
  }
}

module.exports = {
  getDeveloperRecommendationsService,
};
