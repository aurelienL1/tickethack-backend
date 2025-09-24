var express = require("express");
var router = express.Router();
const Booking = require("../models/bookings");

/* GET all bookings */
router.get("/", async function (req, res) {
  try {
    const bookings = await Booking.find();
    res.json({ result: true, bookings });
  } catch (error) {
    return res.json({
      result: false,
      error: "Something wrong happened while getting bookings.",
    });
  }
});

module.exports = router;
