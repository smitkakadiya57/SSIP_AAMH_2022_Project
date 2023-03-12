// importing schema
const propertySchema = require("../models/propertySchema");

const addProperty = async (req,res) => {
  try {
    const newSample = new propertySchema(req.body);

    const ack = await newSample.save();

    if (newSample) {
      res.status(200).json({ data: ack });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const changeToken = async (req,res) => {
  try {
    const { propertyid, owner_token } = req.body;
    const resData = await propertySchema.updateOne(
      { propertyid },
      {
        $set: {
          owner_token,
        },
      }
    );

    if (resData.modifiedCount === 1) {
      return res.status(200).json({ data: true });
    } else {
      return res.status(400);
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// fetch property ID thi kam baki chhe 
const fetchAllProperty=async (req,res)=>{
  try{
    const { ownertoken}=req.body;
    const resData=await  propertySchema.find({owner_token:ownertoken});
    if (!resData.length) {
      return res.status(404).json({ error: "You have No Property to see" });
    } else {
      return res.status(200).json({ data: resData });
    }
  }catch(err){
    res.send(400).json({ error: err.message });
  }
}


module.exports = {
    changeToken,addProperty,fetchAllProperty
  };