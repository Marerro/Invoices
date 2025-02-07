const {validationResult} = require('express-validator');
const AppError = require('../utilities/appError');

const validate = (req, res, next) => {
    try {
        const errors = validationResult(req)

        const errorString = errors
        .array()
        .map(err => err.msg)
        .join(', ')

        if(!errors.isEmpty()) {
            throw new AppError(errorString, 400);
        }
        next()
    } catch (error) {
        next(error);
    }
}

module.exports = validate;