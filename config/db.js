const mongoose = require("mongoose");


const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DATABASENAME, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`mongo db Coonected SuccesFully at ${mongoose.Connection.host}`);
  } catch (error) {
    console.log(`from db.js ${error}`);
  }
};

module.exports=dbConnect;
