const appointmentModel = require("../models/appointmentModel");
const doctorModel = require("../models/doctorModel");
const userModel = require("../models/userModels");

//getDoctor data
exports.getDoctorDetails = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId });
    if (doctor) {
      return res.status(200).json({
        success: true,
        message: "doctor data fetched successfully",
        doctor: doctor,
      });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "doctor data not found" });
    }
  } catch (error) {
    return res.status(400).json({ success: false, error: error });
  }
};

//update profile of the doctor
exports.updateDoctorProfile = async (req, res) => {
  try {
    const {
      userId,
      firstName,
      lastName,
      phone,
      email,
      website,
      address,
      specialization,
      experience,
      feesPerCunsaltation,
      status,
      startTime,
      endTime,
    } = req.body;
    const doctorUpdate = await doctorModel.findOneAndUpdate(
      { userId: userId },
      req.body,
      {
        new: true,
      }
    );
    await doctorUpdate.save();
    res.status(200).json({
      success: true,
      message: "profile updated successfully",
      doctor: doctorUpdate,
    });
  } catch (error) {
    return res.status(400).json({ success: false, error: error });
  }
};

//getALLDoctors
exports.getAllDoctors = async(req, res) => {
  try {
    const doctors=await  doctorModel.find({status:"approved"});
    if(doctors){
        res.status(200).json({success:true,doctors:doctors,message:"doctors data fetched successfully"});
    }else{
        res.status(400).json({success:false,message:"doctors not found"});
    }
  } catch (error) {
    return res.status(400).json({ success: false, error: error });
  }
};


//getParticularDoctorDetails
exports.getParticularDoctorDetails=async(req,res)=>{
    try{
        const {_id}=req.body;
        const doctor=await doctorModel.findById({_id:_id});
        if(doctor){
            res.status(200).json({doctor:doctor,success:true,message:"data fetched successfully"});
        }
    }catch (error) {
        return res.status(400).json({ success: false, error: error.message });
      }
  
}

//get doctorAppointmentsController
exports.doctorAppointmentsController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId });
    const appointments = await appointmentModel.find({
      doctorId: doctor._id,
    });
    res.status(200).send({
      success: true,
      message: "Doctor Appointments fetch Successfully",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Doc Appointments",
    });
  }
};

//updateStatusController of appointment
exports.updateStatusController = async (req, res) => {
  try {
    const { appointmentsId, status } = req.body;
    const appointments = await appointmentModel.findByIdAndUpdate(
      appointmentsId,
      { status }
    );
    const user = await userModel.findOne({ _id: appointments.userId });
    const notification = user.notification;
    notification.push({
      type: "status-updated",
      message: `your appointment has been updated ${status}`,
      onCLickPath: "/doctor-appointments",
    });
    await user.save();
    res.status(200).send({
      success: true,
      message: "Appointment Status Updated",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      success: false,
      error,
      message: "Error In Update Status",
    });
  }
};

