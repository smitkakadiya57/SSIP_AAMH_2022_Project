const express = require("express");

const { upload } = require("../helper/multerConfig");

// importing application controllers
const {addAppInDB, addApplication,getAllApplication ,findApplication,getUserApplication,rejectApplication,acceptApplication} = require("../controller/applicationController");
const router = express.Router();

// Application Routes 

router.post("/add", upload.array("files"),addApplication);
router.post("/getall", getAllApplication);
router.post("/find", findApplication);
router.post("/user", getUserApplication);
router.post("/reject", rejectApplication);
router.post("/accept", acceptApplication);
router.post("/addindb", addAppInDB);


module.exports = router;