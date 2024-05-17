let transporter = require("../config/nodemailer");

const mailSender = async (email, title, body) => {
  try {
    let info = await transporter.sendMail({
      from: "StudyNotion || Codeforme - By Mayank",
      to: `${email}`,
      // to: "ojhamayank70@gmail.com",
      subject: `${title}`,
      html: `${body}`,
    });
    console.log("<");
    console.log(info);
    console.log(">");
    return info;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = mailSender;
