const User = require('../models/User');

exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.handleSuccess(users);
    } catch (err) {
        next(err);
    }
};

exports.getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.handleSuccess(user);
    } catch (err) {
        next(err);
    }
};
