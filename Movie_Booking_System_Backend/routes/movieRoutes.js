const express = require('express');
const { getMovies, addMovie, getMovieById } = require('../controllers/movieController');
const { protect, isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', getMovies);
router.post('/add', protect, isAdmin, addMovie);
router.get('/:id', getMovieById);

module.exports = router;
