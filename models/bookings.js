const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
    
});

const Booking = mongoose.model("bookings", bookingSchema);
module.exports = Booking;
