const validator = require("validator");

exports.forgetPasswordValidator = data => {
  let errors = {};

  if (validator.isEmpty(data.emailForForgetPassword, { ignore_whitespace: true })) {
    errors.emailForForgetPassword = "Email is required";
  } else if (!validator.isEmail(data.emailForForgetPassword)) {
    errors.emailForForgetPassword = "Email is invalid";
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