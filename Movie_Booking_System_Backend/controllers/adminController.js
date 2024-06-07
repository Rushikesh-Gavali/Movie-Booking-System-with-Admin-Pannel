const { check, validationResult } = require('express-validator');
const Screen = require('../models/Screen');
const Booking = require('../models/Booking');
const Movie = require('../models/Movie');

const screenValidationRules = [
    check('screenId', 'Screen ID is required').notEmpty(),
    check('screenId', 'Invalid Screen ID').isMongoId(),
    check('name', 'Name is required').notEmpty(),
    check('capacity', 'Capacity must be a number').isNumeric(),
    check('seats', 'Seats must be an array').isArray(),
];

const movieValidationRules = [
    check('movieId', 'Movie ID is required').notEmpty(),
    check('movieId', 'Invalid Movie ID').isMongoId(),
    check('title', 'Title is required').notEmpty(),
    check('genre', 'Genre is required').notEmpty(),
    check('showtimes', 'Showtimes must be an array').isArray(),
];

exports.getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().populate('user movie screen');
        res.json(bookings);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.updateScreen = [
    ...screenValidationRules,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { screenId, name, capacity, seats } = req.body;
        try {
            let screen = await Screen.findById(screenId);
            if (!screen) {
                return res.status(404).json({ msg: 'Screen not found' });
            }

            screen.name = name;
            screen.capacity = capacity;
            screen.seats = seats;
            await screen.save();
            res.json(screen);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
];

exports.updateMovie = [
    ...movieValidationRules,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { movieId, title, genre, showtimes } = req.body;
        try {
            let movie = await Movie.findById(movieId);
            if (!movie) {
                return res.status(404).json({ msg: 'Movie not found' });
            }

            movie.title = title;
            movie.genre = genre;
            movie.showtimes = showtimes;
            await movie.save();
            res.json(movie);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
];
