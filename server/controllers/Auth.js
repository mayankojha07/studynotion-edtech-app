const User = require("../models/User");
const Profile = require("../models/Profile");
const OTP = require("../models/OTP");
const optGenerator = require("otp-generator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailSender");
const { passwordUpdate } = require("../mail/templates/passwordUpdate");
require("dotenv").config();

// Send OTP
exports.sendOTP = async (req, res) => {
  try {
    // fetch email from the request body
    const { email } = req.body;

    // check user already exists or not
    const checkUserPresent = await User.findOne({ email });

    // if user exists then return response
    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: "User already exists",
      });
    }

    // generate otp
    var otp = optGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    // check that otp is unique or not
    let result = await OTP.findOne({ otp: otp });
    console.log("Result is Generate OTP Func");
    console.log("OTP", otp);
    console.log("Result", result);

    while (result) {
      otp = optGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });

      result = await OTP.findOne({ otp: otp });
    }

    // create an entry of otp in DB
    const otpPayload = { email, otp };

    const otpBody = await OTP.create(otpPayload);
    console.log(otpBody);

    // return response
    return res.status(200).json({
      success: true,
      message: "OTP Sent Successfully",
      otp,
    });
  } catch (error) {
    console.log("Error occurred While sending OTP");
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Sign Up
exports.signUp = async (req, res) => {
  try {
    // fetch data from the req body
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      contactNumber,
      accountType,
      otp,
    } = req.body;

    // validate the data
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !contactNumber ||
      !otp
    ) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }

    // match the password and confirmPassword
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and confirm password don't match",
      });
    }

    // check user already exist or not
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists, Please log in to continue.",
      });
    }

    // find the most recent otp for the user
    const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);

    console.log(response);

    // validate the otp
    if (response.length === 0) {
      return res.status(400).json({
        success: false,
        message: "OTP not found",
      });
    } else if (otp !== response[0].otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create an user
    let approved = "";
    approved === "Instructor" ? (approved = false) : (approved = true);

    // create an entry in DB
    const profileDetails = await Profile.create({
      gender: "",
      dateOfBirth: "",
      contactNumber,
      about: "",
    });

    const user = await User.create({
      firstName,
      lastName,
      email,
      // contactNumber,
      approved: approved,
      password: hashedPassword,
      accountType,
      additionalDetails: profileDetails._id,
      image: `https://api.dicebear.com/8.x/bottts/svg?seed=${firstName} ${lastName}`,
    });

    // return response
    return res.status(200).json({
      success: true,
      message: "User Registered Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while registering the user",
    });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    // fetch data from the req body
    const { email, password } = req.body;

    // validate data
    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }

    // check user exists or not
    const user = await User.findOne({ email })
      .populate("additionalDetails")
      .exec();

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not Registered with Us Please SignUp to Continue",
      });
    }

    // verify password generate JWT token
    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        email: user.email,
        id: user._id,
        accountType: user.accountType,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

      // insert token in user
      user.token = token;
      user.password = undefined;

      // create cookie
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      };

      res.cookie("token", token, options).json({
        success: true,
        user,
        token,
        message: "User Login Success",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Incorrect Password",
      });
    }

    // send response
  } catch (error) {
    console.log("Error occurred while login");
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Login Failure, please try again",
    });
  }
};

// Change Password
exports.changePassword = async (req, res) => {
  try {
    // fetch data from the req body
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const userDetails = await User.findById(req.user.id);

    // validate data
    if (!oldPassword || !newPassword || !confirmPassword) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }

    // validate old password
    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      userDetails.password
    );
    if (!isPasswordMatch) {
      // If old password does not match, return a 401 (Unauthorized) error
      return res
        .status(401)
        .json({ success: false, message: "The password is incorrect" });
    }

    // match newPassword and confirmPassword
    if (newPassword !== confirmPassword) {
      return res.status(401).json({
        success: false,
        message: "New password and confirm password are different",
      });
    }

    // hash newPassword
    const newHashedPassword = await bcrypt.hash(newPassword, 10);

    // update password in DB
    const updatedUser = await User.findByIdAndUpdate(
      userDetails._id,
      { password: newHashedPassword },
      { new: true }
    );

    //send mail
    try {
      const emailResponse = await mailSender(
        updatedUser.email,
        passwordUpdate(
          updatedUser.email,
          `Password updated successfully for ${updatedUser.firstName} ${updatedUser.lastName}`
        )
      );
      console.log("Email sent successfully: ", emailResponse);
    } catch (error) {
      // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
      console.error("Error occurred while sending email:", error);
      return res.status(500).json({
        success: false,
        message: "Error occurred while sending email",
        error: error.message,
      });
    }

    // return response
    res.status(200).json({
      success: true,
      updatedUser,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.log("Error occurred while changing password");
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to change password",
    });
  }
};
