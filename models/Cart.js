const { Schema, model } = require("mongoose");

const cartSchema = new Schema(
  {
    email: {
      type: String,
    },
    productName: {
      type: String,
    },
    productDescription: {
      type: String,
    },
    productPrice: {
      type: Number,
    },
    productQuantity: {
      type: Number,
    },
    productImage: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const cartModel = model("cartModel", cartSchema);

module.exports = cartModel;
