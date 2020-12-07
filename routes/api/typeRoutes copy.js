const express = require("express");
const router = express.Router();
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

// load type model
const Type = require("../../models/typeModel");

// load user model
const User = require("../../models/userModel");

// user identification
router.param("userId", (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err) {
      res.status(400).json({ error: "user not fount" });
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

// load type validator
const { typeValidator } = require("../../validator/typeValidator");

// add type
router.post(
  "/type/:userId",
  requireLogin,
  isAuth,
  isAdmin,
  (req, res, next) => {
    const { errors, isValid } = typeValidator(req.body);

    // check data validity
    if (!isValid) {
      res.status(400).json(errors);
    } else {
      // check type name existance
      Type.findOne({ name: req.body.name })
        .exec()
        .then((typeName) => {
          if (typeName) {
            errors.name = "Type name is already exists";
            return res.status(400).json(errors);
          } else {
            const type = new Type({
              name: req.body.name,
            });
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
    }
  }
);

// check type ID existance
// Type.findOne({ typeId: req.body.typeId })
//   .exec()
//   .then(typeId => {
//     if (typeId) {
//       errors.typeId = "Type ID is already exists";
//       return res.status(400).json(errors);
//     } else {
//       // check type name existance
//       Type.findOne({ name: req.body.name })
//         .exec()
//         .then(typeName => {
//           if (typeName) {
//             errors.name = "Type name is already exists";
//             return res.status(400).json(errors);
//           } else {
//             const form = new formidable.IncomingForm();
//             form.keepExtensions = true;
//             form.parse(req, (err, fields, files) => {
//               if (err) {
//                 res.status(400).json({ error: "image was not uploaded" });
//               }
//               const type = new Type(fields);
//               if (files.image) {
//                 type.image.data = fs.readFileSync(files.image.path);
//                 type.image.contentType = files.image.type;
//               }
//               type
//                 .save()
//                 .then(result => {
//                   res.status(200).json({ message: result });
//                 })
//                 .catch(err => {
//                   res.status(400).json({ error: err });
//                 });
//             });
//           }
//         })
//         .catch(err => {
//           res.status(400).json({ error: err });
//         });
//     }
//   })
//   .catch(err => {
//     res.status(400).json({ error: err });
//   });

// router.post("/type", (req, res, next) => {
//   const type = new Type(req.body);
//   type
//     .save()
//     .then(result => {
//       res.status(200).json({ message: result });
//     })
//     .catch(err => {
//       res.status(400).json({ error: err });
//     });
// });

// get all type
router.get("/categories", (req, res, next) => {
  Type.find()
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(400).json({ msg: "No type" });
      }
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
});

// get specific type
router.get("/type/:id", (req, res, next) => {
  Type.findOne({ _id: req.params.id })

    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
});

// update type
router.put(
  "/type/:id/:userId",
  requireLogin,
  isAuth,
  isAdmin,
  (req, res, next) => {
    const { errors, isValid } = typeValidator(req.body);

    // check error freenas
    if (!isValid) {
      res.status(400).json(errors);
    } else {
      Type.findOne({ _id: req.params.id }).then((type) => {
        type.name = req.body.name;

        type
          .save()
          .then((result) => {
            res.status(200).json(result);
          })
          .catch((err) => {
            errors.fail = "Type is not edited successfully";
            res.status(400).json(errors);
          });
      });
    }
  }
);

// delete paticular type
router.delete(
  "/type/:id/:userId",
  requireLogin,
  isAuth,
  isAdmin,
  (req, res, next) => {
    Type.deleteOne({ _id: req.params.id })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(400).json({ error: err });
      });
  }
);

module.exports = router;
