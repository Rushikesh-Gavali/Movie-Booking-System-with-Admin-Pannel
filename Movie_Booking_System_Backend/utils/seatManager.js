const Screen = require('../models/Screen');

exports.lockSeats = async (screenId, seats) => {
    const screen = await Screen.findById(screenId);

    for (let seat of seats) {
        if (screen.seats.get(seat)) {
            return false; // Seat is already booked
        }
    }

    for (let seat of seats) {
        screen.seats.set(seat, true);
    }

    await screen.save();
    return true;
};

exports.releaseSeats = async (screenId, seats) => {
    const screen = await Screen.findById(screenId);

    for (let seat of seats) {
        screen.seats.set(seat, false);
    }

    await screen.save();
};
