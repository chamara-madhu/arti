const validator = require("validator");

exports.userLoginValidator = data => {
  let errors = {};

  if (validator.isEmpty(data.email, { ignore_whitespace: true })) {
    errors.email = "Email is required";
  } else if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (validator.isEmpty(data.password, { ignore_whitespace: true })) {
    errors.password = "Password is required";
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
