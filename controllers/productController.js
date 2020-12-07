const formidable = require("formidable");
// const _ = require("lodash");
const fs = require("fs");

// load product model
const Product = require("../models/productModel");

// load product validator
const { productValidator } = require("../validator/productValidator");
const { editProductValidator } = require("../validator/productValidator");

// create product
exports.createProduct = (req, res) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    // validate data through validator
    const { errors, isValid } = productValidator(fields, files);

    // validate data
    if (!isValid) {
      res.status(400).json(errors);
    } else {
      // create new product object
      const product = new Product(fields);
      // save images in database
      if (files.imageOne) {
        product.imageOne.data = fs.readFileSync(files.imageOne.path);
        product.imageOne.contentType = files.imageOne.type;
      }

      if (files.imageTwo) {
        product.imageTwo.data = fs.readFileSync(files.imageTwo.path);
        product.imageTwo.contentType = files.imageTwo.type;
      }

      if (files.imageThree) {
        product.imageThree.data = fs.readFileSync(files.imageThree.path);
        product.imageThree.contentType = files.imageThree.type;
      }

      if (files.imageFour) {
        product.imageFour.data = fs.readFileSync(files.imageFour.path);
        product.imageFour.contentType = files.imageFour.type;
      }
      // save to database
      product
        .save()
        .then((result) => {
          res.status(200).json(result);
        })
        .catch((err) => {
          console.log(err);
          errors.fail = "Product is not added successfully";
          res.status(400).json(errors);
        });
    }
  });
};

/**
 * sold - /products?sortBy=sold&order=desc&limit=6
 * latest arrival - /product?sortBy=createdAt&order=asc&limit=6
 * if there's no any query params, all products are returned
 */

