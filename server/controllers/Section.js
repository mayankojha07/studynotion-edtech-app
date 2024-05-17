const Section = require("../models/Section");
const Course = require("../models/Course");
const { populate } = require("dotenv");

// create section handler
exports.createSection = async (req, res) => {
  try {
    // fetch data
    const { sectionName, courseId } = req.body;

    // validate data
    if (!sectionName || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Missing properties",
      });
    }

    // create new section
    const newSection = await Section.create({ sectionName });

    // update course
    const updatedCourseDetails = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: { courseContent: newSection._id },
      },
      { new: true }
      // TODO: populate nested array
    )
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    // return response
    res.status(200).json({
      success: true,
      message: "Section Created Successfully",
      updatedCourseDetails,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error occurred while creating section",
      error: error.message,
    });
  }
};

// update section hanlder
exports.updateSection = async (req, res) => {
  try {
    // fetch data
    const { sectionName, sectionId } = req.body;

    // validate data
    if (!sectionName || !sectionId) {
      return res.status(400).json({
        success: false,
        message: "Missing properties",
      });
    }

    // update section
    const section = await Section.findByIdAndUpdate(
      sectionId,
      { sectionName },
      { new: true }
    );

    // return response
    res.status(200).json({
      success: true,
      message: "Section Updated Successfully",
      data: section,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error occurred while updating section",
      error: error.message,
    });
  }
};

// delete section handling function
exports.deleteSection = async (req, res) => {
  try {
    // get id -- assuming that we are sending id in parameters
    // const sectionId = req.params("sectionId");
    // const sectionId = req.query.sectionId;
    // const sectionId = req.params.sectionId;
    const sectionId = req.body.sectionId;
    console.log("SECTION ID: -> ", sectionId);

    // delete section
    await Section.findByIdAndDelete(sectionId);

    // TODO[Testing]: do we need to delete the entry from the course schema

    // return response
    return res.status(200).json({
      success: true,
      message: "Section deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occurred while deleting section",
      error: error.message,
    });
  }
};
