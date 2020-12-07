const formidable = require("formidable");
// const _ = require("lodash");
const fs = require("fs");

// load ad model
const Ad = require("../models/adModel");

// create ad
exports.createAd = (req, res, next) => {
  // const form = new formidable.IncomingForm();
  // const form = formidable({ multiples: true });
  // form.keepExtensions = true;
  // form.parse(req, (err, fields, files) => {
  // console.log(JSON.parse(files.images));

  console.log(req.file);

  const data = {
    title: req.body.title,
    customSize: req.body.customSize,
    price: req.body.price,
    description: req.body.description,
    // location: JSON.parse(req.body.location),
    // contact: JSON.parse(req.body.contact),
    // images: JSON.parse(req.body.images),
  };

  console.log(data);

  // create new ad object
  const ad = new Ad(data);

  // let images = files.images;
  // let imagesArr = [];
  // // save images in database
  // if (images.length > 0) {
  //   for (let i = 0; i < images.length; i++) {
  //     imagesArr = [...imagesArr, images[i]];
  //   }
  // }
  // ad.images = imagesArr;

  // if (files.imageTwo) {
  //   product.imageTwo.data = fs.readFileSync(files.imageTwo.path);
  //   product.imageTwo.contentType = files.imageTwo.type;
  // }

  // if (files.imageThree) {
  //   product.imageThree.data = fs.readFileSync(files.imageThree.path);
  //   product.imageThree.contentType = files.imageThree.type;
  // }

  // if (files.imageFour) {
  //   product.imageFour.data = fs.readFileSync(files.imageFour.path);
  //   product.imageFour.contentType = files.imageFour.type;
  // }
  // save to database
  ad.save()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      // errors.fail = "Product is not added successfully";
      res.status(400).json("Product is not added successfully");
    });
};

exports.fetchAds = (req, res) => {
  Ad.find()
    .exec()
    .then((result) => {
      if (result.length > 0) {
        res.status(200).json(result);
      } else {
        res.status(200).json({ msg: "No Ads" });
      }
    })
    .catch((err) => {
      console.log(err);
      // res.status(500).json({ error: err });
    });
};
