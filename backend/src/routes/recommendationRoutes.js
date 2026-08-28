const express = require("express");

const {
  getDeveloperRecommendations,
} = require("../controllers/recommendationController");

const router = express.Router();

router.get(
  "/projects/:projectId/developers",
  getDeveloperRecommendations
);

module.exports = router;
