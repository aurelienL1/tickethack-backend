var express = require("express");
var router = express.Router();
require("../models/connexion");
const Trip = require("../models/trips");

/* GET home page. */
router.post("/", (req, res) => {
  const { departure, arrival, date } = req.body;
  Trip.find({
    departure: {$regex : new RegExp (departure, 'i')},
    arrival: {$regex : new RegExp (arrival, 'i')},
    //date: date,
  })
  .then((data) => {
    res.json({ trips : data });
  });
});

module.exports = router;
