const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/movies-avantio', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

module.exports = mongoose;
