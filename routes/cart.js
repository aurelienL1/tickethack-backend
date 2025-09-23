var express = require("express");
var router = express.Router();
const { checkBody } = require("../modules/checkBody");
const Booking = require("../models/bookings");
const Cart = require("../models/carts");

// GET /cart
router.get("/", async function (req, res) {
  try {
    const trips = await Cart.find();
    console.log(trips);
    res.json({ result: true });
  } catch (error) {
    return res.json({
      result: false,
      error: "Something wrong happened while purchasing.",
    });
  }
});

// POST /cart when user want to purchase trips
router.post("/purchase", async function (req, res) {
  const { trips } = req.body;
  if (!checkBody(req.body, ["trips"])) {
    return res
      .status(500)
      .json({ result: false, error: "Missing or empty fields" });
  }

  try {
    const tripsId = trips.map((trip) => trip._id);
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
  const { trip } = req.body;
  if (!checkBody(req.body, ["trip"])) {
    return res
      .status(500)
      .json({ result: false, error: "Missing or empty fields" });
  }

  try {
    const carts = await Cart.find();
    const cart = carts[0];
    const filterCart = cart.trips.filter((item) => item._id !== trip._id);
    await Cart.updateOne({ _id: cart._id }, { trips: filterCart });

    res.json({ result: true, message: "Delete cart OK" });
  } catch (error) {
    return res.json({
      result: false,
      error: "Something wrong happened while deleting.",
    });
  }
});

module.exports = router;
