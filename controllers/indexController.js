const bcrypt = require("bcryptjs");
const passport = require("passport");
const { createUser } = require('../db/query')
const { matchedData } = require('express-validator')


const getHomePage = async (req, res) => {
    res.render('home')
}

const getLogInControl = async (req, res) => {
    res.render('login')
}
const postLogInControl = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/log-in",
    failureMessage: true,
})

const getRegisterControl = async (req, res) => {
    res.render('signup')
}
const postRegisterControl = async (req, res, next) => {
    try {
        const data = matchedData(req);
        const {
            username,
            first_name,
            last_name,
            password,
        } = data;
        const hashedPassword = await bcrypt.hash(password, 10);
        await createUser(
            username,
            hashedPassword,
            first_name,
            last_name
        );
        res.redirect("/log-in");
    } catch (error) {
        console.error(error);
        next(error);
    }
}

module.exports = { getLogInControl, postLogInControl, getRegisterControl, postRegisterControl, getHomePage }