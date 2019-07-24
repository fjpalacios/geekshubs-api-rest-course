const express = require('express');
const router = express.Router();

const authorization = require('../middlewares/authorization');

router
  .get('/', (req, res) => {
    res.json({message: 'Movies'})
  })
  .post('/', authorization, (req, res) => {
    res.json({message: 'Movies'})
  });

module.exports = router;
