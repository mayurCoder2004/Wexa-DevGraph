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

module.exports = {
  findDevelopersBySkill,
};
