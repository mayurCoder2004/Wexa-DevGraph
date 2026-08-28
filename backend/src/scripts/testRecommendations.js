const driver = require("../config/database");

const {
  getDeveloperRecommendationsService,
} = require("../services/recommendationService");

async function testRecommendations() {
  try {
    const projectId = "project-001";

    const result = await getDeveloperRecommendationsService(projectId);

    console.log("\n=== Developer Recommendations ===\n");

    console.log(JSON.stringify(result, null, 2));

    console.log("\n=== Recommendation Test Successful ===\n");
  } catch (error) {
    console.error("\nRecommendation test failed:", error.message);
    process.exitCode = 1;
  } finally {
    await driver.close();
  }
}

testRecommendations();
