const express = require('express');
const { bookTickets } = require('../controllers/bookingController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', protect, bookTickets);

module.exports = router;
