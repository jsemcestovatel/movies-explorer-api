const router = require('express').Router();
const { validateUser } = require('../middlewares/validations');
const { getUserMe, updateUser } = require('../controllers/users');

router.get('/me', getUserMe);

router.patch('/me', validateUser, updateUser);

module.exports = router;
