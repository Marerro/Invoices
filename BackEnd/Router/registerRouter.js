const router = require('express');
const authController = require('../Controller/authController');
const validateNewUser = require('../validators/signup');
const validate = require('../validators/validate');
const registerRouter = router();

registerRouter.post('/', validateNewUser,validate,  authController.signUp);

module.exports = registerRouter;
