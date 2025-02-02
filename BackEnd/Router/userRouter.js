const router = require('express');
const userController = require('../Controller/userController');

const userRouter = router();

userRouter.post('/', userController.postUser);
userRouter.get('/', userController.getInvoices);
userRouter.get('/all', userController.getAllInvoices);

module.exports = userRouter