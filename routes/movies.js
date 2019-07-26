const express = require('express');
const authorization = require('../middlewares/authorization');

const router = express.Router();

router
  .get('/', (req, res) => {
    res.json({ message: 'Movies' });
  })
  .post('/', authorization, (req, res) => {
    res.json({ message: 'Movies' });
  });

module.exports = router;
