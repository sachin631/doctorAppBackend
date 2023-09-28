const doctorModel = require("../models/doctorModel");
const userModel = require("../models/userModels");

//getAllUser
exports.getAllUser = async (req, res) => {
  try {
    const user = await userModel.find({});
    if (user) {
      return res.status(200).json({
        success: true,
        user: user,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "user not found somthing went wrong",
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error,
    });
  }
};

//get all Doctors details
exports.getAllDoctors = async (req, res) => {
  try {
    const docotrs = await doctorModel.find({});
    if (docotrs) {
      return res.status(200).json({
        success: true,
        docotrs: docotrs,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "docotrs not found somthing went wrong",
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error,
    });
  }
};

//changeDoctorStatus
exports.changeDoctorStatus = async (req, res) => {
  try {
    const { doctorId, status } = req.body;
    const doctor = await doctorModel.findByIdAndUpdate(doctorId, { status });
    const user = await userModel.findOne({ _id: doctor.userId });
    const notification = user.notification;
    notification.push({
      type: "doctor-account-request-updated",
      message: `Your Doctor Account Request Has ${status} `,
      onClickPath: "/notification",
    });

    user.isDoctor = status === "approved" ? true : false;
    await user.save();
    res.status(201).send({
      success: true,
      message: "Account Status Updated",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror in Account Status",
      error,
    });
  }
};

//delete particular user by admin
exports.deleteParticularUser = async (req, res) => {
  try {
    const { _id } = req.params;
    const user = await userModel.findByIdAndDelete({_id});
    
    res
      .status(200)
      .json({ success: true, message: "user deleted SuccessFully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror in deleting at adminctrl",
      error,
    });
  }
};
