const Genre = require('../models/genre.model');

exports.findAllGenres = async (req, res) => {
  try {
    const genres = await Genre.find({}, {}, { timeout: 30000 });
    res.json(genres);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Genre not found with id ' + req.params.genreId });
    }
    return res.status(500).json({ message: 'Error retrieving genres.' });
  }
};

exports.findOneGenre = (req, res) => {
  Genre.findById(req.params.genreId)
    .then(genre => {
      if (!genre) return res.status(404).json({ message: 'Genre not found with id ' + req.params.genreId });
      res.json(genre);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ message: 'Genre not found with id ' + req.params.genreId });
      }
      return res.status(500).json({ message: 'Error retrieving genre with id ' + req.params.genreId });
    });
};

exports.createGenre = (req, res) => {
  const genre = new Genre({
    genreid: req.body.genreid,
    genre: req.body.genre
  });

  genre.save((err) => {
    if (err) return res.status(500).json({ message: err.message || 'Some error occurred while creating genre.' });
    res.json({ message: 'Genre created successfully.' });
  });
};

exports.updateGenre = (req, res) => {
  Genre.findByIdAndUpdate(req.params.genreId, req.body, { new: true }, (err, genre) => {
    if (err) return res.status(500).json({ message: err.message || 'Some error occurred while updating genre.' });
    if (!genre) return res.status(404).json({ message: 'Genre not found with id ' + req.params.genreId });
    res.json({ message: 'Genre updated successfully.' });
  });
};

exports.deleteGenre = (req, res) => {
  Genre.findByIdAndRemove(req.params.genreId, (err) => {
    if (err) return res.status(500).json({ message: err.message || 'Some error occurred while deleting genre.' });
    res.json({ message: 'Genre deleted successfully.' });
  });
};