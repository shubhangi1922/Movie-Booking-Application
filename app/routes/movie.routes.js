const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movie.controller');

router.get('/', movieController.findAllMovies);
router.get('/:movieId', movieController.findOne);
router.get('/shows/:movieId', movieController.findShows);
router.get('/status/:status', movieController.findAllMovies);
router.get('/genre/:genre', movieController.findAllMovies);
router.get('/artist/:artist', movieController.findAllMovies);
router.get('/date/:startdate/:enddate', movieController.findAllMovies);

module.exports = router;