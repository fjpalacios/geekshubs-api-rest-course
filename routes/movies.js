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
  .get('/', async (req, res) => {
    try {
      const movies = await MovieModel.find().sort({ _id: -1 });
      if (movies.length === 0) {
        return res.status(404).send({ message: 'No movies found' });
      }
      return res.status(200).send({ movies });
    } catch (error) {
      return res.status(404).json({ error });
    }
  })
  .get('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const movie = await MovieModel.findById(id);
      if (movie.length === 0) {
        return res.status(404).send({ message: 'No movie found' });
      }
      return res.status(200).send(movie);
    } catch (error) {
      return res.status(404).json({ error });
    }
  })
  .put('/:id', authorization, async (req, res) => {
    try {
      const { id } = req.params;
      const newMovie = req.body;
      const movie = await MovieModel.findOneAndUpdate(id, newMovie);
      if (movie.isModified) {
        return res.status(200).send({ message: 'Movie successfully updated' });
      }
      return res.status(500).send({ message: 'Request error' });
    } catch (error) {
      return res.status(500).json({ error });
    }
  })
  .delete('/:id', authorization, async (req, res) => {
    try {
      const { id } = req.params;
      const movie = await MovieModel.findOneAndDelete(id);
      if (movie.isModified) {
        return res
          .status(200)
          .send({ message: 'Movie successfully deleted' });
      }
      return res.status(500).send({ message: 'Request error' });
    } catch (error) {
      return res.status(500).json({ error });
    }
  });

module.exports = router;
