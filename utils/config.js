// конфигурация параметров приложения
const { NODE_ENV, JWT_SECRET } = process.env;

// mongoDB
module.exports.mongoURL = 'mongodb://localhost:27017/moviedb';
module.exports.mongoSettings = {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
  useUnifiedTopology: true,
};
// production
module.exports.secretKey = NODE_ENV === 'production' ? JWT_SECRET : 'testkey';

module.exports.ERROR_CODE = 500;
