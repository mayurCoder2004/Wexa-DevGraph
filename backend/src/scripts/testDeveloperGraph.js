const driver = require("../config/database");
const { getDeveloperGraphService } = require("../services/graphService");

async function testDeveloperGraph() {
  try {
    const developerId = "dev-001";

    const result = await getDeveloperGraphService(developerId);

    console.log("\n=== Developer Graph ===\n");

    console.log(JSON.stringify(result, null, 2));

    console.log("\n=== Graph Query Test Successful ===\n");
  } catch (error) {
    console.error("\nGraph query test failed:", error.message);
    process.exitCode = 1;
  } finally {
    await driver.close();
  }
}

testDeveloperGraph();
