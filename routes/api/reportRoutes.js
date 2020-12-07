const express = require("express");
const router = express.Router();
const moment = require("moment");

// load product model
const Product = require("../../models/productModel");

// load category model
const Category = require("../../models/categoryModel");

// load fabric model
const Fabric = require("../../models/fabricModel");

// load product model
const User = require("../../models/userModel");

// load fabric model
const { Order } = require("../../models/orderModel");

// get active categories
router.get("/products/report/by/category", (req, res) => {
  Product.aggregate([
    { $match: { quantity: 1 } },
    { $group: { _id: { category: "$category" }, count: { $sum: 1 } } }
  ])
    .then(categories => {
      if (categories.length > 0) {
        // populate by category to get category name
        Category.populate(categories, { path: "_id" })
          .then(populatedResult => {
            res.status(200).json(populatedResult);
          })
          .catch(err => {
            res.status(400).json({ error: "no active categories" });
          });
      }
    })
    .catch(err => {
      res.status(400).json({ error: "no active categories" });
    });
});

// get active fabrics
router.get("/products/inventory/by/fabric", (req, res) => {
  Product.aggregate([
    { $match: { quantity: 1 } },
    { $group: { _id: { fabric: "$fabric" }, count: { $sum: 1 } } }
  ])
    .then(fabrics => {
      if (fabrics.length > 0) {
        Fabric.populate(fabrics, { path: "_id" })
          .then(populatedResult => {
            res.status(200).json(populatedResult);
          })
          .catch(err => {
            res.status(400).json({ error: "no active fabrics" });
          });
      }
    })
    .catch(err => {
      res.status(400).json({ error: "no active fabrics" });
    });
});

// get all products by specific price
router.get("/products/priceRange/:min/:max", (req, res) => {
  Product.find({
    quantity: 1,
    newPrice: { $gte: req.params.min, $lte: req.params.max }
  })
    .countDocuments()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(400).json({ error: err });
    });
});

// get all products by specific color
router.get("/products/color-count/:color", (req, res) => {
  Product.find({
    quantity: 1,
    color: new RegExp(req.params.color, "i")
  })
    .countDocuments()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(400).json({ error: err });
    });
});

// get all products by specific likes
router.get("/products/likes-counts", (req, res) => {
  Product.find({
    quantity: 1,
    likes: { $gte: 1 }
  })
    .countDocuments()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(400).json({ error: err });
    });
});

// get all products by specific comments
router.get("/products/comments-counts", (req, res) => {
  Product.find({
    quantity: 1,
    comments: { $gte: 1 }
  })
    .countDocuments()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(400).json({ error: err });
    });
});

// get all products by specific ratings
router.get("/products/ratings-counts", (req, res) => {
  Product.find({
    quantity: 1,
    rating: { $gte: 1 }
  })
    .countDocuments()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(400).json({ error: err });
    });
});

// get active categories
router.get("/report/category-wise-sold-products", (req, res) => {
  Product.aggregate([
    { $match: { sold: 1 } },
    { $group: { _id: { category: "$category" }, count: { $sum: 1 } } }
  ])
    .then(categories => {
      if (categories.length > 0) {
        // populate by category to get category name
        Category.populate(categories, { path: "_id" })
          .then(populatedResult => {
            res.status(200).json(populatedResult);
          })
          .catch(err => {
            res.status(400).json({ error: "no active categories" });
          });
      }
    })
    .catch(err => {
      res.status(400).json({ error: "no active categories" });
    });
});

// get active fabrics
router.get("/report/fabric-wise-sold-products", (req, res) => {
  Product.aggregate([
    { $match: { sold: 1 } },
    { $group: { _id: { fabric: "$fabric" }, count: { $sum: 1 } } }
  ])
    .then(fabrics => {
      if (fabrics.length > 0) {
        Fabric.populate(fabrics, { path: "_id" })
          .then(populatedResult => {
            res.status(200).json(populatedResult);
          })
          .catch(err => {
            res.status(400).json({ error: "no active fabrics" });
          });
      }
    })
    .catch(err => {
      res.status(400).json({ error: "no active fabrics" });
    });
});

// get all products by specific price
router.get(
  "/report/price-wise-sold-products/:min/:max",
  (req, res) => {
    Product.find({
      sold: 1,
      newPrice: { $gte: req.params.min, $lte: req.params.max }
    })
      .countDocuments()
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        res.status(400).json({ error: err });
      });
  }
);

// get all products by specific color
router.get("/report/color-wise-sold-products/:color", (req, res) => {
  Product.find({
    sold: 1,
    color: new RegExp(req.params.color, "i")
  })
    .countDocuments()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(400).json({ error: err });
    });
});

// get all products by specific likes
router.get("/products/report/likes-wise-sold-products", (req, res) => {
  Product.find({
    sold: 1,
    likes: { $gte: 1 }
  })
    .countDocuments()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(400).json({ error: err });
    });
});

// get all products by specific comments
router.get("/products/report/comments-wise-sold-products", (req, res) => {
  Product.find({
    sold: 1,
    comments: { $gte: 1 }
  })
    .countDocuments()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(400).json({ error: err });
    });
});

// get all products by specific ratings
router.get("/products/report/ratings-wise-sold-products", (req, res) => {
  Product.find({
    sold: 1,
    rating: { $gte: 1 }
  })
    .countDocuments()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(400).json({ error: err });
    });
});

// get sales report
router.get("/report/profit/:from/:to", (req, res) => {
  let from = moment.utc(req.params.from).format();
  let to = moment(req.params.to).format();

  console.log(new Date(req.params.from), new Date(req.params.to));
  // Product.find({ createdAt: { $gt: from, $lte: to } })
  Order.find({
    createdAt: {
      $gte: new Date(req.params.from),
      $lte: new Date(req.params.to)
    }
  })
    .then(orders => {
      res.status(200).json(orders);
    })
    .catch(err => {
      res.status(500).json({ error: "no orders" });
    });
});

// get inventory report
router.get("/inventory/report", (req, res) => {
  Product.find({
    quantity: 1
  })
    .select("-imageFront -imageJacket -imageBorder -imageBack")
    .then(inventory => {
      res.status(200).json(inventory);
    })
    .catch(err => {
      res.status(500).json({ error: "no products" });
    });
});

// get sold items report
router.get("/products/sold/report", (req, res) => {
  Product.find({
    sold: 1
  })
    .select("-imageFront -imageJacket -imageBorder -imageBack")
    .then(sold => {
      res.status(200).json(sold);
    })
    .catch(err => {
      res.status(500).json({ error: "no sold products" });
    });
});

// get customer report
router.get("/customer/report", (req, res) => {
  User.aggregate([{ $match: { role: 0 } }])
    .then(customers => {
      res.status(200).json(customers);
    })
    .catch(err => {
      res.status(500).json({ error: "no customers" });
    });
});

module.exports = router;
