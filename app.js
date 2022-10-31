// собрали абсолютный путь к файлу .env
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
// const cors = require('cors');

const routes = require('./routes');
const { handlerErrors } = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { rateLimiter } = require('./middlewares/ratelimiter');
const { mongoURL, mongoSettings } = require('./utils/config');
// const { cors } = require('./middlewares/cors');

const app = express();

// app.use(cors);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
// подключаем логгер запросов
app.use(requestLogger);

// подключаем лимитер запросов
app.use(rateLimiter);

// подключаемся к серверу mongo
mongoose.connect(mongoURL, mongoSettings);

// маршрутизация
app.use(routes);

// подключаем логгер ошибок
app.use(errorLogger);

// обработчик ошибок celebrate
app.use(errors());

// централизованный обработчик ошибок
app.use(handlerErrors);

module.exports = app;
