const express = require("express");
const router = express.Router();

// load user model
const User = require("../../models/userModel");

// load controller
const productController = require("../../controllers/productController");

// user identification
router.param("userId", (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err) {
      res.status(400).json({ error: "user not found" });
    }
    req.profile = user;
    next();
  });
});

// load auth-middleware
const {
  requireLogin,
  isAuth,
  isAdmin,
} = require("../../auth-middleware/check-auth");

// create product
// router.post(
//   "/product/:userId",
//   requireLogin,
//   isAuth,
//   isAdmin,
//   productController.createProduct
// );

// create product
router.post(
  "/product/",
  // requireLogin,
  // isAuth,
  // isAdmin,
  productController.createProduct
);

// router.post("/product", (req, res, next) => {
//   const product = new Product({
//     // _id: mongoose.Types.ObjectId(),
//     proId: req.body.proId,
//     name: req.body.name,
//     price: req.body.price
//   });

//   product
//     .save()
//     .then(result => {
//       res.status(200).json(result);
//     })
//     .catch(err => {
//       res.status(500).json({ error: err });
//     });
// });

// get all products
router.get("/products", productController.readProducts);

// get specific product
router.get("/product/:id", productController.readSpecificProduct);

// update product
router.put(
  "/product/:id/:userId",
  requireLogin,
  isAuth,
  isAdmin,
  productController.updateProduct
);

// router.put("/product/:id", (req, res, next) => {
//   Product.findOneAndUpdate({ _id: req.params.id }, req.body)
//     .then(result => {
//       res.status(200).json(result);
//     })
//     .catch(err => {
//       res.status(500).json({ error: err });
//     });
// });

// delete product
router.delete(
  "/product/:id/:userId",
  requireLogin,
  isAuth,
  isAdmin,
  productController.deleteProduct
);

// delete all product
router.delete(
  "/products/:userId",
  requireLogin,
  isAuth,
  isAdmin,
  productController.deleteAllProducts
);

// advanced filtering
router.get(
  "/products/advancedFilter/:category/:fabric/:occasion/:min/:max/:color",
  productController.advancedFiltering
);

// get all products by specific category
router.get(
  "/products/category/:categoryName",
  productController.filterByCategory
);

// get all products by specific fabric
router.get("/products/fabric/:fabricName", productController.filterByFabric);

// get all products by specific occasion
router.get(
  "/products/occasion/:occasionType",
  productController.filterByOccasion
);

// get all products by specific price
router.get("/products/price/:min/:max", productController.filterByPrice);

// get all products by specific color
router.get("/products/color/:color", productController.filterByColor);

// filter all products by likes
router.get("/products/likes", productController.filterByLikes);

// filter all products by comments
router.get("/products/comments", productController.filterByComments);

// filter all products by ratings
router.get(
  "/products/ratings/:ratingFloor/:ratingCeil",
  productController.filterByRatings
);

// get related products
router.get("/product/related/:id", productController.relatedProducts);

// // get active categories
// router.get("/products/categories", (req, res) => {
//   Product.distinct("category")
//     .populate("category", "name")
//     .then(categories => {
//       console.log(categories);
//       if (categories.length > 0) {
//         res.status(200).json(categories);
//       }
//     })
//     .catch(err => {
//       res.status(500).json({ error: "no active categories" });
//     });
// });

// // get active fabrics
// router.get("/products/fabrics", (req, res) => {
//   Product.distinct("fabric")
//     .populate("fabric", "name")
//     .then(fabrics => {
//       if (fabrics.length > 0) {
//         res.status(200).json(fabrics);
//       }
//     })
//     .catch(err => {
//       res.status(500).json({ error: "no active fabrics" });
//     });
// });

// counts products
// get active fabrics
// router.get("/products/category/count/:category", (req, res) => {
//   Product.find({category: req.params.category}).countDocuments()
//     .then(category => {
//       console.log(category)
//       // if (category.length > 0) {
//         return res.status(200).json(category);
//       // }
//     })
//     .catch(err => {
//       res.status(500).json({ error: "no active fabrics" });
//     });
// });

// get photos
router.get("/product/photo/front/:id", productController.frontImage);

router.get("/product/photo/jacket/:id", productController.jacketImage);

router.get("/product/photo/border/:id", productController.borderImage);

router.get("/product/photo/back/:id", productController.backImage);

router.get("/products/search/:keyword", productController.productSearch);

// sold product count
router.get("/sold", productController.soldProducts);

// get active categories
router.get("/products/active/categories", productController.activeCategories);

// sold product count
router.get("/products/active/fabrics", productController.activeFabrics);

// filter cart items
router.post("/filter/cart/products", productController.filterCartProducts);

// filter wishlist items
router.post(
  "/filter/wishlist/products",
  productController.filterWishlistProducts
);

module.exports = router;
