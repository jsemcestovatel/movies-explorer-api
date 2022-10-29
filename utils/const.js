// тексты ошибок
// 500
module.exports.DefaultMessage = 'Ошибка по умолчанию';

// 404
module.exports.NotFoundMessage = 'Страница не найдена';
module.exports.NotFoundUserMessage = 'Пользователь не найден';
module.exports.NotFoundFilmMessage = 'Фильм не найден';

// 409
module.exports.ConflictMessage = 'Пользователь с таким e-mail уже существует';

// 401
module.exports.NotAuthorizedMessage = 'Неверно введён пароль или почта';
module.exports.NotAuthorizedUserMessage = 'Необходима авторизация';

// 400
module.exports.BadRequestMessage = 'Переданы некорректные данные';

// 403
module.exports.ForbiddenMessage = 'Нет прав на удаление';

// регулярные вырадения для модуля валидации
module.exports.regularUrl = /(https?:\/\/)([www.]?[a-zA-Z0-9-]+\.)([^\s]{2,})/;
module.exports.regularEng = /^[a-z0-9\-\s]+$/i;
module.exports.regularRus = /^[а-яё\-\s]+$/i;

// технические сообщения
module.exports.FilmDeleteMessage = 'Удалено';
