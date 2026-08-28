const express = require("express");

const {
  getAllSkills,
  getRelatedSkills,
} = require("../controllers/skillController");

const router = express.Router();

router.get("/", getAllSkills);
router.get("/related", getRelatedSkills);

module.exports = router;
