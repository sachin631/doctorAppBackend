const jwt = require("jsonwebtoken");
const userModel = require("../models/userModels");
const bcryptjs = require("bcryptjs");
const doctorModel = require("../models/doctorModel");

//registerUser
exports.registerUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    let passWord = req.body.passWord;
    if (!name && !email && !passWord) {
      res.status(401).json({
        success: false,
        message: "please enter all Details",
      });
    } else {
      const findUser = await userModel.findOne({ email: email });
      if (findUser) {
        res.status(400).json({
          success: false,
          message: "user Already exit try to Login",
        });
      } else {
        const salt = await bcryptjs.genSalt(10); //10 round passWord hashed;
        const hashedPassWord = await bcryptjs.hash(passWord, salt);
        passWord = hashedPassWord;
        const user = await userModel({
          name: name,
          email: email,
          passWord: passWord,
        });
        const finalUser = await user.save();

        res.status(200).json({
          success: true,
          message: finalUser,
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

//loginUser
exports.loginUserCtrl = async (req, res) => {
  try {
    const { email, passWord } = req.body;

    if (!email || !passWord) {
      return res.status(401).json({
        success: false,
        message: "Please enter both email and password.",
      });
    }

    const user = await userModel.findOne({ email: email });

    if (!user) {
      return res
        .status(401)
        .json({ message: "User not found", success: false });
    }

    const match = await bcryptjs.compare(passWord, user.passWord);

    if (!match) {
      return res.status(401).json({
        message: "Wrong email or password",
        success: false,
      });
    }

    const token = await jwt.sign({ _id: user._id }, process.env.secretkey, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      message: "Login Successfully",
      success: true,
      user: user,
      token: token,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message, success: false });
  }
};

//get user data
exports.userData = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    if (!user) {
      return res
        .status(400)
        .json({ message: "user not found", success: false });
    } else {
      return res.status(200).json({ user: user, success: true });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message, success: false });
  }
};

//doctorData

exports.doctorData = async (req, res) => {
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
    endTime
  } = req.body;

  try {
    if(!userId){

      return res
      .status(400)
      .json({ success: false, message: "please enter complete Data of doctor userId" });

    }
    if(!phone){
      return res
      .status(400)
      .json({ success: false, message: "please enter complete Data of doctor phone" });
    }
    if(!lastName){
      return res
      .status(400)
      .json({ success: false, message: "please enter complete Data of doctor lastName" });
    }
  
    if(!email){
      return res
      .status(400)
      .json({ success: false, message: "please enter complete Data of doctor email" });
    }
    if(!address){
      return res
      .status(400)
      .json({ success: false, message: "please enter complete Data of doctor address" });
    }
    if(!specialization){
      return res
      .status(400)
      .json({ success: false, message: "please enter complete Data of doctor specialization" });
    }
    if(!experience){
      return res
      .status(400)
      .json({ success: false, message: "please enter complete Data of doctor experience" });
    }
    if(!feesPerCunsaltation){
      return res
      .status(400)
      .json({ success: false, message: "please enter complete Data of doctor feesPerCunsaltation" });
    }
    if(!startTime){
      return res
      .status(400)
      .json({ success: false, message: "please enter complete Data of doctor startTime" });
    }
    if(!endTime){
      return res
      .status(400)
      .json({ success: false, message: "please enter complete Data of doctor endTime" });
    }
    
    //store data of doctor
    const newDoctor = await doctorModel({
      userId: userId,
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      email: email,
      address: address,
      specialization: specialization,
      experience: experience,
      feesPerCunsaltation: feesPerCunsaltation,
      startTime:startTime,
      endTime:endTime
    });
    const doctor = await newDoctor.save();

    //send notification to admin
    const findAdmin = await userModel.findOne({ isAdmin: true });
    if (findAdmin) {
      const notification = findAdmin.notification;
      notification.push({
        type: "apply-doctor-request",
        message: `${doctor.firstName} ${doctor.lastName} has applied for Doctor`,
        data: {
          doctorId: doctor._id,
          name: `${doctor.firstName} ${doctor.lastName} has applied for Doctor`,
          onClickPath: "/admin/docotrs",
        },
      });

      await userModel.findByIdAndUpdate(findAdmin._id, { notification });
      return res.status(200).send({
        success: true,
        message: "Doctor Account Applied SUccessfully",
      });
    } else {
      return res.status(400).send({
        success: false,
        message: "Admin not found",
      });
    }
  } catch (error) {
    return res.status(400).json({ success: false, error: error });
  }
};


//mars all messages as read and send data to notification
exports.readAllMessages=async(req,res)=>{
  try{

    const {_id}=req.body;
    const user=await userModel.findById({_id:_id});
    const seenNotification=user.seenNotification;
    const notification=user.notification;
    seenNotification.push(...notification);
    user.notification=[];
     user.seennotification = notification;
    const updatedUser=await user.save();

    return res.status(200).send({
      success: true,
      message: "All Notification Marked as Read",
      updatedUser:updatedUser
    });

  }catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
 
};

// delete all seen messages
exports.deleteAllMessages=async(req,res)=>{
  try{
    const {_id}=req.body;
    const user=await userModel.findById({_id:_id});
    user.notification=[];
    user.seenNotification=[];
    const updatedUser=await user.save();
    return res.status(200).send({
      success: true,
      message: "congratulations.. All Notification Deleted",
      updatedUser:updatedUser
    });

  }catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
}

