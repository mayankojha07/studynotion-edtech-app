const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
const { default: mongoose } = require("mongoose");

// create rating handler
exports.createRating = async (req, res) => {
  try {
    // get userId
    const userId = req.user.id;

    // fetch data from the req body
    const { rating, review, courseId } = req.body;

    // check if user is enrolled or not
    const courseDetails = await Course.findOne({
      _id: courseId,
      studentEnrolled: { $elemMatch: { $eq: userId } },
    });

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: `Student is not enrolled in this course`,
      });
    }

    // check if user already reviewed the course or not
    const alreadyReviewed = await RatingAndReview.findOne({
      user: userId,
      course: courseId,
    });

    if (alreadyReviewed) {
      return res.status(403).json({
        success: false,
        message: "User already reviewed for this course",
      });
    }

    // create rating and review
    const ratingReview = await RatingAndReview.create({
      rating,
      review,
      course: courseId,
      user: userId,
    });

    // update course with rating and review
    const updatedCourseDetails = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: { ratingAndReviews: ratingReview._idf },
      },
      { new: true }
    );
    console.log(updatedCourseDetails);

    // return res
    return res.status(200).json({
      success: true,
      message: `Rating and review created succussfully`,
      ratingReview,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error occur while creating a rating",
      error: error.message,
    });
  }
};

// get average rating handler
exports.getAverageRating = async (req, res) => {
  try {
    // get courseId
    const courseId = req.body.courseId;

    // calculate average rating
    const result = await RatingAndReview.aggregate([
      {
        $match: {
          course: new mongoose.Types.ObjectId(courseId),
        },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
        },
      },
    ]);

    // return rating
    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        averageRating: result[0].averageRating,
      });
    }

    // if no rating and review exist
    return res.status(200).json({
      success: true,
      averageRating: 0,
      message: `Average rating is 0 till now`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error occur while getting average rating",
      error: error.message,
    });
  }
};

// get all ratings and reviews handler
exports.getAllRatings = async (req, res) => {
  try {
    const allReviews = await RatingAndReview.find({})
      .sort({ rating: "desc" })
      .populate({
        path: "user",
        select: "firstName lastName email image",
      })
      .populate({
        path: "course",
        select: "courseName",
      })
      .exec();

    return res.status(200).json({
      success: true,
      message: `All reviews are fetched successfully`,
      data: allReviews,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error occur while getting all rating",
      error: error.message,
    });
  }
};

// get Courses's ratings and reviews handler
exports.getCourseRatings = async (req, res) => {
  try {
    // get courseId
    const { courseId } = req.body;

    const allCourseReviews = await RatingAndReview.find({
      course: new mongoose.Types.ObjectId(courseId),
    })
      .sort({ rating: "desc" })
      .populate({
        path: "user",
        select: "firstName lastName email image",
      })
      .populate({
        path: "course",
        select: "courseName",
      })
      .exec();

    return res.status(200).json({
      success: true,
      message: `All reviews are fetched successfully`,
      data: allCourseReviews,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error occur while getting all rating of course",
      error: error.message,
    });
  }
};
