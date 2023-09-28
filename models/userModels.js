const mongoose = require("mongoose");
const validator = require("validator");

const userScehma = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "user name is require"],
  },
  email: {
    type: String,
    require: [true, "user email is require"],
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email");
      }
    },
  },
  passWord: {
    type: String,
    require: [true, "user passWord is require"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isDoctor: {
    type: Boolean,
    default: false,
  },
  notification: {
    type: Array,
    default: [],
  },
  seenNotification: {
    type: Array,
    default: [],
  },
});

const userModel = new mongoose.model("users", userScehma);

module.exports = userModel;
