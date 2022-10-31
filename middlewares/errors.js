const NotFoundError = require('../errors/not-found-err');
const { NotFoundMessage, DefaultMessage } = require('../utils/const');

const { ERROR_CODE } = require('../utils/config');

module.exports.handlerErrors = (err, req, res, next) => {
  const { statusCode = ERROR_CODE, message } = err;
  res.status(statusCode).send({
    // проверяем статус и выставляем сообщение в зависимости от него
    message: statusCode === 500 ? DefaultMessage : message,
  });
  next();
};

module.exports.notFoundError = (req, res, next) => {
  next(new NotFoundError(NotFoundMessage));
};
