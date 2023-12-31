const { isValidObjectId } = require("mongoose");
var ObjectId = require("mongodb").ObjectID;
const Dash = require("./dashboard.model");

exports.create = (req, res, next) => {
  //create object
  const station = new Dash({
    name: req.body.name,
    status: req.body.status,
    lastseen: req.body.lastseen,
    temp: req.body.temp,
    humidity: req.body.humidity,
    createdAt: new Date(),
  });

  station
    .save()
    .then((station) => {
      res.status(201).json({
        message: "Product added successfully",
        station,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error while creating station",
        error: err,
      });
    });
};

exports.get = (req, res, next) => {
  Dash.find()
    .exec()
    .then((stations) => {
      res.status(200).json({
        stations,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
        message: "Failed to get all stations",
      });
    });
};
