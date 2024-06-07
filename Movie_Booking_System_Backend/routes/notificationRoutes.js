const express = require('express');
const { sendBookingConfirmation } = require('../controllers/notificationController');
const router = express.Router();

router.post('/send-confirmation', sendBookingConfirmation);

module.exports = router;
