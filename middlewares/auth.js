require('dotenv').config();
const jwt = require('jsonwebtoken');
const NotAuthorizedError = require('../errors/not-authorized-err');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new NotAuthorizedError('Необходима авторизация');
  }
  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'testkey',
    );
  } catch (err) {
    next(new NotAuthorizedError('Необходима авторизация'));
  }
  req.user = payload;
  next();
};
