const responseHandler = (req, res, next) => {
    res.handleSuccess = (data) => {
        res.status(200).json({ success: true, data });
    };

    res.handleError = (error) => {
        const statusCode = error.statusCode || 500;
        const message = error.message || 'Server Error';
        res.status(statusCode).json({ success: false, message });
    };

    next();
};

module.exports = responseHandler;
