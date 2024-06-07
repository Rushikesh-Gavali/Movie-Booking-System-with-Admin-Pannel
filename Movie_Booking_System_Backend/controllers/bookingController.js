const Booking = require('../models/Booking');
const Movie = require('../models/Movie');
const Screen = require('../models/Screen');
const { lockSeats, releaseSeats } = require('../utils/seatManager');
const sendEmail = require('../utils/sendEmail');

exports.bookTickets = async (req, res, next) => {
    const { movieId, screenId, seats, totalPrice } = req.body;
    const userId = req.user._id;

    try {
        const movie = await Movie.findById(movieId);
        const screen = await Screen.findById(screenId);

        if (!movie || !screen) {
            return res.status(404).json({ success: false, message: 'Movie or Screen not found' });
        }

        const locked = await lockSeats(screenId, seats);
        if (!locked) {
            return res.status(400).json({ success: false, message: 'Some seats are already booked' });
        }

        const booking = new Booking({
            user: userId,
            movie: movieId,
            screen: screenId,
            seats,
            totalPrice,
        });

        await booking.save();
        await sendEmail(req.user.email, booking);

        const populatedBooking = await Booking.findById(booking._id).populate('screen');

        res.status(200).json({ success: true, data: populatedBooking });
    } catch (err) {
        next(err);
    }
};
