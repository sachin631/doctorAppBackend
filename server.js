require("dotenv").config();

const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const dbConnect = require("./config/db");
const userRouter = require("./routes/userRouter");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const adminRouter = require("./routes/adminRouter");
const doctorRouter = require("./routes/docotorRouter");
const appointmentRouter = require("./routes/appointment");

//call dbconnect
dbConnect();

try {
  //middleware

  app.use(
    cors({
      origin: "https://docappfrontend-93oicc1d2-sachin-sangwans-projects.vercel.app",
      credentials: true,
    })
  );

  // app.use(
  //   cors({
  //     origin: "https://main--adorable-baklava-9864f4.netlify.app",
  //     credentials: true,
  //   })
  // );
  // Handle preflight (OPTIONS) requests
  app.options("*", cors()); // Enable CORS for all OPTIONS requests
  // app.use(cors())
  app.use(express.json({ limit: "10mb" }));
  // app.use(cookieParser());
  // app.use(bodyParser.urlencoded({ extended: true }));

  //routes

  app.use(userRouter);
  app.use(adminRouter);
  app.use(doctorRouter);
  app.use(appointmentRouter);

  //listen
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(
      `server start successfully at port ${process.env.PORT} in ${process.env.DEV_MODE} mode`
        .yellow
    );
  });
} catch (error) {
  console.log(error);
}
