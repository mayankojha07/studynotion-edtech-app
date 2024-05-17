const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

// Reset Password Token
exports.resetPasswordToken = async (req, res) => {
  try {
    // get email from the req body
    const email = req.body.email;

    // check user exists and validate email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: `This Email: ${email} is not Registered With Us Enter a Valid Email `,
      });
    }

    // generate token
    // const token = crypto.randomUUID();
    const token = crypto.randomBytes(20).toString("hex");

    // update user by adding token and expiration time
    const updatedDetails = await User.findByIdAndUpdate(
      user._id,
      {
        token: token,
        resetPasswordExpires: Date.now() + 5 * 60 * 1000,
      },
      { new: true }
    );
    console.log("DETAILS", updatedDetails);

    // create url
    const url = `http://localhost:3000/update-password/${token}`;

    // send mail containing the url
    await mailSender(
      email,
      "Password Reset",
      `Your Link for email verification is ${url}. Please click this url to reset your password.`
    );

    // return res
    res.status(200).json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while generating reset link",
      error: error.message,
    });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  try {
    // get data
    const { password, confirmPassword, token } = req.body;

    // validate data,
    if (!password || !confirmPassword) {
      return res.status(403).json({
        success: false,
        message: "Fields are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(401).json({
        success: false,
        message: "Password and confirmation password doesn't match",
      });
    }

    // get user from db using token
    const userDetails = await User.findOne({ token });

    // if no entry - invalid token
    if (!userDetails) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    // check whether token expired or not
    if (userDetails.resetPasswordExpires < Date.now()) {
      // if (!(userDetails.resetPasswordExpires > Date.now())) {
      return res.json({
        success: false,
        message: `Token is Expired, Please Regenerate Your Token`,
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // update pwd in db
    await User.findByIdAndUpdate(
      userDetails._id,
      { password: hashedPassword },
      { new: true }
    );

    // await User.findOneAndUpdate(
    // 	{ token: token },
    // 	{ password: hashedPassword },
    // 	{ new: true }
    // );

    // return response
    return res.status(200).json({
      success: true,
      message: `Password Reset Successful`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while reseting the password",
    });
  }
};
