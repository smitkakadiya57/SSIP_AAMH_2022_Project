const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  fname: {
    type: String,
    require: true,
  },
  role: {
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
  code:{
    type:Number,
    require:true
  },
  admintoken:{
    type:String,
    require:true
  }
 
});

const admin_Schema = mongoose.model("admindata", adminSchema);
module.exports = admin_Schema;
