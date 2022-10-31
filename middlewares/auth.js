require('dotenv').config();
const jwt = require('jsonwebtoken');
const NotAuthorizedError = require('../errors/not-authorized-err');
const { NotAuthorizedUserMessage } = require('../utils/const');

const { secretKey } = require('../utils/config');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new NotAuthorizedError(NotAuthorizedUserMessage);
  }
  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, secretKey);
  } catch (err) {
    next(new NotAuthorizedError(NotAuthorizedUserMessage));
    return;
  }
  req.user = payload;
  next();
};
