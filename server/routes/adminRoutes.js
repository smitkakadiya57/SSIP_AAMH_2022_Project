const express = require("express");

// importing admin controllers
const { registerAdmin,loginAdmin } = require("../controller/adminController");
const router = express.Router();

// admin Routes 

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);

module.exports = router;