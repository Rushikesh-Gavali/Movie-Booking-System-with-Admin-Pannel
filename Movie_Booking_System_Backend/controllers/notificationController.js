const User = require('../models/User');
const Booking = require('../models/Booking');
const sendEmail = require('../utils/sendEmail');

exports.sendBookingConfirmation = async (req, res) => {
    const { userId, bookingId } = req.body;
    try {
        const user = await User.findById(userId);
        const booking = await Booking.findById(bookingId).populate('movie screen');

        if (!user || !booking) {
            return res.status(404).json({ msg: 'User or Booking not found' });
        }

        await sendEmail(user.email, booking);
        res.status(200).json({ msg: 'Confirmation sent' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
