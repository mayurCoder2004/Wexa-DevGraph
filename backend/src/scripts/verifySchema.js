const driver = require("../config/database");

async function verifySchema() {
  const session = driver.session();

  try {
    const result = await session.run("SHOW CONSTRAINTS");

    console.log("\n=== CognoDB Constraints ===\n");

    for (const record of result.records) {
      console.log({
        name: record.get("name"),
        kind: record.get("kind"),
        label: record.get("label"),
        properties: record.get("properties"),
      });
    }

    console.log("\nSchema verification successful.");
  } catch (error) {
    console.error("Schema verification failed:", error.message);
    process.exitCode = 1;
  } finally {
    await session.close();
    await driver.close();
  }
}

verifySchema();
