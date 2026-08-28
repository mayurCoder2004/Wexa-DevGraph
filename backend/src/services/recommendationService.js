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

    [
      ds IN developerSkills
      WHERE any(required IN requiredSkills
        WHERE toLower(ds.name) = toLower(required.name)
      )
    ] AS matchedSkills

  WITH
    p,
    requiredSkills,
    d,
    developerSkills,
    matchedSkills,

    [
      ds IN developerSkills
      WHERE
        NOT any(required IN requiredSkills
          WHERE toLower(ds.name) = toLower(required.name)
        )
        AND any(required IN requiredSkills
          WHERE EXISTS {
            MATCH (required)-[:RELATED_TO]-(related:Skill)
            WHERE toLower(related.name) = toLower(ds.name)
          }
        )
    ] AS relatedSkills

  WITH
    p,
    requiredSkills,
    d,
    developerSkills,
    matchedSkills,
    relatedSkills,

    [
      required IN requiredSkills
      WHERE
        NOT any(ds IN developerSkills
          WHERE toLower(ds.name) = toLower(required.name)
        )
        AND NOT any(ds IN developerSkills
          WHERE EXISTS {
            MATCH (required)-[:RELATED_TO]-(related:Skill)
            WHERE toLower(related.name) = toLower(ds.name)
          }
        )
    ] AS missingSkills

  WITH
    p,
    requiredSkills,
    d,
    developerSkills,
    matchedSkills,
    relatedSkills,
    missingSkills,

    CASE
      WHEN size(requiredSkills) = 0 THEN 0
      ELSE
        CASE
          WHEN (
            toFloat(size(matchedSkills)) +
            toFloat(size(relatedSkills)) * 0.5
          ) / size(requiredSkills) * 100 > 100
          THEN 100

          ELSE (
            toFloat(size(matchedSkills)) +
            toFloat(size(relatedSkills)) * 0.5
          ) / size(requiredSkills) * 100
        END
    END AS skillMatchScore,

    CASE
      WHEN size(matchedSkills) = 0
        AND size(relatedSkills) = 0
      THEN 0

      WHEN size(matchedSkills) > 0
        AND all(skill IN matchedSkills
          WHERE skill.proficiency = "Advanced"
        )
      THEN 100

      WHEN size(matchedSkills) > 0
        AND all(skill IN matchedSkills
          WHERE skill.proficiency IN ["Advanced", "Intermediate"]
        )
      THEN 85

      WHEN any(skill IN matchedSkills
        WHERE skill.proficiency = "Advanced"
      )
      THEN 80

      WHEN any(skill IN matchedSkills
        WHERE skill.proficiency = "Intermediate"
      )
      THEN 70

      WHEN any(skill IN matchedSkills
        WHERE skill.proficiency = "Beginner"
      )
      THEN 40

      WHEN size(relatedSkills) > 0
      THEN 30

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
    developerSkills,
    matchedSkills,
    relatedSkills,
    missingSkills,
    skillMatchScore,
    proficiencyScore,
    experienceScore,
    roleRelevanceScore,

    CASE
      WHEN (
        skillMatchScore * 0.50 +
        proficiencyScore * 0.20 +
        experienceScore * 0.20 +
        roleRelevanceScore * 0.10
      ) > 100
      THEN 100

      ELSE round(
        skillMatchScore * 0.50 +
        proficiencyScore * 0.20 +
        experienceScore * 0.20 +
        roleRelevanceScore * 0.10
      )
    END AS recommendationScore

  RETURN
    d.id AS id,
    d.name AS name,
    d.role AS role,
    d.experience AS experience,
    d.location AS location,

    [
      skill IN matchedSkills | {
        id: skill.id,
        name: skill.name,
        category: skill.category,
        proficiency: skill.proficiency,
        years: skill.years
      }
    ] AS matchedSkills,

    [
      skill IN relatedSkills | {
        id: skill.id,
        name: skill.name,
        category: skill.category,
        proficiency: skill.proficiency,
        years: skill.years
      }
    ] AS relatedSkills,

    [
      skill IN missingSkills | {
        id: skill.id,
        name: skill.name,
        category: skill.category
      }
    ] AS missingSkills,

    size(matchedSkills) AS matchedSkillCount,
    size(relatedSkills) AS relatedSkillCount,
    size(missingSkills) AS missingSkillCount,
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
    END AS matchLevel,

    [
      CASE
        WHEN size(matchedSkills) = size(requiredSkills)
        THEN "Matches all required skills"

        WHEN size(matchedSkills) > 0
        THEN "Matches " + toString(size(matchedSkills)) +
             " of " + toString(size(requiredSkills)) +
             " required skills"

        ELSE "Does not match any required skills"
      END,

      CASE
        WHEN size(relatedSkills) > 0
        THEN "Has " + toString(size(relatedSkills)) +
             " related skills"

        ELSE null
      END,

      CASE
        WHEN size(missingSkills) > 0
        THEN "Missing " + toString(size(missingSkills)) +
             " required skills"

        ELSE null
      END,

      CASE
        WHEN proficiencyScore = 100
        THEN "Advanced proficiency across matched skills"

        WHEN proficiencyScore = 85
        THEN "Strong proficiency across matched skills"

        WHEN proficiencyScore = 80
        THEN "Has advanced proficiency in matched skills"

        WHEN proficiencyScore = 70
        THEN "Has intermediate proficiency in matched skills"

        WHEN proficiencyScore = 40
        THEN "Has beginner proficiency in matched skills"

        WHEN proficiencyScore = 30
        THEN "Has related skills that provide partial expertise"

        ELSE null
      END,

      CASE
        WHEN roleRelevanceScore = 100
        THEN "Role is highly relevant to the project"

        ELSE "Role has limited relevance to the project"
      END,

      CASE
        WHEN experienceScore = 100
        THEN "5+ years of experience"

        WHEN experienceScore = 80
        THEN "3+ years of experience"

        WHEN experienceScore = 60
        THEN "2+ years of experience"

        WHEN experienceScore = 40
        THEN "1+ year of experience"

        ELSE null
      END
    ] AS rawReasons

  ORDER BY recommendationScore DESC, d.experience DESC, d.name ASC
`;

async function getDeveloperRecommendationsService(projectId) {
  const session = driver.session();

  try {
    // Check whether project exists
    const projectResult = await session.run(
      `
      MATCH (p:Project {id: $projectId})
      RETURN p.id AS projectId
      `,
      { projectId }
    );

    if (projectResult.records.length === 0) {
      return null;
    }

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
      relatedSkills: record.get("relatedSkills"),
      missingSkills: record.get("missingSkills"),

      matchedSkillCount: record.get("matchedSkillCount").toNumber(),
      relatedSkillCount: record.get("relatedSkillCount").toNumber(),
      missingSkillCount: record.get("missingSkillCount").toNumber(),
      requiredSkillCount: record.get("requiredSkillCount").toNumber(),

      skillMatchScore: record.get("skillMatchScore"),
      proficiencyScore: record.get("proficiencyScore"),
      experienceScore: record.get("experienceScore"),
      roleRelevanceScore: record.get("roleRelevanceScore"),

      recommendationScore: record.get("recommendationScore"),
      matchLevel: record.get("matchLevel"),

      reasons: record
        .get("rawReasons")
        .filter((reason) => reason !== null),
    }));
  } finally {
    await session.close();
  }
}

module.exports = {
  getDeveloperRecommendationsService,
};
