const router = require('express').Router();
const routerUser = require('./users');
const routerMovie = require('./movies');
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');
const { validateSignIn, validateSignUp } = require('../middlewares/validations');
const { notFoundError } = require('../middlewares/errors');

router.post(
  '/signin',
  validateSignIn,
  login,
);

router.post(
  '/signup',
  validateSignUp,
  createUser,
);

router.use(auth);
router.use('/users', routerUser);
router.use('/movies', routerMovie);

// обработка неизвестного роута
router.use('*', notFoundError);

module.exports = router;
