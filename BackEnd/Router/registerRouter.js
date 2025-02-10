const router = require('express');
const authController = require('../Controller/authController');
const validateNewUser = require('../validators/signup');
const validate = require('../validators/validate');
const validateLogin = require('../validators/login')
const registerRouter = router();

registerRouter.post('/', validateNewUser,validate,  authController.signUp);
registerRouter.post('/login',validateLogin, validate, authController.login);
registerRouter.get('/logout',authController.protect, authController.logout);    
registerRouter.get('/me', authController.protect, authController.getAuthenticatedUser);

module.exports = registerRouter;
