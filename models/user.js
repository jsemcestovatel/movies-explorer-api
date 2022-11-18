const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const { NotValidEmail, NotAuthorizedMessage } = require('../utils/const');
const { NotAuthorizedError } = require('../errors/not-authorized-err');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'От 2 до 30 символов'],
    maxlength: [30, 'От 2 до 30 символов'],
    required: [true, 'Обязательное поле'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Обязательное поле'],
    validate: {
      validator: (v) => validator.isEmail(v),
      message: NotValidEmail,
    },
  },
  password: {
    type: String,
    required: [true, 'Обязательное поле'],
    select: false,
  },
});
userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password,
) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new NotAuthorizedError(NotAuthorizedMessage));
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new NotAuthorizedError(NotAuthorizedMessage));
        }
        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
