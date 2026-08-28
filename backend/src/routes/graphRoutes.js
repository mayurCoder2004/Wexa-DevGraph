const express = require("express");

const {
  getDeveloperGraph,
  getGraphStats,
} = require("../controllers/graphController");

const router = express.Router();

router.get("/stats", getGraphStats);
router.get("/developers/:id", getDeveloperGraph);

module.exports = router;
