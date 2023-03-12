const bcrypt = require("bcryptjs");
const uniqid = require("uniqid");

//Importing Schema
const adminSchema = require("../models/adminSchema");

const registerAdmin = async (req, res) => {
  // console.log(req.body);
  try {
    let pass = bcrypt.hashSync(req.body.password, 8);

    let { password, ...newObj } = req.body;

    let obj = { ...newObj, password: pass, admintoken: uniqid("admintoken") };

    const admin = new adminSchema(obj);

    const newadmin = await admin.save();

    if (newadmin) {
      res.status(200).json({ data: newadmin });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const adminLogin = await adminSchema.find({
      email,
    });

    if (!adminLogin.length) {
      return res.status(400).json({ error: "Invalid Credentials" });
    } else {
      let decode = bcrypt.compareSync(password, adminLogin[0].password);
      if (decode) {
        return res.status(200).json({ data: adminLogin[0] });
      } else {
        return res.status(400).json({ error: "Invalid Credentials" });
      }
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// export the controllers
module.exports = { registerAdmin, loginAdmin };
