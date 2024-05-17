const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
require("dotenv").config();

// create sub-section handler
exports.createSubSection = async (req, res) => {
  try {
    // fetch data
    const { sectionId, title, timeDuration, description } = req.body;

    // extract file/video
    const video = req.files.videoFile;

    // validate data
    if (!sectionId || !title || !timeDuration || !description || !video) {
      res.status(400).json({
        success: false,
        message: "Missing fields",
      });
    }

    // upload video to cloudinary
    const uploadDetails = await uploadImageToCloudinary(
      video,
      process.env.FOLDER_NAME
    );

    // create sub secion
    const subSectionDetails = await SubSection.create({
      title,
      timeDuration,
      description,
      videoUrl: uploadDetails.secure_url,
    });

    // update section
    const updatedSection = await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $push: { subSection: subSectionDetails._id },
      },
      { new: true }
    ).populate("subSection");

    // HW use populate

    // return response
    res.status(200).json({
      success: true,
      message: "Sub-section created successfully",
      data: updatedSection,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error occurred while creating sub section",
      error: error.message,
    });
  }
};

// update sub-secion handler
// TODO: update sub section handler
exports.updateSubSection = async (req, res) => {
  try {
    // fetch data
    const { subSectionId, title, timeDuration, description } = req.body;

    // validate data
    const video = req.files.videoFile;

    // delete and update video to cloudinary

    // get sub section
    const subSectionDetails = await SubSection.findById(subSectionId);
    if (!subSectionDetails) {
      return res.status(400).json({
        success: false,
        message: "Sub Section not found",
      });
    }

    // update subsection
    subSectionDetails.title = title;
    subSectionDetails.timeDuration = timeDuration;
    subSectionDetails.description = description;
    await subSectionDetails.save();

    // return response
    return res.status(200).json({
      success: true,
      message: "Sub Section updated",
      subSectionDetails,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error occurred while creating sub section",
      error: error.message,
    });
  }
};

// delete subsection handler
// TODO: delete subsecion handler
exports.deleteSubSection = async (req, res) => {
  try {
    const { subSectionId, sectionId } = req.body;
    await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $pull: {
          subSection: subSectionId,
        },
      }
    );
    const subSection = await SubSection.findByIdAndDelete({
      _id: subSectionId,
    });

    if (!subSection) {
      return res
        .status(404)
        .json({ success: false, message: "SubSection not found" });
    }

    return res.json({
      success: true,
      message: "SubSection deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the SubSection",
    });
  }
};
