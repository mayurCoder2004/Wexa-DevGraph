const express = require("express");
const {
  getRelatedSkills,
} = require("../controllers/skillController");

const router = express.Router();

router.get("/related", getRelatedSkills);

module.exports = router;
