const express = require("express");
const driver = require("./config/database");
const developerRoutes = require("./routes/developerRoutes");
const graphRoutes = require("./routes/graphRoutes");

require("dotenv").config();

const app = express();

app.use(express.json());

// Routes
app.use("/api/developers", developerRoutes);
app.use("/api/graph", graphRoutes);

app.get("/health", async (req, res) => {
  const session = driver.session();

  try {
    const result = await session.run(
      'RETURN "CognoDB connection successful" AS message'
    );

    res.json({
      success: true,
      message: result.records[0].get("message"),
    });
  } catch (error) {
    console.error("Database connection error:", error.message);

    res.status(500).json({
      success: false,
      message: "Unable to connect to CognoDB",
    });
  } finally {
    await session.close();
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
