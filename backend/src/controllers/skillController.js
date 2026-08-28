const {
  getAllSkillsService,
  getRelatedSkillsService,
} = require("../services/skillService");

async function getAllSkills(req, res) {
  try {
    const skills = await getAllSkillsService();

    return res.status(200).json({
      success: true,
      count: skills.length,
      data: skills,
    });
  } catch (error) {
    console.error("Get skills controller error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve skills",
    });
  }
}

async function getRelatedSkills(req, res) {
  try {
    const { skill } = req.query;

    if (!skill) {
      return res.status(400).json({
        success: false,
        message: "Skill query parameter is required",
      });
    }

    const result = await getRelatedSkillsService(skill);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Skill controller error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve related skills",
    });
  }
}

module.exports = {
  getAllSkills,
  getRelatedSkills,
};
