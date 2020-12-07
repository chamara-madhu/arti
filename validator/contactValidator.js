const validator = require("validator");

exports.contactValidator = data => {
  let errors = {};

  if (validator.isEmpty(data.fName, { ignore_whitespace: true })) {
    errors.fName = "First name is required";
  } else if (!validator.isAlpha(data.fName)) {
    errors.fName = "First name must contain only letters";
  }

  if (validator.isEmpty(data.lName, { ignore_whitespace: true })) {
    errors.lName = "Last name is required";
  } else if (!validator.isAlpha(data.lName)) {
    errors.lName = "Last name must contain only letters";
  }

  if (validator.isEmpty(data.email, { ignore_whitespace: true })) {
    errors.email = "Email is required";
  } else if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (validator.isEmpty(data.phone, { ignore_whitespace: true })) {
    errors.phone = "Mobile is required";
  } else if (!validator.isMobilePhone(data.phone, ["sk-SK", "sr-RS"])) {
    errors.phone = "Mobile number is invalid";
  }

  if (validator.isEmpty(data.subject, { ignore_whitespace: true })) {
    errors.subject = "Mail subject is required";
  }

  if (validator.isEmpty(data.message, { ignore_whitespace: true })) {
    errors.message = "Message is required";
  }

  let isValid = null;

  if (
    errors === undefined ||
    errors === null ||
    (typeof errors === "object" && Object.keys(errors).length === 0) ||
    (typeof errors === "string" && errors.trim().length === 0)
  ) {
    isValid = true;
  } else {
    isValid = false;
  }

  return {
    errors: errors,
    isValid: isValid
  };
};
