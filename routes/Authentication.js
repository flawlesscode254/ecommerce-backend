const { Router } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const UserModel = require("../models/User");

const router = Router();

const secret = process.env.JWT_SECRET;

// Sign Up
router.post("/register", async (req, res) => {
  let { firstName, secondName, email, phoneNumber, password } = req.body;
  password = await bcrypt.hash(password, 12);
  const checkExistingUser = await UserModel.findOne({
    firstName: firstName,
    secondName: secondName,
    email: email,
    phoneNumber: phoneNumber,
  });
  if (checkExistingUser) {
    res.json({
      message: "User with those details already exists",
    });
  } else {
    let createdUser = await new UserModel({
      firstName,
      secondName,
      email,
      phoneNumber,
      password,
    });
    let savedUser = await createdUser.save();
    const ciphertext = jwt.sign(
      {
        id: savedUser._id,
        email: savedUser.email,
      },
      secret
    );
    res.json({
      token: ciphertext,
      data: {
        firstName: firstName,
        secondName: secondName,
        email: email,
        phoneNumber: phoneNumber,
      },
    });
  }
});

// Sign In
router.post("/login", async (req, res) => {
  let { email, password } = req.body;
  const checkExistingUser = await UserModel.findOne({
    email: email,
  });
  const correctPassword = await bcrypt.compare(
    password,
    checkExistingUser.password
  );
  if (correctPassword) {
    const ciphertext = jwt.sign(
      {
        id: checkExistingUser._id,
        email: checkExistingUser.email,
      },
      secret
    );
    res.json({
      token: ciphertext,
      data: {
        firstName: checkExistingUser.firstName,
        secondName: checkExistingUser.secondName,
        email: checkExistingUser.email,
        phoneNumber: checkExistingUser.phoneNumber,
      },
    });
  } else {
    res.json({
      message: "Invalid credentials",
    });
  }
});

module.exports = router;
