const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    genre: { type: String, required: true },
    showtimes: { type: [Date], required: true },
    screens: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Screen' }], // Reference to Screen model
});

module.exports = mongoose.model('Movie', MovieSchema);
