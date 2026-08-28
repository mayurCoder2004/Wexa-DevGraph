const driver = require("../config/database");

const {
  getDeveloperSkillGapService,
} = require("../services/skillGapService");

async function testSkillGap() {
  try {
    const developerId = "dev-001";
    const projectId = "project-001";

    const result = await getDeveloperSkillGapService(
      developerId,
      projectId
    );

    console.log("\n=== Developer Skill Gap ===\n");

    console.log(JSON.stringify(result, null, 2));

    console.log("\n=== Skill Gap Test Successful ===\n");
  } catch (error) {
    console.error("\nSkill gap test failed:", error.message);
    process.exitCode = 1;
  } finally {
    await driver.close();
  }
}

testSkillGap();
