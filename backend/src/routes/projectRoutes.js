const express = require("express");

const {
  getProject,
  findDevelopersForProject,
} = require("../controllers/projectController");

const router = express.Router();

router.get("/:id", getProject);
router.get("/:id/developers", findDevelopersForProject);

module.exports = router;
