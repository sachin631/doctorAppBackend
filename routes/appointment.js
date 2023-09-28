const express=require("express");
const authMiddleWare = require("../middlewares/authMiddleWare");
const appointmentRouter=express.Router();
const appointmentController=require("../controller/appintmentCtrl");

//doctor booking
appointmentRouter.post("/booking",authMiddleWare,appointmentController.booking);
//findParticularUserAppontment
appointmentRouter.get("/findParticularUserAppontment",authMiddleWare,appointmentController.findParticularUserAppontment);
//delete Appointment by user itself
appointmentRouter.delete("/deleteApoointment/:_id",authMiddleWare,appointmentController.deleteApoointment);

module.exports=appointmentRouter;