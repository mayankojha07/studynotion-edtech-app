const Section = require("../models/Section");
const Course = require("../models/Course");
const { populate } = require("dotenv");
const SubSection = require("../models/SubSection");

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
    const { sectionName, sectionId, courseId } = req.body;

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

    const course = await Course.findById(courseId)
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
          model: "SubSection",
        },
      })
      .exec();

    // return response
    res.status(200).json({
      success: true,
      message: "Section Updated Successfully",
      data: course,
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
    const { sectionId, courseId } = req.body;
    console.log("SECTION ID: -> ", sectionId);

    // TODO: You have to delete all the subsections before deleting the section
    // !Ways to do this
    // 1. Using pre middleware on section model (used in this)
    // 2. Using cascade deletion logic using deleteMany function of mongoose
    // 3. Using MongoDB transactions
    // 4. Using mongoose plugin
    // 5. Using `change streams` (Advanced--> for high volume deletion and real-time interaction)

    // 2. using cascade deletion (not used in this)
    // const section = await Section.findById(sectionId);
    // if (section) {
    //   return res
    //     .status(404)
    //     .json({ success: false, message: "Section not found" });
    // }
    // await SubSection.deleteMany({
    //   _id: { $in: section.subSection },
    // });
    // await Section.findByIdAndDelete(sectionId);

    // delete section (1st way)
    // await Section.findOneAndDelete({ _id: sectionId }); // ( used for post middleware)

    const section = await Section.findById(sectionId);
    await section.deleteOne(); // This will trigger the pre middleware

    // TODO[Testing]: do we need to delete the entry from the course schema
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { $pull: { courseContent: sectionId } },
      { new: true }
    ).populate({
      path: "courseContent",
      populate: {
        path: "subSection",
        model: "SubSection",
      },
    });
    console.log("In Section Updated Course --> ", updatedCourse);

    // return response
    return res.status(200).json({
      success: true,
      message: "Section deleted successfully",
      data: updatedCourse,
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
