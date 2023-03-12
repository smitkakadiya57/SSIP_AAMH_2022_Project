const fs = require("fs");
const path = require("path");
uniqid = require("uniqid");

const cryptoHash = require("../helper/cryptoNft");

const appschema = require("../models/appSchema");

const addApplication = async (req, res) => {
  try {
    const {
      fname,
      mobileno,
      applicantID,
      service,
      email,
      address,
      district,
      taluko,
      village,
      subregoffice,
      dob,
      ...newObj
    } = req.body;
    // new OBJ contain other details like rashancard, adharcard etc like

    let filesArray = [];

    // console.log(req.files);

    req.files.forEach((ele) => {
      const file = {
        type: ele.fieldname,
        docImg: {
          data: fs.readFileSync(
            path.join(__dirname, "..", "uploads", ele.filename),
            "base64"
          ),
          contentType: "Image/png",
        },
      };
      fs.unlink(path.join(__dirname, "..", "uploads", ele.filename), (err) => {
        if (err) {
          throw err;
        }
      });
      filesArray.push(file);
    });

    // console.log("this is updated files array");
    // console.log(filesArray);
    let appid = uniqid();

    let tempObj = {
      appid,
      service: req.body.service,
      otherDetail: req.body,
      doc: filesArray,
    };

    if (req.body.service === "Identity Management") {
      let hash = cryptoHash(filesArray[0].docImg.data);

      let data=
      {
        type: "application",
        content: {
          appid,
          service: req.body.service,
          otherDetail: hash,
        },
      }
      return res.status(201).json({data});
    }
    // console.log(crypto);

    let data = {
      type: "application",
      content: tempObj,
    };

    // const newSample = new appSchema(tempObj);
    // const response = await newSample.save();

    res.status(201).json({ data });

    // res.status(200).send("working fine");
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ error: err.message });
  }
};

const addAppInDB = async (req, res) => {
  try {
    const { code, id, usertoken, type, admin } = req.body;

    // console.log(req.body);

    const newSample = new appschema({
      usertoken,
      applicationid: id,
      type,
      code,
      status: "pending",
      admin,
      remark: "",
    });

    const ack = await newSample.save();
    // console.log(ack);
    res.status(200).send("success");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAllApplication = async (req, res) => {
  try {
    const { type, admin } = req.body;

    const formRes = await appschema.find({
      $and: [{ status: type }, { admin }],
    });

    if (!formRes.length) {
      return res.status(404).json({ error: "You have No application to see" });
    } else {
      return res.status(200).json({ data: formRes });
    }
  } catch (err) {
    res.send(400).json({ error: err.message });
  }
};
const findApplication = async (req, res) => {
  try {
    const { id } = req.body;

    const formRes = await appSchema.find({ _id: id });

    if (!formRes.length) {
      return res.status(404).json({ error: "application not found" });
    } else {
      return res.status(200).json({ data: formRes });
    }
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const getUserApplication = async (req, res) => {
  try {
    const { usertoken } = req.body;

    const formRes = await appschema.find({ usertoken }, { usertoken: 0 });

    if (!formRes.length) {
      return res
        .status(404)
        .json({ error: "You Have Not Submit Any Application" });
    } else {
      return res.status(200).json({ data: formRes });
    }
  } catch (err) {
    console.log("signin err:" + err);
  }
};

const rejectApplication = async (req, res) => {
  try {
    const { id, msg } = req.body;
    const resData = await appschema.updateOne(
      { applicationid: id },
      {
        $set: {
          remark: msg,
          status: "rejected",
        },
      }
    );

    if (resData.modifiedCount === 1) {
      return res.status(200).json({ data: true });
    } else {
      return res.status(400);
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

const acceptApplication = async (req, res) => {
  try {
    const { id } = req.body;
    const resData = await appschema.updateOne(
      { applicationid: id },
      {
        $set: {
          status: "accepted",
        },
      }
    );

    if (resData.modifiedCount === 1) {
      return res.status(200).json({ data: true });
    } else {
      return res.status(400).json({ error: "application not approved" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

// export the controllers
module.exports = {
  addApplication,
  getAllApplication,
  findApplication,
  getUserApplication,
  rejectApplication,
  acceptApplication,
  addAppInDB,
};
