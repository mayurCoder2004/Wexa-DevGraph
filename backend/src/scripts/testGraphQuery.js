const driver = require("../config/database");
const { findDevelopersBySkill } = require("../queries/graphQueries");

async function testGraphQuery() {
  const session = driver.session();

  try {
    const skillName = "Backend Development";

    const result = await session.run(findDevelopersBySkill, {
      skillName,
    });

    console.log(`\n=== Developers with skill: ${skillName} ===\n`);

    for (const record of result.records) {
      console.log({
        id: record.get("id"),
        name: record.get("name"),
        role: record.get("role"),
        experience: record.get("experience"),
        location: record.get("location"),
        proficiency: record.get("proficiency"),
        years: record.get("years"),
      });
    }

    console.log("\n=== Query Test Successful ===\n");
  } catch (error) {
    console.error("\nQuery test failed:", error.message);
    process.exitCode = 1;
  } finally {
    await session.close();
    await driver.close();
  }
}

testGraphQuery();
