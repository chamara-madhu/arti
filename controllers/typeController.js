const formidable = require("formidable");
// const _ = require("lodash");
const fs = require("fs");

// load ad model
const Ad = require("../models/adModel");

// create ad
exports.createType = (req, res) => {
  // check type existance
  Type.findOne({ type: req.body.type })
    .exec()
    .then((res) => {
      if (res) {
        errors.type = "Type type is already exists";
        return res.status(400).json(errors);
      } else {
        const type = new Type(req.body);
        type
          .save()
          .then((result) => {
            res.status(200).json(result);
          })
          .catch((err) => {
            errors.fail = "Type is not added successfully";
            res.status(400).json(errors);
            console.log(err);
          });
      }
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
};
