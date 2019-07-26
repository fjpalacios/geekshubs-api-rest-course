const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const usersRouter = require('./routes/users');
const moviesRouter = require('./routes/movies');

const app = express();

require('dotenv').config();

require('./config/mongoose');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/auth', usersRouter);
app.use('/movies', moviesRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'endpoint not found' });
});

module.exports = app;
