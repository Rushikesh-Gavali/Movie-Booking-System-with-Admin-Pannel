const nodemailer = require('nodemailer');

const sendEmail = async (email, booking) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Booking Confirmation',
            text: `Your booking is confirmed for the movie ${booking.movie.title} at ${booking.screen.name}. Seats: ${booking.seats.join(
                ', '
            )}. Total Price: ${booking.totalPrice}`,
        };

        await transporter.sendMail(mailOptions);
    } catch (err) {
        console.error(err.message);
    }
};

module.exports = sendEmail;
