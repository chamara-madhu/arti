const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs"); // encryption
// const gravatar = require("gravatar"); // avatar
// const jwt = require("jsonwebtoken"); // to generate web token
// const { secretOfKey } = require("../../config/keys");

// load user model
const User = require("../../models/userModel");

// load auth-middleware
const {
  requireLogin,
  isAuth,
  isAdmin
} = require("../../auth-middleware/check-auth");

// load user validators
const {
  userUpdateValidator,
  userChangePasswordValidator
} = require("../../validator/userUpdateValidator");

router.get("/secret/:userId", requireLogin, isAuth, isAdmin, (req, res) => {
  res.json({ user: req.profile });
});

router.param("userId", (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err) {
      res.status(400).json({ error: "user not fount" });
    }
    req.profile = user;
    next();
  });
});

// update user profile
router.put("/user/update/:userId", requireLogin, isAuth, (req, res, next) => {
  const { errors, isValid } = userUpdateValidator(req.body);

  if (!isValid) {
    res.status(400).json(errors);
  } else {
    User.findOneAndUpdate({ _id: req.params.userId }, req.body)
      .then(result => {
        // sed updated data
        User.findOne({ _id: req.params.userId }).then(data => {
          res.status(200).json(data);
        });
      })
      .catch(err => {
        errors.fail = "Your account has not been updated successfully!";
        res.status(400).json(errors);
      });
  }
});

// update user password
router.put(
  "/user/change/password/:userId",
  requireLogin,
  isAuth,
  (req, res) => {
    const { errors, isValid } = userChangePasswordValidator(req.body);

    if (!isValid) {
      res.status(400).json(errors);
    } else {
      User.findOne({ _id: req.params.userId })
        .then(user => {
          // compare old passwords
          const compare = bcrypt.compareSync(
            req.body.oldPassword,
            user.password
          );
          if (compare) {
            // encrypt password
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.newPassword, salt);

            // asign to password
            user.password = hash;
            user
              .save()
              .then(success => {
                res
                  .status(200)
                  .json({ message: "Password change is successful." });
              })
              .catch(err => {
                errors.fail = "Password change is unsuccessful.";
                return res.status(400).json(errors);
              });
          } else {
            errors.oldPassword = "Old password is incorrect";
            res.status(400).json(errors);
          }
        })
        .catch(err => console.log(err));
    }
  }
);

// delete admin users
router.delete("/adminUser/:id/:userId", (req, res) => {
  User.deleteOne({ _id: req.params.id })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(400).json({ error: err });
    });
});

// count customers
router.get("/customers", (req, res, next) => {
  User.find({ role: 0 })
    .countDocuments()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(400).json({ error: err });
    });
});

// get admin user
router.get("/adminUser/:id", (req, res, next) => {
  User.find({ _id: req.params.id })
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(400).json({ error: err });
    });
});

// get all admin users
router.get("/adminUsers", (req, res, next) => {
  User.find({ role: 1 })
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(400).json({ error: err });
    });
});

module.exports = router;
