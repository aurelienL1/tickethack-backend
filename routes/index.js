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
router.post("/addtocart", async function (req, res) {
  const { trip } = req.body;
  try {
    if (checkBody(req.body, ["trip"])) {
      const carts = await Cart.find();
      //Cas ou on a pas de panier
      if (carts.length === 0) {
        const newCart = new Cart({
          trips: [trip],
        });
        await newCart.save();
        res.json({ result: true, message: "Create new cart OK" });
      } else {
        const { trips, _id } = carts[0];
        trips.push(trip);
        await Cart.updateOne({ _id }, { trips });
        res.json({ result: true, message: "Add to cart OK" });
      }
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
