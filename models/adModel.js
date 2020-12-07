const mongoose = require("mongoose");

const adSchema = mongoose.Schema(
  {
    title: { type: String, trim: true },
    // type: { type: mongoose.Schema.Types.ObjectId, ref: "Type" },
    // size: { type: mongoose.Schema.Types.ObjectId, ref: "Size" },
    customSize: { type: String, trim: true },
    price: { type: Number, trim: true },
    description: { type: String, trim: true },
    // images: { type: Array },
    location: {
      district: { type: String },
      city: { type: String },
    },
    contact: {
      name: { type: String },
      phone: { type: Array },
    },
    status: { type: Boolean, default: true },
    isReviewed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ad", adSchema);
