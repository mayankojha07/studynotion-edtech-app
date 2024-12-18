const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {
  courseEnrollmentEmail,
} = require("../mail/templates/courseEnrollmentEmail");
const { default: mongoose } = require("mongoose");
const CourseProgress = require("../models/CourseProgress");
const {
  paymentSuccessEmail,
} = require("../mail/templates/paymentSuccessEmail");
const crypto = require("crypto");

// For multiple payment
// capture payment initiates the order
exports.capturePayment = async (req, res) => {
  const userId = req.user.id;
  const { courses } = req.body;

  if (courses.length === 0) {
    return res
      .status(401)
      .json({ success: false, message: "Please provide course id" });
  }

  let totalAmount = 0;
  for (const course_id of courses) {
    let course;
    try {
      // find out the course
      course = await Course.findById(course_id);

      // if the course is not found then return 404 error message
      if (!course) {
        return res
          .status(404)
          .json({ success: false, message: "Could not found the course" });
      }

      // Check if the use is already enrolled in the course
      const uid = new mongoose.Types.ObjectId(userId);
      if (course.studentEnrolled.includes(uid)) {
        return res.status(403).json({
          success: false,
          message: "User is already enrolled in the course",
          courseId: course._id,
        });
      }

      // add the price of course in the total amount
      totalAmount += course.price;
    } catch (error) {
      console.log("Error in payment capture controller -> ", error);
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }

  const options = {
    amount: totalAmount * 100,
    currency: "INR",
    receipt: Math.random(Date.now()).toString(),
  };

  console.log("OPTIONS -> ", options);

  try {
    const paymentResponse = await instance.orders.create(options);
    console.log("Payment response -> ", paymentResponse);

    return res.status(200).json({
      success: true,
      message: "Payment captured successfully",
      data: paymentResponse,
    });
  } catch (error) {
    console.log("Error in payment capture controller -> ", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// verify payment
exports.verifyPayment = async (req, res) => {
  const razorpay_order_id = req.body?.razorpay_order_id;
  const razorpay_payment_id = req.body?.razorpay_payment_id;
  const razorpay_signature = req.body?.razorpay_signature;
  const courses = req.body?.courses;
  const userId = req.user.id;

  if (
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature ||
    !courses ||
    !userId
  ) {
    return res.status(401).json({
      success: false,
      message: "Payment failed - All fields are required",
    });
  }

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    // Enroll student
    await enrollStudent(courses, userId, res);

    // return res
    return res.status(200).json({ success: true, message: "Payment Verified" });
  }

  return res.status(402).json({ success: false, message: "Payment failed" });
};

// function for enroll student
const enrollStudent = async (courses, userId, res) => {
  if (!courses || !userId) {
    return res
      .status(404)
      .json({ success: false, message: "Courses or userid not found" });
  }

  for (const courseId of courses) {
    try {
      const enrolledCourse = await Course.findByIdAndUpdate(
        courseId,
        { $push: { studentEnrolled: userId } },
        { new: true }
      );

      if (!enrolledCourse) {
        return res
          .status(404)
          .json({ success: false, message: "Course not found" });
      }

      const courseProgress = await CourseProgress.create({
        courseId: courseId,
        userId: userId,
        completedVideos: [],
      });

      // find the student and add the course in student enrolledCourses list
      const enrolledStudent = await User.findByIdAndUpdate(
        userId,
        { $push: { courses: courseId, courseProgress: courseProgress._id } },
        { new: true }
      );

      console.log("Student Enrolled -> ", enrollStudent);

      // Send an email notification to the student
      const emailResponse = await mailSender(
        enrolledStudent.email,
        `Successfully enrolled into ${enrolledCourse.courseName}`,
        courseEnrollmentEmail(
          enrolledCourse.courseName,
          `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
        )
      );

      console.log("Mail sent successfully", emailResponse.response);
    } catch (error) {
      console.log("Error while enrolling student -> ", error);
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }
};

// Send Payment SuccessEmail
exports.sendPaymentSuccessEmail = async (req, res) => {
  const { orderId, paymentId, amount } = req.body;
  const userId = req.user.id;

  if (!orderId || !paymentId || !amount || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all details" });
  }

  try {
    const enrolledStudent = await User.findById(userId);

    await mailSender(
      enrolledStudent.email,
      "Payment Received",
      paymentSuccessEmail(
        `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
        amount / 100,
        orderId,
        paymentId
      )
    );

    console.log("Payment success mail sent");
  } catch (error) {
    console.log("Error while Sending payment success mail -> ", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// For single payment
// capture the payment and initiate the Razorpay order
// exports.capturePayment = async (req, res) => {
//   //get userid and orderid
//   const { courseId } = req.body;
//   const userId = req.user.id;

//   // validate
//   // validate courseid
//   if (!courseId) {
//     return res.json({
//       success: false,
//       message: "Please provide valid course id",
//     });
//   }

//   // validate courseDetails
//   let course;
//   try {
//     course = await Course.findById(courseId);
//     if (!course) {
//       return res.json({
//         success: false,
//         message: "Could not find the course",
//       });
//     }

//     // check user already pay for the same course
//     const uid = new mongoose.Types.ObjectId(userId);
//     if (course.studentEnrolled.includes(uid)) {
//       return res.json({
//         success: false,
//         message: "Student is already enrolled",
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }

//   // create order
//   const amount = course.price;
//   const currency = "INR";

//   const options = {
//     amount: amount * 100,
//     currency,
//     receipt: Math.random(Date.now()).toString(),
//     notes: {
//       courseId: course._id,
//       userId,
//     },
//   };

//   try {
//     const paymentResponse = await instance.orders.create(options);
//     console.log(paymentResponse);

//     // return res
//     return res.status(200).json({
//       success: true,
//       courseName: course.courseName,
//       courseDescription: course.courseDescription,
//       thumbnail: course.thumbnail,
//       orderId: paymentResponse.id,
//       amount: paymentResponse.amount,
//       currency: paymentResponse.currency,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.json({
//       success: false,
//       message: "Could not initiate order",
//     });
//   }
// };

// // verify signature Razorpay and server
// exports.verifySignature = async (req, res) => {
//   const webhooksecret = "12345678";

//   const signature = req.headers["x-razorpay-signature"];

//   const shasum = crypto.createHmac("sha256", webhook);
//   shasum.update(JSON.stringify(req.body));
//   const digest = shasum.digest("hex");

//   if (signature === digest) {
//     console.log("Payment is Authorized");

//     const { userId, courseId } = req.body.payload.payment.entity.notes;

//     try {
//       // find the course and enroll the student in it
//       const enrolledCourse = await Course.findOneAndUpdate(
//         { _id: courseId },
//         { $push: { studentEnrolled: userId } },
//         { new: true }
//       );

//       if (!enrolledCourse) {
//         return res.status(500).json({
//           success: false,
//           message: "Course not found",
//         });
//       }

//       console.log(enrolledCourse);

//       // find the student and add course in it
//       const enrolledStudent = await User.findOneAndUpdate(
//         { _id: userId },
//         { $push: { courses: courseId } },
//         { new: true }
//       );

//       console.log(enrolledStudent);

//       // send the confirmation mail
//       const emailResponse = await mailSender(
//         enrolledStudent.email,
//         "Confirmation Mail of Course buying",
//         "Congratulation"
//       );

//       console.log(emailResponse);

//       return res.status(200).json({
//         success: true,
//         message: "Signature verified and course added",
//       });
//     } catch (error) {
//       console.log(error);
//       return res.status(500).json({
//         success: false,
//         message: error.message,
//       });
//     }
//   } else {
//     return res.status(400).json({
//       success: false,
//       message: "Invalid request",
//     });
//   }
// };
