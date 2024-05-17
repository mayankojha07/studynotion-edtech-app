const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },

  otp: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 5 * 60, // The document will be automatically deleted after 5 minutes of its creation time
  },
});

// async function for email verification
async function sendVerificationEmail(email, otp) {
  try {
    const mailResponse = await mailSender(
      email,
      "Verification Email From StudyNotion",
      emailTemplate(otp)
    );
    console.log("Email Sent Successfully: ", mailResponse);
  } catch (err) {
    console.log("Error Occurred while sending email", err);
    throw err;
  }
}

otpSchema.pre("save", async function (next) {
  console.log("New document saved to database");

  // Only send an email when a new document is created
  if (this.isNew) {
    console.log(this.isNew);
    console.log("Email: -> ", this.email);
    console.log("OTP: -> ", this.otp);
    await sendVerificationEmail(this.email, this.otp);
  }
  // await sendVerificationEmail(this.email, this.otp);
  next();
});

module.exports = mongoose.model("OTP", otpSchema);
