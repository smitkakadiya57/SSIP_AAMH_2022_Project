const mongoose = require("mongoose");

const appSchema = new mongoose.Schema({
    usertoken:{
        type:String,
        require:true
    },
  applicationid: {
    type: String,
    require: true,
    unique:true
  },
  type:{
    type: String,
    require: true,
  },
  code: {
    type: String,
    require: true,
    unique:true
  },
  status: {
    type: String,
    require: true,
  },
  admin:{
type:String,
require:true
  },
  remark: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("appdata", appSchema);
