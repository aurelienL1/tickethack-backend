const mongoose = require("mongoose");
const { tripSchema } = require("./trips");

const cartSchema = mongoose.Schema({
  trips: [tripSchema],
});

const Cart = mongoose.model("carts", cartSchema);
module.exports = Cart;
