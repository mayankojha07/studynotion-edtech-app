const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    trim: true,
    required: true,
  },

  courseDescription: {
    type: String,
    trim: true,
    required: true,
  },

  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },

  whatYouWillLearn: {
    type: String,
  },

  courseContent: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
    },
  ],

  ratingAndReviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RatingAndReview",
    },
  ],

  price: {
    type: Number,
    required: true,
  },

  tag: {
    type: [String],
    required: true,
  },

  thumbnail: String,

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },

  studentEnrolled: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],

  instructions: {
    type: [String],
  },

  status: {
    type: String,
    enum: ["Draft", "Published"],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Course", courseSchema);
