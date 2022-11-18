const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ConflictError = require('../errors/conflict-err');

const {
  ConflictMessage,
  NotFoundUserMessage,
  BadRequestMessage,
  NotAuthorizedMessage,
} = require('../utils/const');
const { secretKey } = require('../utils/config');
const NotAuthorizedError = require('../errors/not-authorized-err');

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, email, password: hash }))
    .then((user) => {
      res.status(200).send({
        name: user.name,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(ConflictMessage));
        return;
      }
      if (err.name === 'ValidationError') {
        next(new BadRequestError(BadRequestMessage));
        return;
      }
      next(err);
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError(NotFoundUserMessage);
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      // if (err.name === 'ValidationError' || err.name === 'CastError') {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(BadRequestMessage));
        return;
      }
      if (err.code === 11000) {
        next(new ConflictError(ConflictMessage));
        return;
      }
      next(err);
    });
};

module.exports.getUserMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(NotFoundUserMessage);
      }
      res.status(200).send(user);
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return (
    User.findUserByCredentials(email, password)
      .then((user) => {
        const token = jwt.sign({ _id: user._id }, secretKey, {
          expiresIn: '7d',
        });
        res.status(200).send({ token });
      })
      // .catch(next);
      .catch(() => {
        next(new NotAuthorizedError(NotAuthorizedMessage));
      })
  );
};
