const driver = require("../config/database");
const { getProjectGraphService } = require("../services/projectService");

async function testProjectGraph() {
  try {
    const projectId = "project-001";

    const result = await getProjectGraphService(projectId);

    console.log("\n=== Project Graph ===\n");

    console.log(JSON.stringify(result, null, 2));

    console.log("\n=== Project Graph Test Successful ===\n");
  } catch (error) {
    console.error("\nProject graph test failed:", error.message);
    process.exitCode = 1;
  } finally {
    await driver.close();
  }
}

testProjectGraph();
