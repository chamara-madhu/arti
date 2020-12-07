const express = require("express");
const router = express.Router();

// load controller
const typeController = require("../../controllers/typeController");

// create ad
router.post(
  "/",
  // requireLogin,
  // isAuth,
  // isAdmin,
  typeController.createType
);

// // fetch ads
// router.get(
//   "/",
//   // requireLogin,
//   // isAuth,
//   // isAdmin,
//   typeController.fetchAds
// );

module.exports = router;
