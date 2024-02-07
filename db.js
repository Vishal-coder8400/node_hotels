const mongoose = require("mongoose");

//define mongodb url
const mongoUrl = "mongodb://127.0.0.1:27017/hotels"; //replace 'mydatabase' with your database name

//set up mongodb connection

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

//define event listeners for database connection

db.on
  ("connected",
  () => {
    console.log("Connected to mongodb server");
  });
db.on
  ("error",
  (err) => {
    console.log("mongodb connection error", err);
  });
db.on
  ("disconnected",
  () => {
    console.log("disconnected mongodb ");
  });

  module.exports=db;