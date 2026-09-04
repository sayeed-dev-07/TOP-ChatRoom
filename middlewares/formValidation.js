const { body } = require('express-validator');
const { isUnique } = require('../db/query')

const signUpValidator = [
    body("first_name")
        .trim()
        .notEmpty()
        .withMessage("First name can't be empty.")
        .matches(/^[A-Za-z ]+$/)
        .withMessage("First name must contain letters only.")
        .isLength({ min: 1, max: 255 })
        .withMessage("First name should be between 1 and 255 characters."),

    body("last_name")
        .trim()
        .notEmpty()
        .withMessage("Last name can't be empty.")
        .matches(/^[A-Za-z ]+$/)
        .withMessage("Last name must contain letters only.")
        .isLength({ max: 255 })
        .withMessage("Last name should be between 1 and 255 characters."),
    body("username")
        .trim()
        .notEmpty()
        .withMessage("Username can't be empty.")
        .isLength({ max: 255 })
        .withMessage("username must be between 1 and 255 characters.")
        .custom(async (value) => {
            const unique = await isUnique(value);
            if (!unique) {
                throw new Error('This username is already in use');
            }
            return true;
        }),
    body("password")
        .notEmpty()
        .withMessage("Password can't be empty.")
        .isLength({ min: 6, max: 255 })
        .withMessage("Password must be between 6 and 255 characters."),
    body("confirm_password")
        .notEmpty()
        .withMessage("Confirm password can't be empty.")
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Confirm password must match the password.");
            }
            return true;
        })
];

module.exports = { signUpValidator }