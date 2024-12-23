const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const { connectToDB } = require("./config/database");
const { cloudinaryConnect } = require("./config/cloudinary");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
dotenv.config();

// import teh routes
const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const courseRoutes = require("./routes/Course");
const paymentRoutes = require("./routes/Payments");

const PORT = process.env.PORT || 4000;

// connect to database
connectToDB();

// connect to cloudinary
cloudinaryConnect();

//! middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

//! Mounting api routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);

//! default route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running...",
  });
});

// ! activating the server
app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});
