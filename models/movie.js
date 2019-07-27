const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  year: {
    type: Number,
    required: true,
  },
  runtime: Number,
  countries: [String],
  genres: [String],
  director: String,
  writers: [String],
  actors: [String],
  plot: String,
  poster: String,
});

const Movie = mongoose.model('Movies', MovieSchema);

module.exports = Movie;
