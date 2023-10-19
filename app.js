const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

const dashboardRoutes = require("./apis/dashboard/dashboard.route");

app.get("/health", (req, res, next) => {
  return res.status(200).json({
    message: "Health is good",
    date: new Date(),
  });
});


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use("/dashboard", dashboardRoutes);


mongoose.Promise = global.Promise;

mongoose
  .connect(
    "mongodb+srv://niravpatil098:npn987654N@cluster0.pionla9.mongodb.net/"
  )
  .then(() => {
    console.log("connect to DB");
  })
  .catch((e) => {
    console.log("not able to connect with DB");
    console.log(e);
  });

module.exports = app; 