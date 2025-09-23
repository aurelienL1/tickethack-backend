const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
  purchaseDate: Date,
  trips: [{ type: mongoose.Schema.Types.ObjectId, ref: "trips" }],
});

const Booking = mongoose.model("bookings", bookingSchema);
module.exports = Booking;
