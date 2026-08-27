const driver = require("../config/database");

async function verifyData() {
  const session = driver.session();

  try {
    console.log("\n=== CognoDB Data Verification ===\n");

    // 1. Node counts
    const nodeResult = await session.run(`
      MATCH (n)
      RETURN labels(n)[0] AS label, count(n) AS count
      ORDER BY label
    `);

    console.log("Node counts:");

    for (const record of nodeResult.records) {
      console.log(
        `${record.get("label")}: ${record.get("count").toNumber()}`
      );
    }

    // 2. Relationship counts
    const relationshipResult = await session.run(`
      MATCH ()-[r]->()
      RETURN type(r) AS relationship, count(r) AS count
      ORDER BY relationship
    `);

    console.log("\nRelationship counts:");

    for (const record of relationshipResult.records) {
      console.log(
        `${record.get("relationship")}: ${record.get("count").toNumber()}`
      );
    }

    // 3. Developer skills
    const developerResult = await session.run(`
      MATCH (d:Developer {id: "dev-001"})-[r:HAS_SKILL]->(s:Skill)
      RETURN d.name AS developer,
             collect({
               skill: s.name,
               proficiency: r.proficiency,
               years: r.years
             }) AS skills
    `);

    console.log("\nDeveloper dev-001:");

    for (const record of developerResult.records) {
      console.log(record.get("developer"));
      console.log(record.get("skills"));
    }

    // 4. Project technologies
    const projectResult = await session.run(`
      MATCH (p:Project {id: "project-001"})-[r:USES]->(t:Technology)
      RETURN p.name AS project,
             collect({
               technology: t.name,
               usage: r.usage
             }) AS technologies
    `);

    console.log("\nProject project-001:");

    for (const record of projectResult.records) {
      console.log(record.get("project"));
      console.log(record.get("technologies"));
    }

    // 5. Developer -> Project
    const developerProjectsResult = await session.run(`
      MATCH (d:Developer {id: "dev-001"})-[r:WORKED_ON]->(p:Project)
      RETURN d.name AS developer,
             collect({
               project: p.name,
               role: r.role,
               durationMonths: r.durationMonths
             }) AS projects
    `);

    console.log("\nDeveloper projects:");

    for (const record of developerProjectsResult.records) {
      console.log(record.get("developer"));
      console.log(record.get("projects"));
    }

    // 6. Related skills
    const relatedSkillsResult = await session.run(`
      MATCH (s:Skill {id: "skill-001"})-[:RELATED_TO]->(related:Skill)
      RETURN s.name AS skill,
             collect(related.name) AS relatedSkills
    `);

    console.log("\nRelated skills:");

    for (const record of relatedSkillsResult.records) {
      console.log(record.get("skill"));
      console.log(record.get("relatedSkills"));
    }

    console.log("\n=== Data Verification Successful ===\n");
  } catch (error) {
    console.error("\nData verification failed:", error.message);
    process.exitCode = 1;
  } finally {
    await session.close();
    await driver.close();
  }
}

verifyData();
