const driver = require("../config/database");
const {
  getRelatedSkillsService,
} = require("../services/skillService");

async function testRelatedSkills() {
  try {
    const skillName = "Frontend Development";

    const result = await getRelatedSkillsService(skillName);

    console.log("\n=== Related Skills ===\n");

    console.log(JSON.stringify(result, null, 2));

    console.log("\n=== Related Skills Test Successful ===\n");
  } catch (error) {
    console.error("\nRelated skills test failed:", error.message);
    process.exitCode = 1;
  } finally {
    await driver.close();
  }
}

testRelatedSkills();
