const Artist = require('../models/artist.model');

exports.findAllArtists = (req, res) => {
  Artist.find()
    .then(artists => {
      res.json(artists);
    })
    .catch(err => {
      res.status(500).json({ message: err.message || 'Some error occurred while retrieving artists.' });
    });
};