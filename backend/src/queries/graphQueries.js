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

module.exports = {
  findDevelopersBySkill,
  getDeveloperGraph,
};