const fs = require("fs");
const path = require("path");
const driver = require("../config/database");

async function applySchema() {
  const session = driver.session();

  try {
    const schemaPath = path.join(
      __dirname,
      "../../../cypher/schema.cypher"
    );

    const schema = fs.readFileSync(schemaPath, "utf8");

    const statements = schema
      .split(";")
      .map((statement) => statement.trim())
      .filter(Boolean);

    for (const statement of statements) {
      console.log("Executing:", statement.split("\n")[0]);
      await session.run(statement);
    }

    console.log("Graph schema applied successfully.");
  } catch (error) {
    console.error("Failed to apply graph schema:", error.message);
    process.exitCode = 1;
  } finally {
    await session.close();
    await driver.close();
  }
}

applySchema();
