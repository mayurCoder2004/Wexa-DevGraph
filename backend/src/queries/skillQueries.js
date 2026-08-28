const getAllSkills = `
  MATCH (s:Skill)

  OPTIONAL MATCH (s)<-[:HAS_SKILL]-(d:Developer)

  RETURN
    s.id AS id,
    s.name AS name,
    s.category AS category,
    count(DISTINCT d) AS developerCount

  ORDER BY s.category ASC, s.name ASC
`;

const getRelatedSkills = `
  MATCH (s:Skill)
  WHERE toLower(s.name) = toLower($skillName)

  OPTIONAL MATCH (s)-[r:RELATED_TO]->(related:Skill)

  RETURN
    s.id AS skillId,
    s.name AS skillName,
    s.category AS category,

    collect(DISTINCT {
      id: related.id,
      name: related.name,
      category: related.category,
      relationship: type(r)
    }) AS relatedSkills
`;

module.exports = {
  getAllSkills,
  getRelatedSkills,
};
