const findDevelopersBySkill = `
  MATCH (d:Developer)-[r:HAS_SKILL]->(s:Skill)
  WHERE toLower(s.name) = toLower($skillName)
  RETURN
    d.id AS id,
    d.name AS name,
    d.role AS role,
    d.experience AS experience,
    d.location AS location,
    r.proficiency AS proficiency,
    r.years AS years
  ORDER BY r.years DESC, d.name ASC
`;

const getDeveloperGraph = `
  MATCH (d:Developer {id: $developerId})
  OPTIONAL MATCH (d)-[:HAS_SKILL]->(s:Skill)
  OPTIONAL MATCH (s)<-[:REQUIRES]-(p:Project)
  OPTIONAL MATCH (p)-[:USES]->(t:Technology)

  RETURN
    d.id AS developerId,
    d.name AS developerName,
    d.role AS role,
    d.experience AS experience,
    d.location AS location,
    collect(DISTINCT {
      id: s.id,
      name: s.name,
      category: s.category
    }) AS skills,
    collect(DISTINCT {
      id: p.id,
      name: p.name,
      description: p.description,
      category: p.category
    }) AS projects,
    collect(DISTINCT {
      id: t.id,
      name: t.name,
      category: t.category
    }) AS technologies
`;

const getProjectGraph = `
  MATCH (p:Project {id: $projectId})

  OPTIONAL MATCH (p)-[:REQUIRES]->(s:Skill)
  OPTIONAL MATCH (p)-[:USES]->(t:Technology)

  RETURN
    p.id AS projectId,
    p.name AS projectName,
    p.description AS description,
    p.category AS category,

    collect(DISTINCT {
      id: s.id,
      name: s.name,
      category: s.category
    }) AS skills,

    collect(DISTINCT {
      id: t.id,
      name: t.name,
      category: t.category
    }) AS technologies
`;

const getRelatedSkills = `
  MATCH (s:Skill)
  WHERE toLower(s.name) = toLower($skillName)

  OPTIONAL MATCH (s)-[:RELATED_TO]->(related:Skill)

  RETURN
    s.id AS skillId,
    s.name AS skillName,
    s.category AS category,
    collect(DISTINCT {
      id: related.id,
      name: related.name,
      category: related.category
    }) AS relatedSkills
`;

const findDevelopersForProject = `
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
    collect(DISTINCT {
      id: s.id,
      name: s.name,
      proficiency: r.proficiency,
      years: r.years
    }) AS developerSkills

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

  RETURN
    d.id AS id,
    d.name AS name,
    d.role AS role,
    d.experience AS experience,
    d.location AS location,
    matchedSkills,
    size(matchedSkills) AS matchedSkillCount,
    size(requiredSkills) AS requiredSkillCount,
    round(
      toFloat(size(matchedSkills)) /
      CASE
        WHEN size(requiredSkills) = 0 THEN 1
        ELSE size(requiredSkills)
      END * 100
    ) AS matchPercentage

  ORDER BY matchPercentage DESC, d.experience DESC, d.name ASC
`;

module.exports = {
  findDevelopersBySkill,
  getDeveloperGraph,
  getProjectGraph,
  getRelatedSkills,
  findDevelopersForProject,
};
