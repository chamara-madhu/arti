const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer"); // npm install nodemailer

// load contact validator
const { contactValidator } = require("../../validator/contactValidator");

// load mail username and password
const { username, password } = require("../../config/keys");

// send mail
router.post("/send/email", (req, res) => {
  const { errors, isValid } = contactValidator(req.body);

  // check error freenas
  if (!isValid) {
    res.status(400).json(errors);
  } else {
    const mailContent = `
            <h1>You have a new customer request</h1>
            <h3>Contact Details</h3>

            <ul>
                <li>Name: ${req.body.fName} ${req.body.lName}</li>
                <li>Email: ${req.body.email}</li>
                <li>Phone: ${req.body.phone}</li>
                <li>Subject: ${req.body.subject}</li>
            </ul>
            <p>${req.body.message}</p>
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
      from: `"${req.body.fName}" <${req.body.email}>`, // sender address
      to: username,
      subject: req.body.subject,
      html: mailContent // html body
    };

    transporter
      .sendMail(mailOptions)
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
          errors.fail = "Email has not been sent successfully"
          res.status(400).json(errors)
      });
  }
});

module.exports = router;
