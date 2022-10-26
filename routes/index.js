const router = require('express').Router();
const routerUser = require('./users');
const routerMovie = require('./movies');
// const auth = require('../middlewares/auth');
// const NotFoundError = require('../errors/not-found-err');
// const { login, createUser } = require('../controllers/users');
const { validateSignIn, validateSignUp } = require('../middlewares/validations');

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

// router.use(auth);
router.use('/users', routerUser);
router.use('/movies', routerMovie);

router.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
