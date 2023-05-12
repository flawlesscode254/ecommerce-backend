const { Router } = require("express");

const CartModel = require("../models/Cart");

const router = Router();

// Get from cart
router.get("/items/:email", async (req, res) => {
  let { email } = req.params;
  const checkData = await CartModel.find({
    email: email,
  });
  res.json({
    data: checkData,
  });
});

// Add to cart
router.post("/add", async (req, res) => {
  let {
    email,
    productName,
    productDescription,
    productPrice,
    productQuantity,
    productImage,
  } = req.body;
  const addData = await new CartModel({
    email: email,
    productName: productName,
    productDescription: productDescription,
    productPrice: productPrice,
    productQuantity: productQuantity,
    productImage: productImage,
  });
  await addData.save();
  res.json({
    message: "Added to cart",
  });
});

// Update in cart
router.put("/update/:id/:email", async (req, res) => {
  let { id, email } = req.params;
  await CartModel.findOneAndUpdate(
    {
      _id: id,
      email: email,
    },
    {
      $set: req.body,
    }
  );
  res.json({
    message: "Updated",
  });
});

// Remove from cart
router.delete("/delete/:id/:email", async (req, res) => {
  let { id, email } = req.params;
  await CartModel.findOneAndDelete({
    _id: id,
    email: email,
  });
  res.json({
    message: "Deleted",
  });
});

module.exports = router;
