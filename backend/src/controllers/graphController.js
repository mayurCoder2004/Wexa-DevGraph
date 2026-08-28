const {
  getDeveloperGraphService,
  getGraphStatsService,
} = require("../services/graphService");

async function getDeveloperGraph(req, res) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Developer ID is required",
      });
    }

    const result = await getDeveloperGraphService(id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Developer not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Graph controller error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve developer graph",
    });
  }
}

async function getGraphStats(req, res) {
  try {
    const result = await getGraphStatsService();

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Graph statistics not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Graph stats controller error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve graph statistics",
    });
  }
}

module.exports = {
  getDeveloperGraph,
  getGraphStats,
};