// read products
exports.readProducts = (req, res) => {
  const sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  const order = req.query.order ? req.query.order : "asc";
  const limit = req.query.limit ? parseInt(req.query.limit) : "";

  Product.find()
    // .select("-imageFront -imageJacket -imageBorder -imageBack")
    // .populate("category", "name")
    // .populate("fabric", "name")
    // .sort([[sortBy, order]])
    // .limit(limit)
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(200).json({ msg: "No Products" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

// update product
exports.updateProduct = (req, res) => {
  // validate data through validator
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    const { errors, isValid } = editProductValidator(fields);

    // validate data
    if (!isValid) {
      res.status(400).json(errors);
    } else {
      Product.findOne({ _id: req.params.id })
        .exec()
        .then((product) => {
          product.name = fields.name;
          product.category = fields.category;
          product.fabric = fields.fabric;
          product.color = fields.color;
          product.oldPrice = fields.oldPrice;
          product.newPrice = fields.newPrice;
          product.cost = fields.cost;
          product.quantity = fields.quantity;
          product.occasionCasual = fields.occasionCasual;
          product.occasionParty = fields.occasionParty;
          product.occasionOffice = fields.occasionOffice;
          product.occasionCocktail = fields.occasionCocktail;
          product.occasionWedding = fields.occasionWedding;
          product.washAndCare = fields.washAndCare;
          product.description = fields.description;
          product.keywords = fields.keywords;
          product.status = fields.status;

          // save images in database
          if (files.imageFront) {
            product.imageFront.data = fs.readFileSync(files.imageFront.path);
            product.imageFront.contentType = files.imageFront.type;
          }

          if (files.imageJacket) {
            product.imageJacket.data = fs.readFileSync(files.imageJacket.path);
            product.imageJacket.contentType = files.imageJacket.type;
          }

          if (files.imageBorder) {
            product.imageBorder.data = fs.readFileSync(files.imageBorder.path);
            product.imageBorder.contentType = files.imageBorder.type;
          }

          if (files.imageBack) {
            product.imageBack.data = fs.readFileSync(files.imageBack.path);
            product.imageBack.contentType = files.imageBack.type;
          }
          // save to database
          product
            .save()
            .then((result) => {
              res.status(200).json(result);
            })
            .catch((err) => {
              errors.fail = "Product is not updated successfully";
              res.status(400).json(errors);
            });
        })
        .catch((err) => {
          res.status(400).json({ error: err });
        });
    }
  });
};

// read specific product
exports.readSpecificProduct = (req, res) => {
  Product.findOne({ _id: req.params.id })
    .select("-imageFront -imageJacket -imageBorder -imageBack")
    .populate("category", "name")
    .populate("fabric", "name")
    .exec()
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ msg: "Product not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

// delete product
exports.deleteProduct = (req, res) => {
  console.log(req.params.id);
  Like.find({ productId: req.params.id })
    .then((result) => {
      console.log(result);
      console.log(result.length);
      if (result.length > 0) {
        // delete likes relates to this product
        Like.deleteMany({ productId: req.params.id }).then().catch();
      } else {
        Comment.find({ productId: req.params.id })
          .then((result) => {
            console.log(result);
            console.log(result.length);
            if (result.length > 0) {
              // delete likes relates to this product
              Comment.deleteMany({ productId: req.params.id }).then().catch();
            } else {
              Rating.find({ productId: req.params.id })
                .then((result) => {
                  console.log(result);
                  console.log(result.length);
                  if (result.length > 0) {
                    // delete likes relates to this product
                    Rating.deleteMany({ productId: req.params.id })
                      .then()
                      .catch();
                  } else {
                    Product.deleteOne({ _id: req.params.id })
                      .exec()
                      .then((product) => {
                        res.status(200).json(result);
                      })
                      .catch((err) => {
                        res.status(500).json({ error: err });
                      });
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    })
    .catch((err) => {
      console.log(err);
    });

  // find relevant product using id and delete
  Product.deleteOne({ _id: req.params.id })
    .exec()
    .then((product) => {
      res.status(200).json(result);

      //     // delete likes relates to this product
      //     Like.deleteMany({ productId: req.params.id })
      //       .then(result => {
      //         console.log(result);
      //       })
      //       .catch(err => {
      //         console.log(err);
      //       });

      //     Comment.deleteMany({ productId: req.params.id })
      //       .then(result => {
      //         console.log(result);
      //       })
      //       .catch(err => {
      //         console.log(err);
      //       });

      //     // delete ratings relates to this product
      //     Rating.deleteMany({ productId: req.params.id })
      //       .then(result => {
      //         console.log(result);
      //       })
      //       .catch(err => {
      //         console.log(err);
      //       });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

// delete all products
exports.deleteAllProducts = (req, res) => {
  Product.deleteMany()
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

// advanced filtering
exports.advancedFiltering = (req, res) => {
  switch (req.params.occasion) {
    case "Casual":
      var occasion = "occasionCasual";
      var value = true;
      break;
    case "Party":
      var occasion = "occasionParty";
      var value = true;
      break;
    case "Office":
      var occasion = "occasionOffice";
      var value = true;
      break;
    case "Cocktail":
      var occasion = "occasionCocktail";
      var value = true;
      break;
    case "Wedding & Engagement":
      var occasion = "occasionWedding";
      var value = true;
      break;
    default:
      var occasion = "occasionCasual";
      var value = { $ne: null };
  }

  if (req.params.fabric !== "Any") {
    var fabric = req.params.fabric;
  } else {
    var fabric = { $ne: null };
  }

  if (req.params.category !== "Any") {
    var category = req.params.category;
  } else {
    var category = { $ne: null };
  }

  if (req.params.color !== "Any") {
    var color = req.params.color;
  } else {
    var color = { $ne: null };
  }

  Product.find({
    quantity: 1,
    category: category,
    fabric: fabric,
    [occasion]: value,
    newPrice: { $gt: req.params.min, $lte: req.params.max },
    color: new RegExp(color, "i"),
  })
    .select("-imageFront -imageJacket -imageBorder -imageBack")
    .populate("category", "name")
    .sort({ createdAt: "desc" })
    .then((results) => {
      console.log(results);
      if (results) {
        res.status(200).json(results);
      } else {
        res.status(200).json({ msg: "No Products" });
      }
    });
};

// filter by category
exports.filterByCategory = (req, res) => {
  Product.find({ category: req.params.categoryName, quantity: 1 })
    .select("-imageFront -imageJacket -imageBorder -imageBack")
    .populate("category", "name")
    .sort({ createdAt: "desc" })
    .then((results) => {
      if (results) {
        res.status(200).json(results);
      } else {
        res.status(200).json({ msg: "No Products" });
      }
    });
};

// filter by fabric
exports.filterByFabric = (req, res) => {
  Product.find({ fabric: req.params.fabricName, quantity: 1 })
    .select("-imageFront -imageJacket -imageBorder -imageBack")
    .populate("category", "name")
    .sort({ createdAt: "desc" })
    .then((results) => {
      if (results) {
        res.status(200).json(results);
      } else {
        res.status(200).json({ msg: "No Products" });
      }
    })
    .catch((err) => console.log(err));
};

// filter by occasion
exports.filterByOccasion = (req, res) => {
  switch (req.params.occasionType) {
    case "Casual":
      var occasion = "occasionCasual";
      break;
    case "Party":
      var occasion = "occasionParty";
      break;
    case "Office":
      var occasion = "occasionOffice";
      break;
    case "Cocktail":
      var occasion = "occasionCocktail";
      break;
    default:
      var occasion = "occasionWedding";
  }

  Product.find({ [occasion]: true, quantity: 1 })
    .select("-imageFront -imageJacket -imageBorder -imageBack")
    .populate("category", "name")
    .sort({ createdAt: "desc" })
    .then((results) => {
      if (results) {
        res.status(200).json(results);
      } else {
        res.status(200).json({ msg: "No Products" });
      }
    });
};

// filter by price
exports.filterByPrice = (req, res) => {
  Product.find({
    newPrice: { $gte: req.params.min, $lte: req.params.max },
    quantity: 1,
  })
    .select("-imageFront -imageJacket -imageBorder -imageBack")
    .populate("category", "name")
    .sort({ createdAt: "desc" })
    .then((results) => {
      if (results) {
        res.status(200).json(results);
      } else {
        res.status(200).json({ msg: "No Products" });
      }
    });
};

// filter by color
exports.filterByColor = (req, res) => {
  let color = req.params.color;
  Product.find({ color: new RegExp(color, "i"), quantity: 1 })
    .select("-imageFront -imageJacket -imageBorder -imageBack")
    .sort({ createdAt: "desc" })
    .then((results) => {
      if (results) {
        res.status(200).json(results);
      } else {
        res.status(200).json({ msg: "No Products" });
      }
    });
};

// filter by likes
exports.filterByLikes = (req, res) => {
  Product.find({ likes: { $gt: 0 }, quantity: 1 })
    .select("-imageFront -imageJacket -imageBorder -imageBack")
    .sort({ createdAt: "desc" })
    .then((results) => {
      if (results) {
        res.status(200).json(results);
      } else {
        res.status(200).json({ msg: "No Products" });
      }
    });
};

// filter by comments
exports.filterByComments = (req, res) => {
  Product.find({ comments: { $gt: 0 }, quantity: 1 })
    .select("-imageFront -imageJacket -imageBorder -imageBack")
    .sort({ createdAt: "desc" })
    .then((results) => {
      if (results) {
        res.status(200).json(results);
      } else {
        res.status(200).json({ msg: "No Products" });
      }
    });
};

// filter by ratings
exports.filterByRatings = (req, res) => {
  if (req.params.ratingFloor == 0 && req.params.ratingCeil == 0) {
    Product.find({
      rating: 0,
      quantity: 1,
    })
      .select("-imageFront -imageJacket -imageBorder -imageBack")
      .sort({ createdAt: "desc" })
      .then((results) => {
        if (results) {
          res.status(200).json(results);
        } else {
          res.status(200).json({ msg: "No Products" });
        }
      });
  } else {
    Product.find({
      rating: { $gt: req.params.ratingFloor, $lte: req.params.ratingCeil },
      quantity: 1,
    })
      .select("-imageFront -imageJacket -imageBorder -imageBack")
      .sort({ createdAt: "desc" })
      .then((results) => {
        if (results) {
          res.status(200).json(results);
        } else {
          res.status(200).json({ msg: "No Products" });
        }
      });
  }
};

// get related products
exports.relatedProducts = (req, res) => {
  // const sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  // const order = req.query.order ? req.query.order : "asc";
  // const limit = req.query.limit ? parseInt(req.query.limit) : 8;

  Product.findOne({ _id: req.params.id })
    .exec()
    .then((product) => {
      Product.find({
        _id: { $ne: req.params.id },
        category: product.category,
        quantity: 1,
      })
        .select("-imageFront -imageJacket -imageBorder -imageBack")
        .populate("category", "name")
        .limit(6)
        .sort({ createdAt: "desc" })
        .then((result) => {
          if (result.length > 0) {
            res.status(200).json(result);
          } else {
            res.status(200).json({ msg: "No related Products" });
          }
        })
        .catch((err) => {
          res.status(500).json({ error: err });
        });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

// get front image
exports.frontImage = (req, res) => {
  Product.findOne({ _id: req.params.id })
    .exec()
    .then((product) => {
      if (product.imageFront.data) {
        res.set("Content-Type", product.imageFront.contentType);
        return res.send(product.imageFront.data);
      }
    });
};

// get front image
exports.jacketImage = (req, res) => {
  Product.findOne({ _id: req.params.id })
    .exec()
    .then((product) => {
      if (product.imageJacket.data) {
        res.set("Content-Type", product.imageJacket.contentType);
        return res.send(product.imageJacket.data);
      }
    });
};

// get front image
exports.borderImage = (req, res) => {
  Product.findOne({ _id: req.params.id })
    .exec()
    .then((product) => {
      if (product.imageBorder.data) {
        res.set("Content-Type", product.imageBorder.contentType);
        return res.send(product.imageBorder.data);
      }
    });
};
// get front image
exports.backImage = (req, res) => {
  Product.findOne({ _id: req.params.id })
    .exec()
    .then((product) => {
      if (product.imageBack.data) {
        res.set("Content-Type", product.imageBack.contentType);
        return res.send(product.imageBack.data);
      }
    });
};

// get search product
exports.productSearch = (req, res) => {
  const keyword = req.params.keyword;
  Product.find({ keywords: new RegExp(keyword, "i"), quantity: 1 })
    .select("-imageFront -imageJacket -imageBorder -imageBack")
    .sort({ createdAt: "desc" })
    .then((results) => {
      if (results) {
        res.status(200).json(results);
      } else {
        res.status(200).json({ msg: "No Products" });
      }
    });
};

// get sold products
exports.soldProducts = (req, res) => {
  Product.find({ sold: 1 })
    .select("-imageFront -imageJacket -imageBorder -imageBack")
    .populate("category", "name")
    .populate("fabric", "name")
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
};

//  get active categories
exports.activeCategories = (req, res) => {
  Product.distinct("category")
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
};

//  get active categories
exports.activeFabrics = (req, res) => {
  Product.distinct("fabric")
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
};

// filter cart items
exports.filterCartProducts = (req, res) => {
  var arr = [];
  let insertProduct;

  for (let i = 0; i < req.body.cartItemsIds.length; i++) {
    Product.findOne({ _id: req.body.cartItemsIds[i], quantity: 1 })
      .select("-imageFront -imageJacket -imageBorder -imageBack")
      .then((result) => {
        if (result !== null) {
          insertProduct = result;

          arr = [...arr, insertProduct];
        }
        if (i === req.body.cartItemsIds.length - 1) {
          res.status(200).json(arr);
        }
      });
  }
};

// filter wishlist items
exports.filterWishlistProducts = (req, res) => {
  var arr = [];
  let insertProduct;

  for (let i = 0; i < req.body.wishlistItemsIds.length; i++) {
    Product.findOne({ _id: req.body.wishlistItemsIds[i], quantity: 1 })
      .select("-imageFront -imageJacket -imageBorder -imageBack")
      .then((result) => {
        if (result !== null) {
          insertProduct = result;

          arr = [...arr, insertProduct];
        }
        if (i === req.body.wishlistItemsIds.length - 1) {
          res.status(200).json(arr);
        }
      });
  }
};
