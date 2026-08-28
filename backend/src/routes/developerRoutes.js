const express = require("express");

const {
  getAllDevelopers,
  findDevelopersBySkill,
} = require("../controllers/developerController");

const router = express.Router();

router.get("/", getAllDevelopers);
router.get("/by-skill", findDevelopersBySkill);

module.exports = router;
