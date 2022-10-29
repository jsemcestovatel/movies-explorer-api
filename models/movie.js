const mongoose = require('mongoose');
const validator = require('validator');

const { NotValidURL } = require('../utils/const');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Обязательное поле'],
  },
  director: {
    type: String,
    required: [true, 'Обязательное поле'],
  },
  duration: {
    type: Number,
    required: [true, 'обязательное поле'],
  },
  year: {
    type: String,
    required: [true, 'обязательное поле'],
  },
  description: {
    type: String,
    required: [true, 'обязательное поле'],
  },
  image: {
    type: String,
    required: [true, 'обязательное поле'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: NotValidURL,
    },
  },
  trailerLink: {
    type: String,
    required: [true, 'обязательное поле'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: NotValidURL,
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'обязательное поле'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: NotValidURL,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'обязательное поле'],
  },
  movieId: {
    type: Number,
    required: [true, 'обязательное поле'],
  },
  nameRU: {
    type: String,
    required: [true, 'обязательное поле'],
  },
  nameEN: {
    type: String,
    required: [true, 'обязательное поле'],
  },
});

module.exports = mongoose.model('movie', movieSchema);
