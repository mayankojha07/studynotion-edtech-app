const mongoose = require("mongoose");
require("dotenv").config();

exports.connectToDB = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("DB CONNECTED SUCCESSFULLY!"))
    .catch((err) => {
      console.log("DB CONNECTION FAILED!");
      console.error(err);
      process.exit(1);
    });
};
