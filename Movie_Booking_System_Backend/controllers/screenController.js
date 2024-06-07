const Screen = require('../models/Screen');
const Movie = require('../models/Movie');

exports.getScreens = async (req, res, next) => {
    try {
        const screens = await Screen.find().populate('movies');
        res.handleSuccess(screens);
    } catch (err) {
        next(err);
    }
};

exports.addScreen = async (req, res, next) => {
    const { name, capacity, seats, movies } = req.body;

    try {
        const newScreen = new Screen({
            name,
            capacity,
            seats,
            movies,
        });

        await newScreen.save();

        if (movies && movies.length > 0) {
            await Movie.updateMany(
                { _id: { $in: movies } },
                { $addToSet: { screens: newScreen._id } }
            );
        }

        res.handleSuccess(newScreen);
    } catch (err) {
        next(err);
    }
};

exports.getScreenById = async (req, res, next) => {
    try {
        const screen = await Screen.findById(req.params.id).populate('movies');

        if (!screen) {
            return res.status(404).json({ success: false, message: 'Screen not found' });
        }

        res.handleSuccess(screen);
    } catch (err) {
        next(err);
    }
};
