var express = require("express");
var router = express.Router();
const Trip = require("../models/trips");
const { checkBody } = require("../modules/checkBody");
const Cart = require("../models/carts");

/* POST user search. */
router.post("/search", (req, res) => {
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

/* POST ADD TO CART. */

router.post("/addtocart", (req, res) => {
  const { trip } = req.body;
  try {
    if (checkBody(req.body, ["trip"])) {
      Cart.find({}).then((data) => {
        const tripsCart = data[0].trips;
        tripsCart.push(trip);
        Cart.updateOne({ _id: data[0]._id }, { trips: tripsCart }).then(
          (data) => {
            res.json({ result: true, message: "Add to cart OK" });
          }
        );
      });
    } else {
      res.json({ result: false, error: "Missing or empty fields" });
    }
  } catch (error) {
    return res.json({
      result: false,
      error: "Something wrong happened while getting trips.",
    });
  }
});

module.exports = router;
