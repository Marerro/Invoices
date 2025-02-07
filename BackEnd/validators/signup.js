const { body } = require('express-validator');
const {getUserByEmail} = require('../Model/authModel');

const validateNewUser = [

    body().notEmpty().withMessage('User body must contain data'),

    body('name') 
    .notEmpty()
    .withMessage('Name is required')
    .trim(),
    
    body('email')
    .notEmpty()
    .withMessage('Email is required')
    .trim()
    .isEmail()
    .withMessage('Email is not valid')
    .normalizeEmail()
    .custom(async (value) => {
        const user = await getUserByEmail(value);
        if(user) {
            throw new Error('Email already exists');
        }
        return true
    }),

    body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({min: 6})
    .withMessage('Password must be at least 6 characters long')
]

module.exports = validateNewUser