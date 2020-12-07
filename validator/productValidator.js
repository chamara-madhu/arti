const validator = require("validator");

exports.productValidator = (data, images) => {
  let errors = {};

  if (images.imageOne === undefined) {
    errors.imageOne = "Front image is required";
  }

  if (validator.isEmpty(data.title, { ignore_whitespace: true })) {
    errors.title = "Product title is required";
  } else if (!validator.matches(data.title, /^[a-zA-Z\s]*$/)) {
    errors.title = "Product title must contain only letters and spaces";
  }

  // if (validator.isEmpty(data.type, { ignore_whitespace: true })) {
  //   errors.type = "Type is required";
  // }

  // if (validator.isEmpty(data.size, { ignore_whitespace: true })) {
  //   errors.size = "size is required";
  // }

  if (validator.isEmpty(data.newPrice, { ignore_whitespace: true })) {
    errors.newPrice = "New price is required";
  }

  if (validator.isEmpty(data.description, { ignore_whitespace: true })) {
    errors.description = "Description is required";
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

exports.editProductValidator = (data) => {
  let errors = {};

  if (validator.isEmpty(data.name, { ignore_whitespace: true })) {
    errors.name = "Product name is required";
  } else if (!validator.matches(data.name, /^[a-zA-Z\s]*$/)) {
    errors.name = "Product name must contain only letters and spaces";
  }

  if (validator.isEmpty(data.category, { ignore_whitespace: true })) {
    errors.category = "Category is required";
  }

  if (validator.isEmpty(data.fabric, { ignore_whitespace: true })) {
    errors.fabric = "Fabric is required";
  }

  if (validator.isEmpty(data.color, { ignore_whitespace: true })) {
    errors.color = "Color is required";
  } else if (!validator.matches(data.color, /^[a-zA-Z\s]*$/)) {
    errors.color = "Color must contain only letters and spaces";
  }

  if (validator.isEmpty(data.newPrice, { ignore_whitespace: true })) {
    errors.newPrice = "New price is required";
  }

  if (validator.isEmpty(data.cost, { ignore_whitespace: true })) {
    errors.cost = "Cost is required";
  }

  if (validator.isEmpty(data.quantity, { ignore_whitespace: true })) {
    errors.quantity = "Quantity is required";
  }

  if (validator.isEmpty(data.washAndCare, { ignore_whitespace: true })) {
    errors.washAndCare = "Wash and Care is required";
  }

  if (validator.isEmpty(data.description, { ignore_whitespace: true })) {
    errors.description = "Description is required";
  }

  if (validator.isEmpty(data.keywords, { ignore_whitespace: true })) {
    errors.keywords = "keywords are required";
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
