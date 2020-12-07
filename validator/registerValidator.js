const validator = require("validator");

exports.userRegisterValidator = data => {
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

  if (validator.isEmpty(data.mobile, { ignore_whitespace: true })) {
    errors.mobile = "Mobile is required";
  } else if (!validator.isMobilePhone(data.mobile, ["sk-SK", "sr-RS"])) {
    errors.mobile = "Mobile number is invalid";
  }

  if (validator.isEmpty(data.password, { ignore_whitespace: true })) {
    errors.password = "Password is required";
  } else if (!validator.isLength(data.password, { min: 8, max: 20 })) {
    errors.password =
      "Password must be between atleast 8 characters and maximum 20 characters";
  } else if (
    !validator.matches(
      data.password,
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    )
  ) {
    errors.password =
      "Password must contain lowercase, uppercase, number and special character";
  }

  if (validator.isEmpty(data.confirmPassword, { ignore_whitespace: true })) {
    errors.confirmPassword = "Confirm password is required";
  } else if (!validator.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = "Passwords must match";
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
