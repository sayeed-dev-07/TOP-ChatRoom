const bcrypt = require("bcryptjs");
const passport = require("passport");
const { createUser } = require('../db/query')

const getLogInControl = async (req, res) => {

}
const postLogInControl = async (req, res) => {

    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/log-in",
        failureMessage: true,
    })

}
const getRegisterControl = async (req, res) => {

}
const postRegisterControl = async (req, res) => {
    try {
        const name = req.body.username;
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await createUser(name, hashedPassword)
        res.redirect("/log-in");
    } catch (error) {
        console.error(error);
        next(error);
    }
}