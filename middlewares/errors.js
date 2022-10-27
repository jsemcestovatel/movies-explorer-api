const ERROR_CODE = 500;
const NotFoundError = require('../errors/not-found-err');

module.exports.handlerErrors = (err, req, res, next) => {
  const { statusCode = ERROR_CODE, message } = err;
  res.status(statusCode).send({
    // проверяем статус и выставляем сообщение в зависимости от него
    message: statusCode === 500 ? 'Ошибка по умолчанию' : message,
  });
  next();
};

module.exports.notFoundError = (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
};
