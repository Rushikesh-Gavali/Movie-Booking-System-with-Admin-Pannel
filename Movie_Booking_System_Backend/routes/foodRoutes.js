const express = require('express');
const { getFoodItems, addFoodItem } = require('../controllers/foodController');
const { protect, isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', getFoodItems);
router.post('/add', protect, isAdmin, addFoodItem);

module.exports = router;
