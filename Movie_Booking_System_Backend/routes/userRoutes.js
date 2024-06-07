const express = require('express');
const { getUsers, getUserById } = require('../controllers/userController');
const { protect, isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', protect, isAdmin, getUsers);
router.get('/:id', protect, isAdmin, getUserById);

module.exports = router;
