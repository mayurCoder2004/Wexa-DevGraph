const getAllProjects = `
  MATCH (p:Project)
  OPTIONAL MATCH (p)-[:REQUIRES]->(s:Skill)

  RETURN
    p.id AS id,
    p.name AS name,
    p.description AS description,
    p.category AS category,
    collect(DISTINCT {
      id: s.id,
      name: s.name,
      category: s.category
    }) AS skills

  ORDER BY p.name ASC
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
    [
      required IN requiredSkills
      WHERE any(ds IN developerSkills
        WHERE toLower(ds.name) = toLower(required.name)
      )
    ] AS matchedRequiredSkills

  WITH
    p,
    requiredSkills,
    d,
    developerSkills,
    matchedRequiredSkills,
    [
      ds IN developerSkills
      WHERE any(required IN requiredSkills
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
    size(matchedRequiredSkills) AS matchedSkillCount,
    size(requiredSkills) AS requiredSkillCount,
    round(
      toFloat(size(matchedRequiredSkills)) /
      CASE
        WHEN size(requiredSkills) = 0 THEN 1
        ELSE size(requiredSkills)
      END * 100
    ) AS matchPercentage

  ORDER BY matchPercentage DESC, d.experience DESC, d.name ASC
`;

module.exports = {
  getAllProjects,
  findDevelopersForProject,
};
