var express = require("express");
var router = express.Router();
const Trip = require("../models/trips");
const { checkBody } = require("../modules/checkBody");

/* GET home page. */
router.post("/", (req, res) => {
  const { departure, arrival, date } = req.body;
  try {
    if (checkBody(req.body, ["departure", "arrival", "date"])) {
      Trip.find({
        departure: { $regex: new RegExp(departure, "i") },
        arrival: { $regex: new RegExp(arrival, "i") },
        date: date,
      }).then((data) => {
        res.json({ trips: data, result: true });
      });
    } else res.json({ result: false, error: "Missing or empty fields" });
  } catch (error) {
    return res.json({
      result: false,
      error: "Something wrong happened while getting trips.",
    });
  }
});

module.exports = router;
