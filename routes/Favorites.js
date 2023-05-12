const { Router } = require("express");

const FavoritesModel = require("../models/Favorites");

const router = Router();

// Get from favorites
router.get("/items/:email", async (req, res) => {
  let { email } = req.params;
  const checkData = await FavoritesModel.find({
    email: email,
  });
  res.json({
    data: checkData,
  });
});

// Add to favorites
router.post("/add", async (req, res) => {
  let {
    email,
    productName,
    productDescription,
    productPrice,
    productImage,
  } = req.body;
  const addData = await new FavoritesModel({
    email: email,
    productName: productName,
    productDescription: productDescription,
    productPrice: productPrice,
    productImage: productImage,
  });
  await addData.save();
  res.json({
    message: "Added to favorites",
  });
});

// Remove from favorites
router.delete("/delete/:id/:email", async (req, res) => {
  let { id, email } = req.params;
  await FavoritesModel.findOneAndDelete({
    _id: id,
    email: email,
  });
  res.json({
    message: "Deleted",
  });
});

module.exports = router;
