const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    fName: { type: String, required: true, trim: true },
    lName: { type: String, required: true, trim: true },
    image: { type: String },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    mobile: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, trim: true },
    role: { type: Number, default: 0 }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", userSchema);
