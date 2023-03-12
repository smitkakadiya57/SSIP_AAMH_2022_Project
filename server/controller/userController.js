
const uniqid = require("uniqid");
const bcrypt = require("bcryptjs");

//Importing Schema

const userSchema = require("../models/userSchema");

const registerUser = async (req, res) => {
  console.log(req.body);

  const { fname, email, mobileno, dob, gender, password, cpassword} = req.body;

  if (
    !fname ||
    !email ||
    !mobileno ||
    !dob ||
    !gender ||
    !password ||
    !cpassword

  ) {
    return res.status(400).json({ error: "Please fill the Form " });
  }

  try {
    const isExist = await userSchema.find({
      $or: [{ mobileno: req.body.mobileno }, { email: req.body.email }],
    });

    if (isExist.length > 0) {
      console.log(isExist);
      return res.status(400).json({ error: "user Alredy Exists" });
    }

    let pass = bcrypt.hashSync(req.body.password, 8);

    let { password, cpassword, ...newObj } = req.body;

    let obj = { ...newObj, password: pass, usertoken: uniqid("usertoken") };
    // console.log(obj);

    const user = new userSchema(obj);

    const newuser = await user.save();

    if (newuser) {
      return res.status(200).json({ data: newuser });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userLogin = await userSchema.find({ email });

    if (!userLogin.length) {
      return res.status(400).json({ error: "Invalid Credentials" });
    } else {
      let decode = bcrypt.compareSync(password, userLogin[0].password);
      if (decode) {
        return res.status(200).json({ data: userLogin[0] });
      }else{
        return res.status(400).json({ error: "Invalid Credentials" });
      }
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// export the controllers
module.exports = { registerUser, loginUser };
