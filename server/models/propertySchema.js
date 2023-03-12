const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  propertyid: {
    type: String,
    require: true,
    unique: true,
  },
  owner_token: {
    type: String,
    require: true
  },
  code: {
    type: String,
    require: true,
    unique: true,
  },
});

module.exports = mongoose.model("propertydata", propertySchema);
