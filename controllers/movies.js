const Movie = require('../models/movie');

const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');

const {
  BadRequestMessage,
  NotFoundFilmMessage,
  ForbiddenMessage,
  FilmDeleteMessage,
} = require('../utils/const');

module.exports.getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .populate(['owner'])
    .then((movies) => {
      res.status(200).send(movies);
    })
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  Movie.create({ ...req.body, owner: req.user._id })
    .then((movie) => {
      res.status(200).send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(BadRequestMessage));
        return;
      }
      next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const ownerId = req.user._id;
  const { movieId } = req.params;
  Movie.findById(movieId)
    .orFail(() => {
      throw new NotFoundError(NotFoundFilmMessage);
    })
    .then((movie) => {
      if (movie.owner.toString() !== ownerId) {
        throw new ForbiddenError(ForbiddenMessage);
      }
      Movie.findByIdAndDelete(movieId)
        .then(() => {
          res.status(200).send({ message: FilmDeleteMessage });
        })
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(BadRequestMessage));
        return;
      }
      next(err);
    });
};
