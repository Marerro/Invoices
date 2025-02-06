const router = require('express');
const authController = require('../Controller/authController');

const registerRouter = router();

registerRouter.post('/', authController.signUp);

module.exports = registerRouter;
