const {postUser, getInvoicesCount, getAllInvoices, EditUser, deleteUser} = require('../Model/userModel');

class userController {
    async postUser(req, res, next) {
        try {

            
            const {name, price, status, date} = req.body

            const currentDate = date ? new Date(date) : new Date(); 
            const formattedDate = currentDate.toISOString().slice('T')[0];

            const userBody = {
                name,
                date: formattedDate,
                price,
                status: status || 'Draft',
            };
            

            const user = await postUser(userBody);
            
            console.log(user);
            

            res.status(200).json({
                status: "success",
                user: user
            })

        } catch (error) {
            next(error);
        }
    }

    async getInvoices(req, res, next) {
        try {
            const invoices = await getInvoicesCount()

            res.status(200).json({
                status: "success",
                allInvoices: invoices
            })
        } catch (error) {
            next(error)
        }
    }
    async getAllInvoices(req, res, next) {
        try {
            const invoices = await getAllInvoices();

            res.status(200).json({
                status: "success",
                data: invoices
            })
        } catch (error) {
            next(error)
        }
    }

    async EditUserInvoices(req, res, next) {
        try {

            const id = req.params.id; // Get the invoice ID from the URL
            const userInvoice = req.body
            
            const editedInvoice = await EditUser(userInvoice, id)

            res.status(200).json({
                status: "success",
                editedUser: editedInvoice

            })

        } catch (error) {
            next(error)
        }
    }

    async invoiceDelete(req, res, next) {
        try {
            const id = req.params.id;

            const deletedInvoice = await deleteUser(id)

            res.status(200).json({
                status: "success",
                deletedInvoice: deletedInvoice
            })
        } catch (error) {
            next(error)
        }
    }

}

module.exports = new userController();
