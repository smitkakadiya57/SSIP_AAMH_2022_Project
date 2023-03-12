//==> Require the Modules
const express = require("express");

const dotenv=require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());  
// app.use(bodyParser.json());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());

//==> Connecting Database
require("./DB/conn");

//==> require the image models
// const formSchema = require("./models/formSchema");

//==> Routes of the Application

app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/application", require("./routes/applicationRoutes"));
app.use("/api/property", require("./routes/propertyRoutes"));

//==> Listening On the Dynamic Port s
app.listen(port, () => console.log(`server started on port ${port}`));
