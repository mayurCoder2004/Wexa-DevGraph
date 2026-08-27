const express = require("express");
const {
  getDeveloperGraph,
} = require("../controllers/graphController");

const router = express.Router();

router.get("/developers/:id", getDeveloperGraph);

module.exports = router;
