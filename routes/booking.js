var express = require("express");
var router = express.Router();
const Booking = require("../models/bookings");

/* GET all bookings */
router.get("/", (req, res) => {
  try {
    Booking.find({}).then((data) => {
      res.json({ bookings: data });
    });
  } catch (error) {
    return res.json({
      result: false,
      error: "Something wrong happened while getting bookings.",
    });
  }
});

module.exports = router;
