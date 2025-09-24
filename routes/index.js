var express = require("express");
var router = express.Router();
const Trip = require("../models/trips");
const { checkBody } = require("../modules/checkBody");
const Cart = require("../models/carts");

/* POST get trips for search */
router.post("/search", async function (req, res) {
  const { departure, arrival, date } = req.body;

  if (!checkBody(req.body, ["departure", "arrival", "date"])) {
    return res.json({ result: false, error: "Missing or empty fields" });
  }

  try {
    const trips = await Trip.find({
      departure: { $regex: new RegExp(departure, "i") },
      arrival: { $regex: new RegExp(arrival, "i") },
      date: date,
    });
    res.json({ result: true, trips });
  } catch (error) {
    res.json({
      result: false,
      error: "Something wrong happened while getting trips.",
    });
  }
});

/* POST ADD TO CART. */
router.post("/addtocart", async function (req, res) {
  const { trip } = req.body;
  if (!checkBody(req.body, ["trip"])) {
    return res.json({ result: false, error: "Missing or empty fields" });
  }

  try {
    const cart = await Cart.findOne();
    //Cas ou on a pas de panier
    if (cart === null) {
      const newCart = new Cart({
        trips: [trip],
      });
      await newCart.save();
      res.json({ result: true, message: "Create new cart OK" });
    } else {
      const { trips, _id } = cart;
      trips.push(trip);
      await Cart.updateOne({ _id }, { trips });
      res.json({ result: true, message: "Add to cart OK" });
    }
  } catch (error) {
    return res.json({
      result: false,
      error: "Something wrong happened while getting trips.",
    });
  }
});

module.exports = router;
