const Movie = require('../models/Movie');
const Screen = require('../models/Screen');

exports.getMovies = async (req, res, next) => {
    try {
        const movies = await Movie.find().populate('screens');
        res.handleSuccess(movies);
    } catch (err) {
        next(err);
    }
};

exports.addMovie = async (req, res, next) => {
    const { title, genre, showtimes, screens } = req.body;

    try {
        const newMovie = new Movie({
            title,
            genre,
            showtimes,
            screens,
        });

        await newMovie.save();

        if (screens && screens.length > 0) {
            await Screen.updateMany(
                { _id: { $in: screens } },
                { $addToSet: { movies: newMovie._id } }
            );
        }

        res.handleSuccess(newMovie);
    } catch (err) {
        next(err);
    }
};

exports.getMovieById = async (req, res, next) => {
    try {
        const movie = await Movie.findById(req.params.id).populate('screens');

        if (!movie) {
            return res.status(404).json({ success: false, message: 'Movie not found' });
        }

        res.handleSuccess(movie);
    } catch (err) {
        next(err);
    }
};
