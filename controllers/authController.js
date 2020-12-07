const bcrypt = require("bcryptjs"); // to hash password
const gravatar = require("gravatar"); // avatar
const jwt = require("jsonwebtoken"); // to generate web token
const { secretOfKey } = require("../config/keys");
const nodemailer = require("nodemailer"); // npm install nodemailer

// load user model
const User = require("../models/userModel");

// load mail username and password
const { username, password } = require("../config/keys");

// load user validators
const { userRegisterValidator } = require("../validator/registerValidator");
const { userLoginValidator } = require("../validator/loginValidator");
const {
  forgetPasswordValidator
} = require("../validator/forgetPasswordValidator");

// customer registration controller
exports.customerRegistration = (req, res, next) => {
  const { errors, isValid } = userRegisterValidator(req.body);

  // check data validity
  if (!isValid) {
    res.status(400).json(errors);
  } else {
    User.findOne({ email: req.body.email })
      .exec()
      .then(user => {
        // check email is already exist or not
        if (user) {
          errors.email = "Email already exists";
          return res.status(400).json(errors);
        } else {
          User.findOne({ mobile: req.body.mobile })
            .exec()
            .then(userMobile => {
              // check mobile is already exist or not
              if (userMobile) {
                errors.mobile = "Mobile already exists";
                return res.status(400).json(errors);
              } else {
                // hash the password
                let salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(req.body.password, salt);

                // get profile picture from gravatar servers
                const avatar = gravatar.url(req.body.email, {
                  s: "200", // size
                  r: "pg", // rating
                  d: "mm" // default image
                });
                // create new user object
                const user = new User({
                  fName: req.body.fName,
                  lName: req.body.lName,
                  image: avatar,
                  email: req.body.email,
                  dob: req.body.dob,
                  mobile: req.body.mobile,
                  role: req.body.role,
                  password: hash
                });
                // save to the database
                user
                  .save()
                  .then(result => {
                    res.status(200).json(result);
                  })
                  .catch(err => {
                    res.status(400).json({ error: "user is not added" });
                  });
              }
            });
        }
      });
  }
};

// user login
exports.userLogin = (req, res, next) => {
  const { errors, isValid } = userLoginValidator(req.body);

  // check data validity
  if (!isValid) {
    res.status(400).json(errors);
  } else {
    User.findOne({ email: req.body.email })
      .exec()
      .then(user => {
        // verify email as username
        if (!user) {
          errors.message = "Invalid username or password";
          res.status(400).json(errors);
        } else {
          // verify password
          let compare = bcrypt.compareSync(req.body.password, user.password);
          if (compare) {
            // create jwt token after password verification is sucessful
            const token = jwt.sign(
              {
                email: user.email,
                _id: user._id,
                image: user.image
              },
              secretOfKey
            );

            //set token to cookie
            res.cookie("t", token, { expire: new Date() + 3600 });
            res.status(200).json({ token: token, user: user });
          } else {
            errors.message = "Invalid username or password";
            res.status(400).json(errors);
          }
        }
      })
      .catch(err => {
        res.status(400).json({ error: err });
      });
  }
};

// user logout
exports.userLogout = (req, res) => {
  res.clearCookie("t");
  res.status(200).json({ message: "logout successfully" });
};

// user recover forget password
exports.recoverPassword = (req, res) => {
  const { errors, isValid } = forgetPasswordValidator(req.body);

  if (!isValid) {
    res.status(400).json(errors);
  } else {
    User.findOne({ email: req.body.emailForForgetPassword })
      .then(user => {
        if (user) {
          // create dynamic password
          var dynamicPassword = "";

          for (let i = 0; i < 10; i++) {
            let chars =
              "abcdEFGefghijk6789lmnuv3450+-MNOPQRSTUVWXYZ*/!@#$%^&opqrst(){wxyz12}[]=?ABCDHIJKL";
            let random = Math.floor(Math.random() * 81);
            dynamicPassword += chars.charAt(random);
          }

          // encrypt password
          const salt = bcrypt.genSaltSync(10);
          const hash = bcrypt.hashSync(dynamicPassword, salt);

          user.password = hash;
          // save dunamic password
          user.save();

          // send mail with new password
          var transporter = nodemailer.createTransport({
            service: "gmail",
            port: 25,
            secure: false, // true for 465, false for other ports
            auth: {
              user: username,
              pass: password
            }
          });

          var mailOptions = {
            from: `"Ransis Arcade" <${username}>`, // sender address
            to: req.body.emailForForgetPassword,
            subject: "Forget password",
            html: `<p>Your new password is <b>${dynamicPassword}</b></p>` // html body
          };

          transporter
            .sendMail(mailOptions)
            .then(result => {
              res.status(200).json(result);
            })
            .catch(err => {
              errors.fail = "Email has not been sent successfully";
              res.status(400).json(errors);
            });
        } else {
          errors.fail = "There's no email like this";
          res.status(400).json(errors);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
};
