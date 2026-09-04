const bcrypt = require("bcryptjs");
const passport = require("passport");
const { createUser, beAdmin, beMember } = require('../db/query')
const { matchedData } = require('express-validator')
require('dotenv').config()


const getHomePage = async (req, res) => {
    res.render('home')
}

const getLogInControl = async (req, res) => {
    const messages = req.session.messages || [];

    req.session.messages = [];
    res.render('login', {
        errorMessage: messages.length > 0 ? messages[messages.length - 1] : null
    });
}
const postLogInControl = passport.authenticate("local", {
    successRedirect: "/app",
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
            last_name,
            false,
            false
        );
        res.redirect("/log-in");
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const getAdminForm = (req, res, next) => {
    res.render('rolechange', {
        position: 'admin',
        userRole: req.user.is_admin
    })
}

const postAdminForm = async (req, res, next) => {
    const secrectAnswer = process.env.PASSCODE_ADMIN;
    const { answer } = req.body;
    const id = req.user.id;
    if (answer.toLowerCase().trim() === secrectAnswer) {
        await beAdmin(id)
        res.redirect('/app')
    } else {
        res.render('rolechange', {
            position: 'admin',
            error: 'wrong answer',
            userRole: req.user.is_admin
        })
    }
}

const getMemberForm = (req, res, next) => {
    res.render('rolechange', {
        position: 'member',
        userRole: req.user.is_member
    })
}

const postMemberForm = async (req, res, next) => {
    const secrectAnswer = process.env.PASSCODE_MEMBER;
    const { answer } = req.body;
    const id = req.user.id;
    if (answer.toLowerCase().trim() === secrectAnswer) {
        await beMember(id)
        res.redirect('/app')
    } else {
        res.render('rolechange', {
            position: 'member',
            error: 'wrong answer',
            userRole: req.user.is_member
        })
    }
}


module.exports = { getLogInControl, postLogInControl, getRegisterControl, postRegisterControl, getHomePage, getAdminForm, postAdminForm, getMemberForm, postMemberForm }