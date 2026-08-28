const express = require("express");
const cors = require("cors");
const driver = require("./config/database");

const developerRoutes = require("./routes/developerRoutes");
const graphRoutes = require("./routes/graphRoutes");
const skillRoutes = require("./routes/skillRoutes");
const projectRoutes = require("./routes/projectRoutes");
const skillGapRoutes = require("./routes/skillGapRoutes");
const recommendationRoutes = require("./routes/recommendationRoutes");

require("dotenv").config();

const app = express();

const allowedOrigin =
  process.env.FRONTEND_URL || "http://localhost:5173";

app.use(
  cors({
    origin: allowedOrigin,
  })
);

app.use(express.json());

// Routes
app.use("/api/developers", developerRoutes);
app.use("/api/graph", graphRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/skill-gap", skillGapRoutes);
app.use("/api/recommendations", recommendationRoutes);

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
