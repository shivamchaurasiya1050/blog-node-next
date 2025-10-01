const { body } = require("express-validator")

exports.registerValidations = [
    body('firstName')
        .notEmpty().withMessage("First name is required!")
        .isLength({ min: 2 }).withMessage("First name must be atleast 2 characters!"),
    body("lastName")
        .notEmpty().withMessage('Last name is requires!')
        .isLength({ min: 2 }).withMessage('Last name must be atleast 2 characters!'),
    body('email')
        .notEmpty().withMessage('Email is required!')
        .isEmail().withMessage("Must be a valid email"),
    body('password')
        .notEmpty().withMessage("Password is required!")
        .isLength({ min: 8 }).withMessage('Password must be atleast 8 characters!')
        .matches(/^[A-Z]/).withMessage("Password first character must be upper case!")
]


exports.loginValidations = [
    body('email')
        .notEmpty().withMessage("Please inter email"),
    body('password')
        .notEmpty().withMessage("Please enter password")
]

exports.updateProfileValidations = [
    body('firstName').optional().isLength({ min: 2 }).withMessage('First name must be alteast 2 charaters!'),
    body('lastName').optional().isLength({ min: 2 }).withMessage('Last name must be alteast 2 charaters!'),
    body('email').optional().isEmail().withMessage("Must be a valid email!"),
    body('password').optional().isLength({ min: 8 }).withMessage("Password must be atleast 8 characters").matches(/^[A-Z]/)
        .withMessage('Password first character must be upper case!'),
]

// module.exports = { registerValidations }