const appointmentModel = require("../models/appointmentModel");
const userModel = require("../models/userModels");

//book appointment
exports.booking = async (req, res) => {
  try {
    let status = req.body.status;
    status = "pending";
    const { doctorId, userId, date, time, doctorInfo, userInfo } = req.body;
    const newApointment = await appointmentModel({
      userId: userId,
      doctorId: doctorId,
      userInfo: userInfo,
      doctorInfo: doctorInfo,
      date: date,
      time: time,
      status: status,
    });
    await newApointment.save();

    const findUserThatisDoctor = await userModel.findOne({
      _id: req.body.doctorInfo.userId,
    });

    findUserThatisDoctor.notification.push({
      type: "New-appointment-request",
      message: `A nEw Appointment Request from ${req.body.userInfo.name}`,
      userInfo: userInfo,
      onCLickPath: "/user/appointments",
    });
    await findUserThatisDoctor.save();
    res.status(200).send({
      success: true,
      findUserThatisDoctor: findUserThatisDoctor,
      message: "Appointment Book succesfully",
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

//find particular user appintment
exports.findParticularUserAppontment = async (req, res) => {
  try {
    const userAppontment = await appointmentModel.find({
      userId: req.body.userId,
    });
    if (userAppontment) {
      return res
        .status(200)
        .json({
          success: true,
          userAppontment: userAppontment,
          message: "fetched successfully",
        });
    } else {
      return res
        .status(400)
        .json({
          success: false,
          message: "appontment not found try again or create new appointment",
        });
    }
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};

//deleteApoointment
exports.deleteApoointment = async (req, res) => {
  try {
    const { _id } = req.params;
    const user = await appointmentModel.findByIdAndDelete(_id);
    
 return  res
      .status(200)
      .json({ success: true, message: "Appointment deleted SuccessFully" });
  } catch (error) {
    console.log(error.message);
  return  res.status(500).send({
      success: false,
      message: "Eror in deleting at appontmentctrl",
      error:error.message,
    });
  }
};
