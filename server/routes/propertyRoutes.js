const express = require("express");

// importing user controllers
const { changeToken,addProperty,fetchAllProperty } = require("../controller/propertyController");
const router = express.Router();

// user Routes 

router.post("/changetoken", changeToken);
router.post("/add", addProperty);
router.post("/fetch", fetchAllProperty);

module.exports = router;