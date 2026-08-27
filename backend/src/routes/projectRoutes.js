const express = require("express");
const {
  getProjectGraph,
} = require("../controllers/projectController");

const router = express.Router();

router.get("/:id", getProjectGraph);

module.exports = router;
