const mongoose = require('mongoose');

const GenreSchema = new mongoose.Schema({
  genreid: Number,
  genre: String
});

module.exports = mongoose.model('Genre', GenreSchema);