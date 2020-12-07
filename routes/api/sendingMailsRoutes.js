const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer"); // npm install nodemailer
const moment = require("moment"); // npm install nodemailer

// load mail username and password
const { username, password } = require("../../config/keys");

// load product model
const User = require("../../models/userModel");

// send mail
router.post("/send/email/registration", (req, res) => {
  const mailContent = `
            <h1>Welcome to Ransis Arcade</h1>
            <h3>Thank you for your registraion as ${req.body.fName} ${
    req.body.lName
  } in ${req.body.email}</h3>
            <p>Timestamp: ${moment(req.body.createdAt).format("LLLL")}</p>
        `;

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
    to: req.body.email,
    subject: "Successful registration",
    html: mailContent // html body
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
});

// send mail for online payment
router.post("/send/email/online-payment/:userId", (req, res) => {
  // get user email
  User.findOne({ _id: req.params.userId })
    .then(user => {
      const mailContent = `
          <h1>Thank you for your payment</h1>
          <ul>
              <li>order ID: ${req.body.orderId}</li>
              <li>orderItems: ${req.body.orderItems.map(
                (items, i) => items.name
              )}</li>
              <li>transaction ID: ${
                req.body.transactionId !== ""
                  ? req.body.transactionId
                  : "Cash on delivery"
              }</li>
              <li>amount: ${req.body.amount}</li>
              <li>delivery Fee: ${req.body.deliveryFee}.00</li>
              <li>Total Payment: ${parseInt(req.body.amount) +
                parseInt(req.body.deliveryFee)}.00</li>
              <li>transaction Time: ${moment(req.body.transactionTime).format(
                "LLLL"
              )}</li>
              <li>recipient's Name: ${req.body.title} ${
        req.body.recipientsName
      }</li>
              <li>phone: ${req.body.phone}</li>
              <li>address: ${req.body.address}</li>
              
              <li>location Type: ${req.body.locationType}</li>
              <li>delivery Instructions: ${
                req.body.deliveryInstructions
                  ? req.body.deliveryInstructions
                  : "none"
              }</li>
          </ul>
      `;

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
        to: user.email,
        subject: "Successful Online Payment",
        html: mailContent // html body
      };

      transporter
        .sendMail(mailOptions)
        .then(result => {
          console.log(result);
          res.status(200).json(result);
        })
        .catch(err => {
          errors.fail = "Email has not been sent successfully";
          res.status(400).json(errors);
        });
    })
    .catch(err => {
      console.log(err);
    });
});

// send mail for cash on delivery
router.post("/send/email/cash-on-delivery/:userId", (req, res) => {
  // get user email
  User.findOne({ _id: req.params.userId })
    .then(user => {
      const mailContent = `
          <h1>Thank you for your cash on delivery</h1>
          <ul>
              <li>order ID: ${req.body.orderId}</li>
              <li>orderItems: ${req.body.orderItems.map(
                (items, i) => items.name
              )}</li>
              <li>transaction ID: ${
                req.body.transactionId !== undefined
                  ? req.body.transactionId
                  : "Cash on delivery"
              }</li>
              <li>amount: ${req.body.amount}.00</li>
              <li>delivery Fee: ${req.body.deliveryFee}.00</li>
              <li>Total Due Payment: ${req.body.amount +
                parseInt(req.body.deliveryFee)}.00</li>
              <li>transaction Time: ${moment(req.body.transactionTime).format(
                "LLLL"
              )}</li>
              <li>recipient's Name: ${req.body.title} ${
        req.body.recipientsName
      }</li>
              <li>phone: ${req.body.phone}</li>
              <li>address: ${req.body.address}</li>
              <li>location Type: ${req.body.locationType}</li>
              <li>delivery Instructions: ${
                req.body.deliveryInstructions
                  ? req.body.deliveryInstructions
                  : "none"
              }</li>
          </ul>
      `;

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
        to: user.email,
        subject: "Order Confirm - Cah On Delivery",
        html: mailContent // html body
      };

      transporter
        .sendMail(mailOptions)
        .then(result => {
          console.log(result);
          res.status(200).json(result);
        })
        .catch(err => {
          errors.fail = "Email has not been sent successfully";
          res.status(400).json(errors);
        });
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
