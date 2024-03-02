const Movie = require('../models/movie.model');

exports.findAllMovies = (req, res) => {
  Movie.find({ status: req.query.status })
    .then(movies => {
      res.json(movies);
    })
    .catch(err => {
      res.status(500).json({ message: err.message || 'Some error occurred while retrieving movies.' });
    });
};

exports.findOne = (req, res) => {
  Movie.findById(req.params.movieId)
    .then(movie => {
      if (!movie) {
        return res.status(404).json({ message: 'Movie not found with id ' + req.params.movieId });
      }
      res.json(movie);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ message: 'Movie not found with id ' + req.params.movieId });
      }
      return res.status(500).json({ message: 'Error retrieving movie with id ' + req.params.movieId });
    });
};

exports.findShows = (req, res) => {
  Movie.findById(req.params.movieId)
    .then(movie => {
      if (!movie) {
        return res.status(404).json({ message: 'Movie not found with id ' + req.params.movieId });
      }
      res.json(movie.shows);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ message: 'Movie not found with id ' + req.params.movieId });
      }
      return res.status(500).json({ message: 'Error retrieving shows of movie with id ' + req.params.movieId });
    });
};