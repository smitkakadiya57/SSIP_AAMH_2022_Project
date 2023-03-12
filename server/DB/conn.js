const mongoose=require('mongoose');

// const DB="mongodb://localhost:27017/imgmern2";

const DB=process.env.DB;

mongoose.connect(DB).then(()=>{
    console.log("connection success");
  }).catch((err)=>{
    console.log(err);
    console.log("no connection");
  });    