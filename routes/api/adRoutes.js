const express = require("express");
const router = express.Router();
const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.filename);
//   },
// });

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, false);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  dest: "uploads/",
  limits: {
    fileSize: 1024 * 1024 * 1,
  },
  fileFilter: fileFilter,
});

// load controller
const adController = require("../../controllers/adController");

// create ad
router.post(
  "/",
  // requireLogin,
  // isAuth,
  // isAdmin,
  upload.single("image"),
  adController.createAd
);

// fetch ads
router.get(
  "/",
  // requireLogin,
  // isAuth,
  // isAdmin,
  adController.fetchAds
);

module.exports = router;
