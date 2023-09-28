const express=require("express");
const doctorRouter=express.Router();
const middleware=require("../middlewares/authMiddleWare");
const doctorCtrl=require("../controller/doctorCtrl");

//getDoctor Details
doctorRouter.post("/getDoctorDetails",middleware,doctorCtrl.getDoctorDetails);
//updateDoctorProfile
doctorRouter.put("/updateDoctorProfile",middleware,doctorCtrl.updateDoctorProfile);
//getAllDoctors
doctorRouter.get("/getAllDoctors",middleware,doctorCtrl.getAllDoctors);
//getParticularDoctorDetails
doctorRouter.post("/getParticularDoctorDetails",middleware,doctorCtrl.getParticularDoctorDetails);
//get doctorAppointmentsController
doctorRouter.get("/doctorAppointmentsController",middleware,doctorCtrl.doctorAppointmentsController);
//updateStatusController
doctorRouter.post("/updateStatusController",middleware,doctorCtrl.updateStatusController);
module.exports=doctorRouter;