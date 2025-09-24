var express = require("express");
var router = express.Router();
const Booking = require("../models/bookings");

/* GET all bookings */
router.get("/", async function (req, res) {
  try {
    const booking = await Booking.findOne().populate("trips");
    res.json({ result: true, booking });
  } catch (error) {
    return res.json({
      result: false,
      error: "Something wrong happened while getting bookings.",
    });
  }
});

module.exports = router;
