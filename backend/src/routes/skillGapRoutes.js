const express = require("express");

const {
  getSkillGap,
} = require("../controllers/skillGapController");

const router = express.Router();

router.get(
  "/developers/:developerId/projects/:projectId",
  getSkillGap
);

module.exports = router;
