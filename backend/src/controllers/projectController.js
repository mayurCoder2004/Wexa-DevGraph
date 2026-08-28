const {
  getProjectGraphService,
  findDevelopersForProjectService,
} = require("../services/projectService");

async function getProject(req, res) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Project ID is required",
      });
    }

    const result = await getProjectGraphService(id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Project controller error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve project graph",
    });
  }
}

async function findDevelopersForProject(req, res) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Project ID is required",
      });
    }

    const result = await findDevelopersForProjectService(id);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Project matching controller error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to find developers for project",
    });
  }
}

module.exports = {
  getProject,
  findDevelopersForProject,
};
