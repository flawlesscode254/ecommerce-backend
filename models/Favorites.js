const { Schema, model } = require("mongoose");

const favoritesSchema = new Schema(
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
    productImage: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const favoritesModel = model("favoritesModel", favoritesSchema);

module.exports = favoritesModel;
