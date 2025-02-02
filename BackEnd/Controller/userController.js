const {postUser, getInvoicesCount, getAllInvoices} = require('../Model/userModel');

class userController {
    async postUser(req, res, next) {
        try {
            
            const {name, price, status} = req.body

            const user = await postUser(req.body);

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

}


module.exports = new userController();
