const {
  findDevelopersBySkillService,
} = require("../services/developerService");

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

module.exports = {
  findDevelopersBySkill,
};
