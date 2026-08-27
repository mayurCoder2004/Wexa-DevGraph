const driver = require("../config/database");

const {
  developers,
  skills,
  technologies,
  projects,
  developerSkills,
  projectTechnologies,
  projectSkills,
  developerProjects,
  relatedSkills,
} = require("../../../seed/data");

async function seedDatabase() {
  const session = driver.session();

  try {
    console.log("\n=== Starting CognoDB Seed ===\n");

    // 1. Create Developer nodes
    await session.run(
      `
      UNWIND $developers AS developer
      MERGE (d:Developer {id: developer.id})
      SET
        d.name = developer.name,
        d.role = developer.role,
        d.experience = developer.experience,
        d.location = developer.location
      `,
      { developers }
    );

    console.log(`? Developers seeded: ${developers.length}`);

    // 2. Create Skill nodes
    await session.run(
      `
      UNWIND $skills AS skill
      MERGE (s:Skill {id: skill.id})
      SET
        s.name = skill.name,
        s.category = skill.category
      `,
      { skills }
    );

    console.log(`? Skills seeded: ${skills.length}`);

    // 3. Create Technology nodes
    await session.run(
      `
      UNWIND $technologies AS technology
      MERGE (t:Technology {id: technology.id})
      SET
        t.name = technology.name,
        t.category = technology.category
      `,
      { technologies }
    );

    console.log(`? Technologies seeded: ${technologies.length}`);

    // 4. Create Project nodes
    await session.run(
      `
      UNWIND $projects AS project
      MERGE (p:Project {id: project.id})
      SET
        p.name = project.name,
        p.description = project.description,
        p.category = project.category
      `,
      { projects }
    );

    console.log(`? Projects seeded: ${projects.length}`);

    // 5. Developer -> Skill relationships
    await session.run(
      `
      UNWIND $developerSkills AS item
      MATCH (d:Developer {id: item.developerId})
      MATCH (s:Skill {id: item.skillId})
      MERGE (d)-[r:HAS_SKILL]->(s)
      SET
        r.proficiency = item.proficiency,
        r.years = item.years
      `,
      { developerSkills }
    );

    console.log(
      `? Developer-Skill relationships seeded: ${developerSkills.length}`
    );

    // 6. Project -> Technology relationships
    await session.run(
      `
      UNWIND $projectTechnologies AS item
      MATCH (p:Project {id: item.projectId})
      MATCH (t:Technology {id: item.technologyId})
      MERGE (p)-[r:USES]->(t)
      SET r.usage = item.usage
      `,
      { projectTechnologies }
    );

    console.log(
      `? Project-Technology relationships seeded: ${projectTechnologies.length}`
    );

    // 7. Project -> Skill relationships
    await session.run(
      `
      UNWIND $projectSkills AS item
      MATCH (p:Project {id: item.projectId})
      MATCH (s:Skill {id: item.skillId})
      MERGE (p)-[:REQUIRES]->(s)
      `,
      { projectSkills }
    );

    console.log(
      `? Project-Skill relationships seeded: ${projectSkills.length}`
    );

    // 8. Developer -> Project relationships
    await session.run(
      `
      UNWIND $developerProjects AS item
      MATCH (d:Developer {id: item.developerId})
      MATCH (p:Project {id: item.projectId})
      MERGE (d)-[r:WORKED_ON]->(p)
      SET
        r.role = item.role,
        r.durationMonths = item.durationMonths
      `,
      { developerProjects }
    );

    console.log(
      `? Developer-Project relationships seeded: ${developerProjects.length}`
    );

    // 9. Skill -> Skill relationships
    await session.run(
      `
      UNWIND $relatedSkills AS item
      MATCH (s1:Skill {id: item[0]})
      MATCH (s2:Skill {id: item[1]})
      MERGE (s1)-[:RELATED_TO]->(s2)
      MERGE (s2)-[:RELATED_TO]->(s1)
      `,
      { relatedSkills }
    );

    console.log(
      `? Related-Skill relationships seeded: ${relatedSkills.length}`
    );

    console.log("\n=== CognoDB Seed Completed Successfully ===\n");
  } catch (error) {
    console.error("\nSeed failed:", error.message);
    process.exitCode = 1;
  } finally {
    await session.close();
    await driver.close();
  }
}

seedDatabase();
