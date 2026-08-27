const express = require("express");
const {
  findDevelopersBySkill,
} = require("../controllers/developerController");

const router = express.Router();

router.get("/by-skill", findDevelopersBySkill);

module.exports = router;
