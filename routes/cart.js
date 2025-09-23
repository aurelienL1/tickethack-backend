var express = require("express");
var router = express.Router();
const { checkBody } = require("../modules/checkBody");
const Booking = require("../models/bookings");
const Trip = require("../models/trips");

// GET /cart
router.get("/", async function (req, res) {
  try {
    const trips = await Trip.find();
    console.log(trips);
    res.json({ result: true });
  } catch (error) {
    return res.json({ result: false, error: "Something wrong happened while purchasing." });
  }
});

// POST /cart when user want to purchase trips
router.post("/", async function (req, res) {
  const { trips } = req.body;
  if (!checkBody(req.body, ["trips"])) {
    return res.status(500).json({ result: false, error: "Missing or empty fields" });
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
    return res.json({ result: false, error: "Something wrong happened while purchasing." });
  }
});

module.exports = router;
