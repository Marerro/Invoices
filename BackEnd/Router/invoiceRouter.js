const router = require('express');
const InvoicesController = require('../Controller/InvoicesController');

const invoicesRouter = router();

invoicesRouter.post('/', InvoicesController.postInvoice.bind(InvoicesController));
invoicesRouter.get('/', InvoicesController.getInvoices);
invoicesRouter.get('/all', InvoicesController.getAllInvoices);
invoicesRouter.delete('/delete/:id', InvoicesController.invoiceDelete);
invoicesRouter.patch('/update/:id', InvoicesController.EditUserInvoices);

module.exports = invoicesRouter