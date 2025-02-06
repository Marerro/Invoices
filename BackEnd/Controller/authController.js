const {userRegister} = require('../Model/authModel');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

class authController {

    signToken = (id) => {
        const token = jwt.sign({id}, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });
        return token;
    }

    sendCookie = (token, res) => {
        const cookieOptions = {
            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
            httpOnly: true // for security
        }

        res.cookie('jwt', token, cookieOptions) // send cookie
    }

    signUp = async (req, res, next) => {
        try {
            const userDetails = req.body;

            const hashedPassword = await argon2.hash(userDetails.password);

            userDetails.password = hashedPassword

            const user = await userRegister(userDetails);

            // after signup instant login

            const token = this.signToken(user.id);

            this.sendCookie(token, res);

            userDetails.password = undefined;

            res.status(200).json({
                status: "success",
                user: userDetails,
            })

        } catch (error) {
            next(error);
        }
    }
}

module.exports = new authController();