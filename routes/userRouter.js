const express=require("express");
const userRouter=express.Router();
const UserCtrl=require("../controller/userCtrl");
const authMiddleWare = require("../middlewares/authMiddleWare");

//Register user
userRouter.post("/registerUser",UserCtrl.registerUser);
//Login Router
userRouter.post("/loginUser",UserCtrl.loginUserCtrl);
//auth //post //getUserData
userRouter.post("/userData",authMiddleWare,UserCtrl.userData);
//doctor apply
userRouter.post("/doctorData",authMiddleWare,UserCtrl.doctorData);
//seen Messages
userRouter.post("/readAllMessages",authMiddleWare,UserCtrl.readAllMessages);
//deleteAllMessages
userRouter.post("/deleteAllMessages",authMiddleWare,UserCtrl.deleteAllMessages);

module.exports=userRouter;