const express = require('express');
const { getScreens, addScreen, getScreenById } = require('../controllers/screenController');
const { protect, isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', getScreens);
router.post('/add',protect,isAdmin, addScreen);
router.get('/:id', getScreenById);

module.exports = router;
