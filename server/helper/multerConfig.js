// configure the multer and storage 

const multer = require("multer");
const path=require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads");
    },
    filename: (req, file, cb) => {
      // cb(null, `${file.fieldname}.png`);
      cb(null,file.originalname);
    },
  });

  const upload = multer({ storage: storage});

  module.exports ={upload}