const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
    screen: { type: mongoose.Schema.Types.ObjectId, ref: 'Screen', required: true },
    seats: { type: [String], required: true },
    totalPrice: { type: Number, required: true },
    bookingTime: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Booking', BookingSchema);
