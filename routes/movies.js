const express = require('express');
const authorization = require('../middlewares/authorization');
const MovieModel = require('../models/movie');

const router = express.Router();

router
  .post('/', authorization, async (req, res) => {
    try {
      const newMovie = req.body;
      const movie = new MovieModel(newMovie);
      await movie.save();
      res.json({ message: 'New movie saved', movie });
    } catch (error) {
      const message = error.message || error.errmsg;
      res.status(404).json({ message: `Error: ${message}` });
    }
  })
  .get('/', (req, res) => {
    const movies = MovieModel.find().sort({ _id: -1 });
    movies
      .then((result) => {
        if (result.length === 0) {
          return res.status(404).send({ message: 'No movies found' });
        }
        return res.status(200).send({ movies: result });
      })
      .catch((error) => {
        res.status(404).json({ error });
      });
  })
  .get('/:id', (req, res) => {
    const { id } = req.params;
    const movie = MovieModel.findById(id);
    movie
      .then((result) => {
        if (result.length === 0) {
          return res.status(404).send({ message: 'No movie found' });
        }
        return res.status(200).send(result);
      })
      .catch((error) => {
        res.status(404).json({ error });
      });
  })
  .put('/:id', authorization, (req, res) => {
    const { id } = req.params;
    const newMovie = req.body;
    const updatedMovie = MovieModel.findOneAndUpdate(id, newMovie);
    updatedMovie
      .then((movie) => {
        if (movie.isModified) {
          return res.status(200).send({
            message: 'Movie successfully updated',
            movie,
          });
        }
        return res.status(500).send({ message: 'Request error' });
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  })
  .delete('/:id', authorization, (req, res) => {
    const { id } = req.params;
    const deletedMovie = MovieModel.findOneAndDelete(id);
    deletedMovie
      .then((movie) => {
        if (movie.isModified) {
          return res.status(200).send({ message: 'Movie successfully deleted' });
        }
        return res.status(500).send({ message: 'Request error' });
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  });

module.exports = router;
