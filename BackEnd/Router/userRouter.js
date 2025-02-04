const router = require('express');
const userController = require('../Controller/userController');

const userRouter = router();

userRouter.post('/', userController.postUser);
userRouter.get('/', userController.getInvoices);
userRouter.get('/all', userController.getAllInvoices);
userRouter.delete('/delete/:id', userController.invoiceDelete);
userRouter.patch('/update/:id', userController.EditUserInvoices);

module.exports = userRouter