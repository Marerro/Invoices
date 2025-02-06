const {userRegister} = require('../Model/authModel');
const argon2 = require('argon2');

class authController {
    async signUp (req, res, next) {
        try {
            const userDetails = req.body;

            const hashedPassword = await argon2.hash(userDetails.password);

            userDetails.password = hashedPassword

            const user = await userRegister(userDetails);

            userDetails.password = undefined;

            res.status(200).json({
                status: "success",
                user: userDetails
            })

        } catch (error) {
            next(error);
        }
    }
}

module.exports = new authController();