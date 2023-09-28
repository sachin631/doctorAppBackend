const express=require("express");
const authMiddleWare = require("../middlewares/authMiddleWare");
const adminCtrl = require("../controller/adminCtrl");

const adminRouter=express.Router();

//getAllUser
adminRouter.get("/getAllUser",authMiddleWare,adminCtrl.getAllUser);

//get All doctor details
adminRouter.get("/getAllDoctors",authMiddleWare,adminCtrl.getAllDoctors);

//approved doctor or chnage status of doctor
adminRouter.post("/changeDoctorStatus",authMiddleWare,adminCtrl.changeDoctorStatus);
//deleteParticularUser
adminRouter.delete("/deleteParticularUser/:_id",authMiddleWare,adminCtrl.deleteParticularUser);


module.exports=adminRouter;