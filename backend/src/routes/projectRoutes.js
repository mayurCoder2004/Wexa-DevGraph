const express = require("express");

const {
  getAllProjects,
  getProject,
  findDevelopersForProject,
} = require("../controllers/projectController");

const router = express.Router();

router.get("/", getAllProjects);
router.get("/:id", getProject);
router.get("/:id/developers", findDevelopersForProject);

module.exports = router;
