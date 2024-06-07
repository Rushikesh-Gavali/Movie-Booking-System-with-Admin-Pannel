const express = require('express');
const { getBookings, updateScreen, updateMovie } = require('../controllers/adminController');
const { protect, isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/bookings', protect, isAdmin, getBookings);
router.put('/screen', protect, isAdmin, updateScreen);
router.put('/movie', protect, isAdmin, updateMovie);

module.exports = router;
