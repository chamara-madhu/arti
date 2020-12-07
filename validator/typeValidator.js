const validator = require("validator");

exports.typeValidator = (data) => {
  let errors = {};

  if (validator.isEmpty(data.type, { ignore_whitespace: true })) {
    errors.type = "Type is required";
  } else if (!validator.matches(data.type, /^[a-zA-Z\s]*$/)) {
    errors.type = "Type must contain only letters and spaces";
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
    isValid: isValid,
  };
};
