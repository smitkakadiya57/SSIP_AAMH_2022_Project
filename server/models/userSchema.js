const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    require: true,
  },
  mobileno: {
    type: Number,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  gender: {
    type: String,
    require: true,
  },
  dob: {
    type: String,
    require: true,
  },
  
  password: {
    type: String,
    require: true,
  },
  
  usertoken:{
    type:String,
    require:true,
  }
});

const user_Schema = mongoose.model("userdata", userSchema);

module.exports = user_Schema;
