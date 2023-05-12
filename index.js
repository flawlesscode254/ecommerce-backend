const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const mongoose = require("mongoose");

require("dotenv").config();

const Authentication = require("./routes/Authentication");
const Cart = require("./routes/Cart");
const Favories = require("./routes/Favorites");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(morgan("common"));
app.use(helmet());

app.use(express.json());

app.use("/auth", Authentication);
app.use("/cart", Cart);
app.use("/favorites", Favories);

const port = process.env.PORT;

const url = process.env.DB_URL;

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server now running on http://localhost:${port}`);
    });
  });

app.get("/", (req, res) => {
  res.json({
    message: "Entry point",
  });
});
