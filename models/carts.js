const mongoose = require("mongoose");

const tripSchema = mongoose.Schema({
  departure: String,
  arrival: String,
  date: Date,
  price: Number,
});

const cartSchema = mongoose.Schema({
  trips: [tripSchema],
});

const Cart = mongoose.model("carts", cartSchema);
module.exports = Cart;
