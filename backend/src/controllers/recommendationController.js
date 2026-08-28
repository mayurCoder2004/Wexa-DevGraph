const {
  getDeveloperRecommendationsService,
} = require("../services/recommendationService");

async function getDeveloperRecommendations(req, res) {
  try {
    const { projectId } = req.params;

    if (!projectId) {
      return res.status(400).json({
        success: false,
        message: "Project ID is required",
      });
    }

    const recommendations =
      await getDeveloperRecommendationsService(projectId);

    if (recommendations === null) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        projectId,
        recommendations,
      },
    });
  } catch (error) {
    console.error(
      "Recommendation controller error:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message: "Failed to generate developer recommendations",
    });
  }
}

module.exports = {
  getDeveloperRecommendations,
};
