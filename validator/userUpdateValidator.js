const validator = require("validator");

// update first name, last name and mobile
exports.userUpdateValidator = data => {
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

  if (validator.isEmpty(data.mobile, { ignore_whitespace: true })) {
    errors.mobile = "Mobile is required";
  } else if (!validator.isMobilePhone(data.mobile, ["sk-SK", "sr-RS"])) {
    errors.mobile = "Mobile number is invalid";
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

// update password
exports.userChangePasswordValidator = data => {
  let errors = {};

  if (validator.isEmpty(data.oldPassword, { ignore_whitespace: true })) {
    errors.oldPassword = "Old password is required";
  } else if (!validator.isLength(data.oldPassword, { min: 8, max: 20 })) {
    errors.oldPassword =
      "Password must be between atleast 8 characters and maximum 20 characters";
  }
  //  else if (
  //   !validator.matches(
  //     data.oldPassword,
  //     "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  //   )
  // ) {
  //   errors.oldPassword =
  //     "Password must contain lowercase, uppercase, number and special character";
  // }

  if (validator.isEmpty(data.newPassword, { ignore_whitespace: true })) {
    errors.newPassword = "New password is required";
  } else if (!validator.isLength(data.newPassword, { min: 8, max: 20 })) {
    errors.newPassword =
      "Password must be between atleast 8 characters and maximum 20 characters";
  } else if (
    !validator.matches(
      data.newPassword,
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    )
  ) {
    errors.newPassword =
      "Password must contain lowercase, uppercase, number and special character";
  }

  if (validator.isEmpty(data.confirmPassword, { ignore_whitespace: true })) {
    errors.confirmPassword = "Confirm password is required";
  } else if (!validator.equals(data.newPassword, data.confirmPassword)) {
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
