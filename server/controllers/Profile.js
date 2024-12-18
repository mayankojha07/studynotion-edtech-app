const Profile = require("../models/Profile");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const { convertSecondsToDuration } = require("../utils/secToDuration");
const CourseProgress = require("../models/CourseProgress");
const Course = require("../models/Course");
require("dotenv").config();

exports.updateProfile = async (req, res) => {
  try {
    // get data
    const {
      dateOfBirth = "",
      about = "",
      contactNumber,
      gender,
      firstName,
      lastName,
    } = req.body;

    // get user id
    const id = req.user.id;

    // validate data
    if (!contactNumber || !gender || !id) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // find profile
    const userDetails = await User.findById(id);
    const profileId = userDetails.additionalDetails;
    const profileDetails = await Profile.findById(profileId);

    // update in user --> firstName, lastName
    userDetails.firstName = firstName;
    userDetails.lastName = lastName;

    // update profile
    profileDetails.dateOfBirth = dateOfBirth;
    profileDetails.contactNumber = contactNumber;
    profileDetails.about = about;
    profileDetails.gender = gender;

    // save and update profile and user
    await Promise.all([profileDetails.save(), userDetails.save()]);

    console.log("Profile -----> ", profileDetails);
    // return response
    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      profileDetails,
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error occurred while updating profile",
      error: error.message,
    });
  }
};

// delete account handler
// TODO[Explore]: How can we schedule this deletion operation
exports.deleteAccount = async (req, res) => {
  try {
    // get id
    const id = req.user.id;

    // validate
    const userDetails = await User.findById(id);
    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: "user not found",
      });
    }

    // delete profile
    await Profile.findByIdAndDelete(userDetails.additionalDetails);

    // TODO: HW unenroll user from enrolled courses

    // delete user
    await User.findByIdAndDelete(userDetails._id);

    // return response
    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error occurred while deleting account",
      error: error.message,
    });
  }
};

// get all user details
exports.getUserDetails = async (req, res) => {
  try {
    // get id
    const id = req.user.id;

    // get user
    const userDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec();

    // return response
    return res.status(200).json({
      success: true,
      message: "Fetched user details successfully",
      data: userDetails,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error occurred while deleting account",
      error: error.message,
    });
  }
};

// update display picture
exports.updateDisplayPicture = async (req, res) => {
  try {
    const displayPicture = req.files.displayPicture;
    const userId = req.user.id;

    const image = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    );

    const updatedProfile = await User.findByIdAndUpdate(
      { _id: userId },
      { image: image.secure_url },
      { new: true }
    ).populate("additionalDetails");

    res.send({
      success: true,
      message: `Image Uploaded Successfully`,
      data: updatedProfile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get enrolled courses
exports.getEnrolledCourses = async (req, res) => {
  // try {
  //   const userId = req.user.id;
  //   const userDetails = await User.findOne({ _id: userId })
  //     .populate("courses")
  //     .exec();

  //   if (!userDetails) {
  //     return res.status(400).json({
  //       success: false,
  //       message: `Could not find user with this id: ${userDetails}`,
  //     });
  //   }

  //   // const userCourseDetails = await User.findById(userId)
  //   //   .populate({
  //   //     path: "courses",
  //   //     populate: {
  //   //       path: "courseContent", // Populate courseContent (sections)
  //   //       model: "Section", // Make sure this matches the model name in mongoose.model("Section", sectionSchema)
  //   //       populate: {
  //   //         path: "subSection", // Populate subSection (subsections)
  //   //         model: "SubSection", // Ensure this is the correct model name
  //   //         select: "-videoUrl", // Exclude videoUrl if not needed
  //   //       },
  //   //     },
  //   //   })
  //   //   .exec();

  //   // console.log("UserCourseDetails -> ", userCourseDetails);

  //   // const courseData = userCourseDetails.courses.map((course) => {
  //   //   let totalDurationInSeconds = 0;
  //   //   course.courseContent.forEach((content) => {
  //   //     content.forEach((subContent) => {
  //   //       const timeInSeconds = parseInt(subContent.timeDuration);
  //   //       totalDurationInSeconds += timeInSeconds;
  //   //     });
  //   //   });
  //   //   const totalDuration = convertSecondsToDuration(totalDurationInSeconds);
  //   //   return { courseId: course._id, totalDuration };
  //   // });

  //   res.status(200).json({
  //     success: true,
  //     data: userDetails.courses,
  //     // data: courseData, // not working
  //   });
  // } catch (error) {
  //   return res.status(500).json({
  //     success: false,
  //     message: error.message,
  //   });
  // }

  try {
    const userId = req.user.id;
    let userDetails = await User.findOne({
      _id: userId,
    })
      .populate({
        path: "courses",
        populate: {
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        },
      })
      .exec();
    userDetails = userDetails.toObject();
    var SubsectionLength = 0;
    for (var i = 0; i < userDetails.courses.length; i++) {
      let totalDurationInSeconds = 0;
      SubsectionLength = 0;
      for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
        totalDurationInSeconds += userDetails.courses[i].courseContent[
          j
        ].subSection.reduce(
          (acc, curr) => acc + parseInt(curr.timeDuration),
          0
        );
        userDetails.courses[i].totalDuration = convertSecondsToDuration(
          totalDurationInSeconds
        );
        SubsectionLength +=
          userDetails.courses[i].courseContent[j].subSection.length;
      }
      let courseProgressCount = await CourseProgress.findOne({
        courseID: userDetails.courses[i]._id,
        userId: userId,
      });
      courseProgressCount = courseProgressCount?.completedVideos.length;
      if (SubsectionLength === 0) {
        userDetails.courses[i].progressPercentage = 100;
      } else {
        // To make it up to 2 decimal point
        const multiplier = Math.pow(10, 2);
        userDetails.courses[i].progressPercentage =
          Math.round(
            (courseProgressCount / SubsectionLength) * 100 * multiplier
          ) / multiplier;
      }
    }

    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userDetails}`,
      });
    }
    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// insturctor courses details
exports.instructorDashboard = async (req, res) => {
  try {
    const courseDetails = await Course.find({ instructor: req.user.id });

    const courseData = courseDetails.map((course) => {
      console.log(course);
      const totalStudentEnrolled = course.studentEnrolled.length;
      const totalAmountGenerated = totalStudentEnrolled * course.price;

      // Create a new object with the additional fields
      const courseDataWithStats = {
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        // Include other course properties as needed
        totalStudentEnrolled,
        totalAmountGenerated,
      };

      return courseDataWithStats;
    });

    res.status(200).json({ success: true, courses: courseData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
