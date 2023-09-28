const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, "userId is required"],
    },
    doctorId: {
      type: String,
      required: [true, "doctorId is required"],
    },
    doctorInfo: {
      type: String,
      required: true,
    },
    userInfo: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: [true, "time is required"],
    },
    date: {
      type: String,
      required: [true, "date is required"],
    },
    status: {
      type: String,
      default: "pending",
      required: [true, "status is required"],
     
    },
  },
  { timestamps: true }
);

const appointmentModel=new mongoose.model("appointments",appointmentSchema);
module.exports=appointmentModel;
