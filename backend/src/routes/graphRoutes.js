const express = require("express");

const {
  getDeveloperGraph,
  getGraphStats,
  getDeveloperProjectTechnology,
} = require("../controllers/graphController");

const router = express.Router();

router.get("/stats", getGraphStats);
router.get("/developers/:id", getDeveloperGraph);
router.get(
  "/developers/:id/project-technologies",
  getDeveloperProjectTechnology
);

module.exports = router;
