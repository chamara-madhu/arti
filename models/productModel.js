const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = mongoose.Schema(
  {
    title: { type: String, trim: true },
    type: { type: mongoose.Schema.Types.ObjectId, ref: "Type" },
    size: { type: mongoose.Schema.Types.ObjectId, ref: "Size" },
    customSize: { type: String, trim: true },
    oldPrice: { type: Number, trim: true },
    newPrice: { type: Number, trim: true },
    description: { type: String, trim: true },
    imageOne: { data: Buffer, contentType: String },
    imageTwo: { data: Buffer, contentType: String },
    imageThree: { data: Buffer, contentType: String },
    imageFour: { data: Buffer, contentType: String },
    availability: { type: Boolean },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
