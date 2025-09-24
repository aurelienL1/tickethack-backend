var express = require("express");
var router = express.Router();
const { checkBody } = require("../modules/checkBody");
const Booking = require("../models/bookings");
const Cart = require("../models/carts");

// GET cart
router.get("/", async function (req, res) {
  try {
    const cart = await Cart.findOne();
    res.json({ result: true, cart });
  } catch (error) {
    return res.json({
      result: false,
      error: "Something wrong happened while purchasing.",
    });
  }
});

// POST /purchase when user want to purchase trips
router.post("/purchase", async function (req, res) {
  const { cart } = req.body;
  if (!checkBody(req.body, ["cart"])) {
    return res.json({ result: false, error: "Missing or empty fields" });
  }

  try {
    const tripsId = cart.trips.map((trip) => trip._id);
    const newBooking = new Booking({
      purchaseDate: Date.now(),
      trips: tripsId,
    });

    await newBooking.save();
    res.json({ result: true, message: "Purchase successfully done." });
  } catch (error) {
    return res.json({
      result: false,
      error: "Something wrong happened while purchasing.",
    });
  }
});

// DELETE cart ONE TRIP
router.delete("/", async function (req, res) {
  const { tripId } = req.body;
  if (!checkBody(req.body, ["tripId"])) {
    return res.json({ result: false, error: "Missing or empty fields" });
  }

  try {
    const cart = await Cart.findOne();
    const { _id, trips } = cart;
    const filteredCart = trips.filter((item) => item._id.toString() !== tripId.toString());
    await Cart.updateOne({ _id: _id }, { trips: filteredCart });

    res.json({ result: true, message: "Delete trip from cart OK" });
  } catch (error) {
    return res.json({
      result: false,
      error: "Something wrong happened while deleting.",
    });
  }
});

module.exports = router;
