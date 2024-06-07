const mongoose = require('mongoose');

const ScreenSchema = new mongoose.Schema({
    name: { type: String, required: true },
    capacity: { type: Number, required: true },
    seats: { type: Map, of: Boolean, required: true },
    movies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
});

module.exports = mongoose.model('Screen', ScreenSchema);
