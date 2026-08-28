const driver = require("../config/database");
const {
  findDevelopersForProjectService,
} = require("../services/projectService");

async function testDeveloperProjectMatch() {
  try {
    const projectId = "project-001";

    const result = await findDevelopersForProjectService(projectId);

    console.log("\n=== Developer Project Matches ===\n");

    console.log(JSON.stringify(result, null, 2));

    console.log("\n=== Developer Project Match Test Successful ===\n");
  } catch (error) {
    console.error("\nDeveloper project match test failed:", error.message);
    process.exitCode = 1;
  } finally {
    await driver.close();
  }
}

testDeveloperProjectMatch();
