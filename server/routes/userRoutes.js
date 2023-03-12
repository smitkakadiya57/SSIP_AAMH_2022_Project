const express = require("express");

// importing user controllers
const { registerUser,loginUser } = require("../controller/userController");
const router = express.Router();

// user Routes 

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;