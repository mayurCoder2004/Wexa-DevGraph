const {
  getAllDevelopersService,
  findDevelopersBySkillService,
  getDeveloperGraphService,
} = require("../services/developerService");

async function getAllDevelopers(req, res) {
  try {
    const developers = await getAllDevelopersService();

    return res.status(200).json({
      success: true,
      count: developers.length,
      data: developers,
    });
  } catch (error) {
    console.error("Get developers controller error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve developers",
    });
  }
}

async function findDevelopersBySkill(req, res) {
  try {
    const { skill } = req.query;

    if (!skill) {
      return res.status(400).json({
        success: false,
        message: "Skill query parameter is required",
      });
    }

    const developers = await findDevelopersBySkillService(skill);

    return res.status(200).json({
      success: true,
      count: developers.length,
      data: developers,
    });
  } catch (error) {
    console.error("Developer controller error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to find developers",
    });
  }
}

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
    console.error("Developer graph controller error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve developer graph",
    });
  }
}

module.exports = {
  getAllDevelopers,
  findDevelopersBySkill,
  getDeveloperGraph,
};
