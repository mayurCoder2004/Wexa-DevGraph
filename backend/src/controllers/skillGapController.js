const {
  getDeveloperSkillGapService,
} = require("../services/skillGapService");

async function getSkillGap(req, res) {
  try {
    const { developerId, projectId } = req.params;

    if (!developerId || !projectId) {
      return res.status(400).json({
        success: false,
        message: "Developer ID and Project ID are required",
      });
    }

    const result = await getDeveloperSkillGapService(
      developerId,
      projectId
    );

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Developer or project not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Skill gap controller error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to calculate skill gap",
    });
  }
}

module.exports = {
  getSkillGap,
};
