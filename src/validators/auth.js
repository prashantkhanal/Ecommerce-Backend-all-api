const { check, validationResult } = require('express-validator');

exports.validateSignupRequest = [
    check('firstName').notEmpty().withMessage('firstName is required'),
    check('lastName').notEmpty().withMessage('lastName is required'),
    check('email').notEmpty().withMessage('email is required'),
    check('password')
        .isLength({ min: 8 })
        .withMessage('password must be at least 8 characters'),
];

exports.validateSigninRequest = [
    check('email').notEmpty().withMessage('Email Address is Required'),
];

exports.isRequestValidated = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.array().length > 0) {
        return res.status(400).json({ error: errors.array()[0].msg });
    }
    next();
};
