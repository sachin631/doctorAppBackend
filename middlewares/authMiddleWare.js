const jwt=require("jsonwebtoken");

module.exports=async(req,res,next)=>{
    try{
        const token=req.headers["authorization"].split(" ")[1];
        await jwt.verify(token,process.env.secretkey,(err,decode)=>{
            if(err){
                return res.status(400).json({message:"Auth failed",error:err.message,success:false});
            }else{
                req.body.userId=decode._id;
                next();
            }

        });

    }catch(error){
        return res.status(400).json({message:"something went wrong",error:error.message,success:false});
    }
}