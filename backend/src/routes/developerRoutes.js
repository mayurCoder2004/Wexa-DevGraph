const express = require("express");

const {
  getAllDevelopers,
  findDevelopersBySkill,
  getDeveloperGraph,
} = require("../controllers/developerController");

const router = express.Router();

router.get("/", getAllDevelopers);
router.get("/by-skill", findDevelopersBySkill);
router.get("/:id/graph", getDeveloperGraph);

module.exports = router;
